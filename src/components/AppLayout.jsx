import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'

// Shell for the authenticated app: scrollable screen + fixed bottom nav.
export default function AppLayout() {
  return (
    <div className="app-shell">
      <Outlet />
      <BottomNav />
    </div>
  )
}
