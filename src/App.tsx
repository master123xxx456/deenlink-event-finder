import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import Masjids from "./pages/Masjids";
import Following from "./pages/Following";
import Achievements from "./pages/Achievements";
import PrayerTimesPage from "./pages/PrayerTimesPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import OnboardingWizard from "./components/OnboardingWizard";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navigation />
      <main className="flex-1 container py-8 mt-16">
        <Routes>
          <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/" replace />} />
          
          <Route path="/onboarding" element={
            isAuthenticated && !user?.onboardingCompleted ? (
              <OnboardingWizard onComplete={() => navigate('/')} />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          
          <Route path="/prayer-times" element={
            <ProtectedRoute>
              <PrayerTimesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          
          <Route path="/masjids" element={
            <ProtectedRoute>
              <Masjids />
            </ProtectedRoute>
          } />
          
          <Route path="/following" element={
            <ProtectedRoute>
              <Following />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/achievements" element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          } />
          
          <Route path="/chat" element={
            <ProtectedRoute>
              <div>Chat Feature Coming Soon</div>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
