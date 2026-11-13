CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, marketing_opt_in, terms_accepted_at, age_confirmed_at)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_user_meta_data->>'marketing_opt_in')::boolean, false),
    CASE WHEN NEW.raw_user_meta_data->>'terms_accepted'='true' THEN now() END,
    CASE WHEN NEW.raw_user_meta_data->>'age_confirmed'='true' THEN now() END)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student') ON CONFLICT DO NOTHING;
  IF NEW.raw_user_meta_data->>'signup_role' = 'host' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'landlord') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END $function$;