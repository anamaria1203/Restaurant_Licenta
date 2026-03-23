import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import PaginaPrincipala from './components/PaginaPrincipala/PaginaPrincipala'
import StatisticiBar from './components/StatisticiBar/StatisticiBar'
import PreviewMeniu from './components/PreviewMeniu/PreviewMeniu'
import MancareaSaptamanii from './components/MancareaSaptamanii/MancareaSaptamanii'
import DeceNoi from './components/DeceNoi/DeceNoi'
import Echipa from './components/Echipa/Echipa'
import Recenzii from './components/Recenzii/Recenzii'
import CallToAction from './components/CallToAction/CallToAction'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ResetParola from './components/ResetParola/ResetParola'
import AdminLogin from './components/AdminLogin/AdminLogin'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Meniu from './components/Meniu/Meniu'
import DespreNoi from './components/DespreNoi/DespreNoi'
import Contact from './components/Contact/Contact'
import { AdminRoute } from './components/ProtectedRoute'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar />
            <PaginaPrincipala />
            <StatisticiBar />
            <PreviewMeniu />
            <MancareaSaptamanii />
            <DeceNoi />
            <Echipa />
            <Recenzii />
            <CallToAction />
            <Footer />
          </div>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-parola' element={<ResetParola />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/meniu' element={<Meniu />} />
        <Route path='/despre' element={<DespreNoi />} />
        <Route path='/contact' element={<Contact />} />


        <Route path='/admin-dashboard' element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
