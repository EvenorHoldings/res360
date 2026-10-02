CREATE TABLE public.listings (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 owner_id uuid NOT NULL DEFAULT auth.uid(),
 title text NOT NULL CHECK (char_length(title) BETWEEN 5 AND 120),
 location text NOT NULL CHECK (char_length(location) BETWEEN 2 AND 160),
 province text NOT NULL,
 institution text,
 monthly_rent numeric(10,2) NOT NULL CHECK (monthly_rent >= 0),
 description text NOT NULL CHECK (char_length(description) BETWEEN 20 AND 2000),
 lgbtq_friendly boolean NOT NULL DEFAULT false,
 pet_friendly boolean NOT NULL DEFAULT false,
 accessible boolean NOT NULL DEFAULT false,
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.listings TO anon;
GRANT SELECT, INSERT ON public.listings TO authenticated;
GRANT ALL ON public.listings TO service_role;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads approved listings" ON public.listings FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Owners read own submissions" ON public.listings FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Signed in owners submit pending listings" ON public.listings FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid() AND status = 'pending');
CREATE INDEX listings_approved_search_idx ON public.listings (province, institution) WHERE status = 'approved';