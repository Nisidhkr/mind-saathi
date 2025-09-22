import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import NavbarPublic from "./components/NavbarPublic";
import NavbarDashboard from "./components/NavbarDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import PHQ9 from "./pages/PHQ9";
import GAD7 from "./pages/GAD7";
import GHQ12 from "./pages/GHQ12";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ResourceHub from "./pages/ResourceHub";
import Counselor from "./pages/Counselor";
import Mindfulness from "./pages/Mindfulness";
import MindfulnessApp from "./pages/MindfulnessApp";
import ResourcesApp from "./pages/ResourcesApp";
import LoginHistory from "./pages/LoginHistory";
import CounsellorLogin from "./pages/CounsellorLogin";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import BookingPage from "./pages/BookingPage";
import GroupChat from "./pages/GroupChat";
import CommunityPosts from "./pages/CommunityPosts";
import ChatBot from "./pages/ChatBot";

// Import all resource components
import Anxiety from "./pages/resources/Anxiety";
import Depression from "./pages/resources/Depression";
import StressBurnout from "./pages/resources/StressBurnout";
import LowSelfEsteem from "./pages/resources/LowSelfEsteem";
import Loneliness from "./pages/resources/Loneliness";
import SocialIsolation from "./pages/resources/SocialIsolation";
import BodyImage from "./pages/resources/BodyImage";
import BodyImageEatingDisorders from "./pages/resources/BodyImageEatingDisorders";
import BullyingCyberbullying from "./pages/resources/BullyingCyberbullying";
import SubstanceAbuseAddiction from "./pages/resources/SubstanceAbuseAddiction";
import SuicidePreventionSelfHarm from "./pages/resources/SuicidePreventionSelfHarm";
import StigmaMentalHealthAwareness from "./pages/resources/StigmaMentalHealthAwareness";
import LonelinessSocialIsolation from "./pages/resources/LonelinessSocialIsolation";

import "./styles.css";

function AppRoutes() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      
      // Track session restoration (when user is already logged in)
      if (user && !sessionStorage.getItem('loginTracked')) {
        try {
          const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
          const idToken = await user.getIdToken();
          await fetch(`${backendBaseUrl}/api/auth/track-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ loginMethod: "session_restore" }),
          });
          sessionStorage.setItem('loginTracked', 'true');
          console.log("Session restore tracked successfully");
        } catch (e) {
          console.error("Failed to track session restore", e);
        }
      } else if (!user) {
        // Clear the session tracking when user logs out
        sessionStorage.removeItem('loginTracked');
      }
    });

    return () => unsubscribe();
  }, []);

  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/mindfulness") || location.pathname.startsWith("/resources-app") || location.pathname.startsWith("/counselor") || location.pathname.startsWith("/assessment") || location.pathname.startsWith("/login-history") || location.pathname.startsWith("/booking") || location.pathname.startsWith("/chatbot");
  const isCounsellorDashboard = location.pathname.startsWith("/counsellor-dashboard");
  const isFullFrameChat = location.pathname.startsWith("/group-chat") || location.pathname.startsWith("/community-posts");
  const isAuthenticated = !!user;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-white text-gray-800">
        {isCounsellorDashboard || isFullFrameChat ? null : (isDashboard && isAuthenticated ? <NavbarDashboard /> : <NavbarPublic />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/assessment/phq-9" element={<PHQ9 />} />
          <Route path="/assessment/gad-7" element={<GAD7 />} />
          <Route path="/assessment/ghq-12" element={<GHQ12 />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Routes - Only accessible when logged in */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/mindfulness" element={
            <ProtectedRoute>
              <Mindfulness />
            </ProtectedRoute>
          } />
          <Route path="/mindfulness-app" element={
            <ProtectedRoute>
              <MindfulnessApp />
            </ProtectedRoute>
          } />
          <Route path="/resources-app/*" element={
            <ProtectedRoute>
              <ResourcesApp />
            </ProtectedRoute>
          } />
          <Route path="/counselor" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/login-history" element={
            <ProtectedRoute>
              <LoginHistory />
            </ProtectedRoute>
          } />
          <Route path="/booking" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/group-chat" element={
            <ProtectedRoute>
              <GroupChat />
            </ProtectedRoute>
          } />
          <Route path="/community-posts" element={
            <ProtectedRoute>
              <CommunityPosts />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          } />
          
          {/* Counsellor Routes */}
          <Route path="/counsellor-login" element={<CounsellorLogin />} />
          <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />
          
          {/* Public Resources - Available for all users */}
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/resources/anxiety" element={<Anxiety />} />
          <Route path="/resources/depression" element={<Depression />} />
          <Route path="/resources/stress-burnout" element={<StressBurnout />} />
          <Route path="/resources/low-self-esteem" element={<LowSelfEsteem />} />
          <Route path="/resources/loneliness" element={<Loneliness />} />
          <Route path="/resources/social-isolation" element={<SocialIsolation />} />
          <Route path="/resources/body-image" element={<BodyImage />} />
          <Route path="/resources/body-image-eating-disorders" element={<BodyImageEatingDisorders />} />
          <Route path="/resources/bullying-cyberbullying" element={<BullyingCyberbullying />} />
          <Route path="/resources/substance-abuse-addiction" element={<SubstanceAbuseAddiction />} />
          <Route path="/resources/suicide-prevention-self-harm" element={<SuicidePreventionSelfHarm />} />
          <Route path="/resources/stigma-mental-health-awareness" element={<StigmaMentalHealthAwareness />} />
          <Route path="/resources/loneliness-social-isolation" element={<LonelinessSocialIsolation />} />
        </Routes>
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
