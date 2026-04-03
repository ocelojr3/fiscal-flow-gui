
-- ============================================================
-- CLIENT PORTAL: clients, client_documents, payment_proofs
-- ============================================================

-- Clients table (each client may have a Supabase auth user)
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  cpf TEXT,
  email TEXT UNIQUE,
  whatsapp TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Admins: full access
CREATE POLICY "Admins can manage clients"
ON public.clients FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Clients: read their own record
CREATE POLICY "Clients can read own record"
ON public.clients FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- ============================================================

-- Documents uploaded by admin for each client
CREATE TABLE public.client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'pdf',
  month_ref TEXT,          -- e.g. '2026-03'
  is_payment_guide BOOLEAN NOT NULL DEFAULT false,
  notified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;

-- Admins: full access
CREATE POLICY "Admins can manage client_documents"
ON public.client_documents FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Clients: read their own documents
CREATE POLICY "Clients can read own documents"
ON public.client_documents FOR SELECT
TO authenticated
USING (
  client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  )
);

-- ============================================================

-- Payment proofs uploaded by clients
CREATE TABLE public.payment_proofs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_document_id UUID REFERENCES public.client_documents(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente',
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.payment_proofs ENABLE ROW LEVEL SECURITY;

-- Admins: full access
CREATE POLICY "Admins can manage payment_proofs"
ON public.payment_proofs FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Clients: insert and read their own
CREATE POLICY "Clients can insert own payment_proofs"
ON public.payment_proofs FOR INSERT
TO authenticated
WITH CHECK (
  client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Clients can read own payment_proofs"
ON public.payment_proofs FOR SELECT
TO authenticated
USING (
  client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  )
);

-- ============================================================
-- Storage bucket for client documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('client_docs', 'client_docs', false)
ON CONFLICT (id) DO NOTHING;

-- Admins can upload/delete
CREATE POLICY "Admins can upload client docs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'client_docs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete client docs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'client_docs' AND public.has_role(auth.uid(), 'admin'));

-- Authenticated users can read (RLS on client_documents controls access)
CREATE POLICY "Authenticated can read client docs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'client_docs');

-- ============================================================
-- Storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment_proofs', 'payment_proofs', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Clients can upload payment proofs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment_proofs');

CREATE POLICY "Authenticated can read payment proofs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'payment_proofs');
