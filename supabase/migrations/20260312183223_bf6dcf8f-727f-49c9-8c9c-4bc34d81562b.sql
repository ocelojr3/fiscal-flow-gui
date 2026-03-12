
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS: only admins can read user_roles
CREATE POLICY "Admins can read user_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create guides table for IRPF guides/manuals
CREATE TABLE public.guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    pdf_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    category TEXT NOT NULL DEFAULT 'irpf',
    sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Anyone can read published guides
CREATE POLICY "Anyone can read published guides"
ON public.guides
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Admins can do everything with guides
CREATE POLICY "Admins can manage guides"
ON public.guides
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add status and source columns to leads for CRM
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'novo',
ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'site',
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Allow admins to update and delete leads
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create guide_downloads table for lead capture on PDF downloads
CREATE TABLE public.guide_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    guide_id UUID REFERENCES public.guides(id) ON DELETE CASCADE NOT NULL,
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL
);

ALTER TABLE public.guide_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert guide_downloads"
ON public.guide_downloads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read guide_downloads"
ON public.guide_downloads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for guide PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('guide_pdfs', 'guide_pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read guide PDFs
CREATE POLICY "Anyone can read guide PDFs"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'guide_pdfs');

-- Admins can upload guide PDFs
CREATE POLICY "Admins can upload guide PDFs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'guide_pdfs' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete guide PDFs
CREATE POLICY "Admins can delete guide PDFs"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'guide_pdfs' AND public.has_role(auth.uid(), 'admin'));
