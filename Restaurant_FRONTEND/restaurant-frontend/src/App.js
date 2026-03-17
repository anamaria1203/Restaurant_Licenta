import './App.css'
import Navbar from './components/Navbar/Navbar'
import PaginaPrincipala from './components/PaginaPrincipala/PaginaPrincipala'
import StatisticiBar from './components/StatisticiBar/StatisticiBar'
import PreviewMeniu from './components/PreviewMeniu/PreviewMeniu'
import MancareaSaptamanii from './components/MancareaSaptamanii/MancareaSaptamanii'


function App() {
  return (
    <div>
      <Navbar />
      <PaginaPrincipala />
      <StatisticiBar />
      <PreviewMeniu />
      <MancareaSaptamanii />
      
    </div>
  )
}

export default App