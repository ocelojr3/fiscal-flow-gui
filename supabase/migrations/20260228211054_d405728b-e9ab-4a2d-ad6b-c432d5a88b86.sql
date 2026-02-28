
-- Table: leads (captura de contatos de potenciais clientes IRPF)
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  cpf TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anon users can INSERT leads but NOT read/update/delete
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated (admin) can read leads
CREATE POLICY "Authenticated users can read leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

-- Storage bucket for IRPF documents
INSERT INTO storage.buckets (id, name, public)
  VALUES ('irpf_docs', 'irpf_docs', false);

-- Anon and authenticated can upload to irpf_docs
CREATE POLICY "Anyone can upload irpf docs"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'irpf_docs');

-- Only authenticated can read irpf docs
CREATE POLICY "Authenticated can read irpf docs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'irpf_docs');
