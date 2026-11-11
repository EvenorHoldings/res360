ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS confidence text NOT NULL DEFAULT 'medium' CHECK (confidence IN ('low','medium','high')), ADD COLUMN IF NOT EXISTS source_notes text NOT NULL DEFAULT '', ADD COLUMN IF NOT EXISTS pet_policy_verified boolean NOT NULL DEFAULT false, ADD COLUMN IF NOT EXISTS pet_policy_source_url text;
ALTER TABLE public.listings DROP CONSTRAINT IF EXISTS listings_residence_type_check;
ALTER TABLE public.listings ADD CONSTRAINT listings_residence_type_check CHECK (residence_type IN ('university_res','university_leased','private_student_res','landlord_room','shared_house'));
CREATE OR REPLACE FUNCTION public.directory_safe_text(_text text) RETURNS text LANGUAGE sql IMMUTABLE SET search_path=public AS $$ SELECT regexp_replace(regexp_replace(coalesce(_text,''),'[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}','[removed]','gi'),'(\+27|\m0)[ ()-]*[0-9]{2}[ ()-]*[0-9]{3}[ ()-]*[0-9]{4}\M','[removed]','g') $$;
CREATE OR REPLACE FUNCTION public.guard_directory_facts() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
IF TG_OP='INSERT' AND NOT public.has_role(auth.uid(),'admin') THEN NEW.confidence='low'; NEW.verification_status='unverified'; NEW.pet_policy_verified=false; NEW.pet_policy_source_url=NULL; END IF;
IF TG_OP='UPDATE' AND NOT public.has_role(auth.uid(),'admin') THEN NEW.confidence=OLD.confidence; NEW.verification_status=OLD.verification_status; NEW.pet_policy_verified=OLD.pet_policy_verified; NEW.pet_policy_source_url=OLD.pet_policy_source_url; NEW.residence_type=OLD.residence_type; NEW.institution=OLD.institution; END IF;
IF NEW.residence_type='university_res' OR NEW.institution='University of Cape Town' THEN NEW.pet_friendly=false; NEW.pet_policy_verified=false; END IF;
IF NEW.pet_policy_verified AND coalesce(NEW.pet_policy_source_url,'') !~ '^https://' THEN RAISE EXCEPTION 'An institution policy source is required for pet verification'; END IF;
IF NEW.source='institution_directory' AND (NEW.title<>public.directory_safe_text(NEW.title) OR NEW.location<>public.directory_safe_text(NEW.location) OR NEW.description<>public.directory_safe_text(NEW.description) OR NEW.source_notes<>public.directory_safe_text(NEW.source_notes)) THEN RAISE EXCEPTION 'Personal contacts are not permitted in directory listings'; END IF;
RETURN NEW; END $$;
CREATE TRIGGER directory_facts_guard BEFORE INSERT OR UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION public.guard_directory_facts();
DROP POLICY IF EXISTS "Anyone reads approved listings" ON public.listings;
CREATE POLICY "Anyone reads approved listings" ON public.listings FOR SELECT USING (status='approved' AND (confidence<>'low' OR verification_status='res360_verified') AND CASE WHEN is_demo THEN public.show_demo_listings() ELSE coalesce(last_confirmed_at,published_at,created_at)>now()-interval '30 days' END);
CREATE OR REPLACE FUNCTION public.import_directory_listings(_rows jsonb, _source text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r jsonb; i int:=0; ok int:=0; errs jsonb:='[]'; cid uuid; insname text; nm text; rt text; checked timestamptz; cnt int; conf text;
BEGIN
IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'not allowed'; END IF;
IF _source<>'institution_directory' THEN RAISE EXCEPTION 'source must be institution_directory'; END IF;
IF jsonb_typeof(_rows)<>'array' OR jsonb_array_length(_rows)>500 THEN RAISE EXCEPTION 'Use an array of at most 500 rows'; END IF;
FOR r IN SELECT * FROM jsonb_array_elements(_rows) LOOP i:=i+1; BEGIN
nm:=trim(r->>'name');
IF coalesce(nm,'')='' OR char_length(nm)>120 THEN RAISE EXCEPTION 'Residence name is required (max 120 characters)'; END IF;
IF nm<>public.directory_safe_text(nm) OR coalesce(r->>'address','')<>public.directory_safe_text(r->>'address') THEN RAISE EXCEPTION 'Remove personal contacts from name and address'; END IF;
IF coalesce(r->>'source_url','') !~ '^https://' OR r->>'source_url'<>public.directory_safe_text(r->>'source_url') OR r->>'source_url' ~ '[?@]' THEN RAISE EXCEPTION 'Use a public HTTPS source link without contact details or query parameters'; END IF;
checked:=nullif(trim(r->>'last_checked_at'),'')::timestamptz;
IF checked IS NULL OR checked>now() THEN RAISE EXCEPTION 'A non-future last checked date is required'; END IF;
conf:=trim(r->>'confidence'); IF coalesce(conf,'') NOT IN ('low','medium','high') THEN RAISE EXCEPTION 'confidence must be low, medium or high'; END IF;
SELECT count(*) INTO cnt FROM public.campuses c JOIN public.institutions ins ON ins.id=c.institution_id WHERE lower(trim(ins.name))=lower(trim(r->>'institution')) AND lower(trim(c.name))=lower(trim(r->>'campus'));
IF cnt<>1 THEN RAISE EXCEPTION 'Institution and campus must match exactly one seeded campus'; END IF;
SELECT c.id,ins.name INTO cid,insname FROM public.campuses c JOIN public.institutions ins ON ins.id=c.institution_id WHERE lower(trim(ins.name))=lower(trim(r->>'institution')) AND lower(trim(c.name))=lower(trim(r->>'campus'));
rt:=r->>'residence_type'; IF insname='University of KwaZulu-Natal' AND lower(trim(r->>'campus'))='pietermaritzburg' AND nm IN ('Ambassador Residence','Absa Residence','Welkom Residence','Alex Residence','YMCA','LTI Residence','Dulwich Residence') THEN rt:='university_leased'; END IF;
IF coalesce(rt,'') NOT IN ('university_res','university_leased','private_student_res','landlord_room','shared_house') THEN RAISE EXCEPTION 'residence_type is not recognised'; END IF;
IF EXISTS(SELECT 1 FROM public.listings l WHERE l.source='institution_directory' AND l.campus_id=cid AND l.title=CASE WHEN char_length(nm)<5 THEN nm||' residence' ELSE nm END) THEN RAISE EXCEPTION 'Residence already imported for this campus'; END IF;
INSERT INTO public.listings(owner_id,title,location,province,institution,monthly_rent,price_on_request,description,residence_type,campus_id,lat,lng,beds,nsfas_accredited,source,verification_status,source_url,last_confirmed_at,status,confidence,source_notes,pet_friendly)
VALUES(auth.uid(),CASE WHEN char_length(nm)<5 THEN nm||' residence' ELSE nm END,left(coalesce(nullif(trim(r->>'address'),''),trim(r->>'campus')),160),'pending-geo',insname,coalesce(nullif(trim(r->>'price_from_zar'),'')::numeric,0),true,'Directory entry imported from a published source. Contact the provider for fees and availability.',rt,cid,nullif(trim(r->>'lat'),'')::float8,nullif(trim(r->>'lng'),'')::float8,coalesce(nullif(trim(r->>'beds'),'')::int,1),coalesce(nullif(trim(r->>'nsfas_accredited'),'')::boolean,false),'institution_directory','unverified',r->>'source_url',checked,'pending',conf,left(public.directory_safe_text(r->>'notes'),2000),false);
ok:=ok+1;
EXCEPTION WHEN OTHERS THEN errs:=errs||jsonb_build_object('row',i,'name',public.directory_safe_text(nm),'error',sqlerrm); END; END LOOP;
RETURN jsonb_build_object('imported',ok,'errors',errs); END $$;
REVOKE ALL ON FUNCTION public.import_directory_listings(jsonb,text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.import_directory_listings(jsonb,text) TO authenticated;