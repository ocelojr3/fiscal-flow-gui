import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; 
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import Arquivos from "./pages/admin/Arquivos";
import Guias from "./pages/admin/Guias";
import Configuracoes from "./pages/admin/Configuracoes";
import Clientes from "./pages/admin/Clientes";
import Documentos from "./pages/admin/Documentos";
import Importar from "./pages/admin/Importar";
import GuiasPublic from "./pages/GuiasPublic";
import GuiaDetalhe from "./pages/GuiaDetalhe";
import PortalLogin from "./pages/portal/Login";
import PortalDashboard from "./pages/portal/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/guias" element={<GuiasPublic />} />
          <Route path="/guias/:slug" element={<GuiaDetalhe />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/leads" element={<Leads />} />
          <Route path="/admin/arquivos" element={<Arquivos />} />
          <Route path="/admin/guias" element={<Guias />} />
          <Route path="/admin/configuracoes" element={<Configuracoes />} />
          <Route path="/admin/clientes" element={<Clientes />} />
          <Route path="/admin/documentos" element={<Documentos />} />
          <Route path="/admin/importar" element={<Importar />} />
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal/dashboard" element={<PortalDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics /> 
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;