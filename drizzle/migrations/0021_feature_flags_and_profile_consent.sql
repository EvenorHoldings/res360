CREATE TABLE IF NOT EXISTS public.feature_flags (key text PRIMARY KEY, enabled boolean NOT NULL DEFAULT false, updated_at timestamptz DEFAULT now());
GRANT SELECT ON public.feature_flags TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.feature_flags TO authenticated;
GRANT ALL ON public.feature_flags TO service_role;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Flags are public" ON public.feature_flags;
CREATE POLICY "Flags are public" ON public.feature_flags FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admins manage flags" ON public.feature_flags;
CREATE POLICY "Admins manage flags" ON public.feature_flags FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
INSERT INTO public.feature_flags(key) VALUES ('google_signin'),('microsoft_signin'),('magic_link'),('student_email_verification'),('host_verification'),('institution_accounts'),('saved_search_alerts'),('whatsapp_contact'),('amenity_filters_v2'),('help_centre_v2') ON CONFLICT (key) DO NOTHING;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_email text, ADD COLUMN IF NOT EXISTS secondary_email_verified_at timestamptz, ADD COLUMN IF NOT EXISTS phone_verified_at timestamptz, ADD COLUMN IF NOT EXISTS marketing_opt_in boolean NOT NULL DEFAULT false, ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz, ADD COLUMN IF NOT EXISTS age_confirmed_at timestamptz;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS information_officer_name text, ADD COLUMN IF NOT EXISTS information_officer_email text;
CREATE OR REPLACE FUNCTION public.information_officer() RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT jsonb_build_object('name',information_officer_name,'email',information_officer_email) FROM public.site_settings LIMIT 1 $$;
GRANT EXECUTE ON FUNCTION public.information_officer() TO anon, authenticated;
CREATE OR REPLACE FUNCTION public.my_staff_flags() RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT jsonb_build_object(
 'staff', EXISTS(SELECT 1 FROM user_roles WHERE user_id=auth.uid() AND role IN ('admin','reviewer','auditor')),
 'safety', EXISTS(SELECT 1 FROM user_roles WHERE user_id=auth.uid() AND role IN ('admin','safety_manager')),
 'host', EXISTS(SELECT 1 FROM user_roles WHERE user_id=auth.uid() AND role='landlord') OR EXISTS(SELECT 1 FROM landlords WHERE user_id=auth.uid())) $$;
REVOKE EXECUTE ON FUNCTION public.my_staff_flags() FROM anon;
GRANT EXECUTE ON FUNCTION public.my_staff_flags() TO authenticated;
CREATE OR REPLACE FUNCTION public.record_signup_consent(_role text, _marketing boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
 UPDATE profiles SET terms_accepted_at=COALESCE(terms_accepted_at,now()), age_confirmed_at=COALESCE(age_confirmed_at,now()), marketing_opt_in=COALESCE(_marketing,false) WHERE id=auth.uid();
 IF _role='host' THEN INSERT INTO user_roles(user_id,role) VALUES (auth.uid(),'landlord') ON CONFLICT DO NOTHING;
 ELSE INSERT INTO user_roles(user_id,role) VALUES (auth.uid(),'student') ON CONFLICT DO NOTHING; END IF;
END $$;
REVOKE EXECUTE ON FUNCTION public.record_signup_consent(text,boolean) FROM anon;
GRANT EXECUTE ON FUNCTION public.record_signup_consent(text,boolean) TO authenticated;
CREATE INDEX IF NOT EXISTS listings_province_status_rent_idx ON public.listings(province_id,status,monthly_rent);
CREATE INDEX IF NOT EXISTS enquiries_listing_student_idx ON public.enquiries(listing_id,student_id);