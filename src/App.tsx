import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TerminalPage from "./pages/TerminalPage.tsx";
import GUIPage from "./pages/GUIPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Boot screen — always entry point at root */}
          <Route path="/" element={<Index />} />

          {/* Terminal */}
          <Route path="/terminal" element={<TerminalPage />} />

          {/* GUI sections */}
          <Route path="/home"     element={<GUIPage />} />
          <Route path="/about"    element={<GUIPage />} />
          <Route path="/projects" element={<GUIPage />} />
          <Route path="/resume"   element={<GUIPage />} />
          <Route path="/skills"   element={<GUIPage />} />
          <Route path="/contact"  element={<GUIPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
