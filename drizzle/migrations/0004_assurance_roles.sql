ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'auditor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'reviewer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'safety_manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'institution_partner';