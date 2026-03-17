import './App.css'
import Navbar from './components/Navbar/Navbar'
import PaginaPrincipala from './components/PaginaPrincipala/PaginaPrincipala'
import StatisticiBar from './components/StatisticiBar/StatisticiBar'
import PreviewMeniu from './components/PreviewMeniu/PreviewMeniu'

function App() {
  return (
    <div>
      <Navbar />
      <PaginaPrincipala />
      <StatisticiBar />
      <PreviewMeniu />
    </div>
  )
}

export default App