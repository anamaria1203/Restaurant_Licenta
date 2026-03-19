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
      </Routes>
    </Router>
  )
}

export default App