import './App.css'
import Navbar from './components/Navbar/Navbar'
import PaginaPrincipala from './components/PaginaPrincipala/PaginaPrincipala'
import StatisticiBar from './components/StatisticiBar/StatisticiBar'
import PreviewMeniu from './components/PreviewMeniu/PreviewMeniu'
import MancareaSaptamanii from './components/MancareaSaptamanii/MancareaSaptamanii'
import Echipa from './components/Echipa/Echipa'
import Recenzii from './components/Recenzii/Recenzii'
import DeceNoi from './components/DeceNoi/DeceNoi'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <PaginaPrincipala />
      <StatisticiBar />
      <PreviewMeniu />
      <MancareaSaptamanii />
      <DeceNoi />
      <Recenzii />
      <Echipa />
      <Footer />
    </div>
  )
}

export default App