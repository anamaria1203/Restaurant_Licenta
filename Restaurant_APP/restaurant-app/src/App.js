import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Meniu from './pages/Meniu/Meniu'
import MeniulLunii from './pages/MeniulLunii/MeniulLunii'
import DespreNoi from './pages/DespreNoi/DespreNoi'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import ResetParola from './pages/ResetParola/ResetParola'
import AdminLogin from './pages/admin/AdminLogin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard'
import AdminMeniu from './pages/admin/AdminMeniu/AdminMeniu'
import AdminActivitate from './pages/admin/AdminActivitate/AdminActivitate'
import Comanda from './pages/Comanda/Comanda'
import ComenziMele from './pages/ComenziMele/ComenziMele'
import Rezervare from './pages/Rezervare/Rezervare'
import RezervariMele from './pages/RezervariMele/RezervariMele'
import Cos from './pages/Cos/Cos'
import { AdminRoute } from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-parola' element={<ResetParola />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/meniu' element={<Meniu />} />
        <Route path='/despre' element={<DespreNoi />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/meniu-lunii' element={<MeniulLunii />} />
        <Route path='/comanda' element={<Comanda />} />
        <Route path='/comenzile-mele' element={<ComenziMele />} />
        <Route path='/rezervare' element={<Rezervare />} />
        <Route path='/rezervarile-mele' element={<RezervariMele />} />
        <Route path='/cos' element={<Cos />} />
        <Route path='/admin-dashboard' element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path='/admin-meniu' element={
          <AdminRoute>
            <AdminMeniu />
          </AdminRoute>
        } />
        <Route path='/admin-activitate' element={
          <AdminRoute>
            <AdminActivitate />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
