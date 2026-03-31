-- Tabela de configurações do site (editável pelo admin)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Admins podem gerenciar todas as configurações
CREATE POLICY "Admins can manage site_settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Leitura pública (somente leitura para clientes anon — ex: número de WhatsApp)
CREATE POLICY "Anyone can read site_settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Valores padrão iniciais
INSERT INTO public.site_settings (key, value, description) VALUES
  ('whatsapp_number', '5511994595404', 'Número do WhatsApp principal (somente dígitos com DDI, ex: 5511999999999)'),
  ('whatsapp_message_default', 'Olá! Gostaria de falar com um especialista.', 'Mensagem padrão ao abrir o WhatsApp'),
  ('cnpj', 'XX.XXX.XXX/0001-XX', 'CNPJ exibido no rodapé'),
  ('email_contato', 'contato@pspcontabil.com.br', 'E-mail de contato exibido no rodapé');
