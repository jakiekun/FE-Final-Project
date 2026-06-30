import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AppLayout from './components/AppLayout.jsx'
import AnimatedBackground from './components/AnimatedBackground.jsx'

// public
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

// authed
import Onboarding from './pages/Onboarding.jsx'
import Swipe from './pages/Swipe.jsx'
import Coaching from './pages/Coaching.jsx'
import Esports from './pages/Esports.jsx'
import Tournaments from './pages/Tournaments.jsx'
import Matches from './pages/Matches.jsx'
import ChatList from './pages/ChatList.jsx'
import Chat from './pages/Chat.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import RatePlayer from './pages/RatePlayer.jsx'
import Admin from './pages/Admin.jsx'
import Accessibility from './pages/Accessibility.jsx'
import Help from './pages/Help.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
    <a href="#main" className="skip-link">Skip to content</a>
    <AnimatedBackground />
    <div className="app-bg-content" id="main" role="main">
    <Routes>
      {/* ---------- Public ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/help" element={<Help />} />
      <Route path="/terms" element={<Terms />} />

      {/* ---------- Onboarding (auth, no profile yet) ---------- */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute requireProfile={false}>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      {/* ---------- Authenticated app (with bottom nav) ---------- */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="discover" replace />} />
        <Route path="discover" element={<Swipe />} />
        <Route path="coaching" element={<Coaching />} />
        <Route path="esports" element={<Esports />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="matches" element={<Matches />} />
        <Route path="chat" element={<ChatList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ---------- Full-screen authed routes (no bottom nav) ---------- */}
      <Route
        path="/app/chat/:id"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/rate/:id"
        element={
          <ProtectedRoute>
            <RatePlayer />
          </ProtectedRoute>
        }
      />

      {/* ---------- Admin ---------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
    </>
  )
}
