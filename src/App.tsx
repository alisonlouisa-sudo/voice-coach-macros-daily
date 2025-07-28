import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/Sidebar";
import Index from "./pages/Index";
import CostMetrics from "./pages/CostMetrics";
import CoachDirectory from "./pages/CoachDirectory";
import ThemesInsights from "./pages/ThemesInsights";
import CoachForum from "./pages/CoachForum";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <main className="flex-1 overflow-hidden">
              {/* Global header with sidebar trigger */}
              <header className="h-12 flex items-center border-b border-border bg-card/50 backdrop-blur-sm">
                <SidebarTrigger className="ml-4" />
                <div className="flex-1" />
              </header>
              
              {/* Main content area */}
              <div className="p-6 overflow-y-auto h-[calc(100vh-3rem)]">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/cost-metrics" element={<CostMetrics />} />
                  <Route path="/coach-directory" element={<CoachDirectory />} />
                  <Route path="/themes-insights" element={<ThemesInsights />} />
                  <Route path="/coach-forum" element={<CoachForum />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
