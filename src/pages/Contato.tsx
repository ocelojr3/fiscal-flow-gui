import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, MapPin, Phone, Mail, Loader2 } from "lucide-react";

const Contato = () => {
  const { toast } = useToast();
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const canSubmit = nome.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("leads")
        .insert({ nome: nome.trim(), whatsapp: whatsapp.replace(/\D/g, ""), email: email || null });
      if (error) throw error;
      toast({ title: "Mensagem enviada!", description: "Entraremos em contato em breve." });
      setNome(""); setWhatsapp(""); setEmail(""); setMensagem("");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erro", description: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Fale <span className="text-primary">Conosco</span>
              </h1>
              <p className="text-lg text-muted-foreground">Entre em contato e receba atendimento personalizado.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-card border rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Envie sua mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Nome Completo *</label>
                    <Input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">WhatsApp *</label>
                    <Input placeholder="(00) 00000-0000" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Mensagem</label>
                    <Textarea placeholder="Como podemos ajudar?" value={mensagem} onChange={(e) => setMensagem(e.target.value)} rows={4} />
                  </div>
                  <Button type="submit" disabled={!canSubmit || isSaving} className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    {isSaving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Enviando...</> : "Enviar Mensagem"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info + Map */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="bg-card border rounded-2xl p-6 space-y-5">
                <h2 className="text-xl font-bold text-foreground">Canais de Atendimento</h2>
                <a href="https://wa.me/5511994595404" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-accent-foreground" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Atendimento rápido e direto</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="text-sm text-foreground">Telefone disponível em horário comercial</p>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="text-sm text-foreground">contato@pspcontabil.com.br</p>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-sm text-foreground">Sede própria em São Paulo — SP</p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border">
                <iframe
                  title="Localização PSP Contabil"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976092422664!2d-46.65342188502156!3d-23.56506598468085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c0776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
