import Navbar from '../../components/Navbar/Navbar'
import PaginaPrincipala from '../../components/PaginaPrincipala/PaginaPrincipala'
import StatisticiBar from '../../components/StatisticiBar/StatisticiBar'
import PreviewMeniu from '../../components/PreviewMeniu/PreviewMeniu'
import DeceNoi from '../../components/DeceNoi/DeceNoi'
import Echipa from '../../components/Echipa/Echipa'
import Recenzii from '../../components/Recenzii/Recenzii'
import CallToAction from '../../components/CallToAction/CallToAction'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <PaginaPrincipala />
      <StatisticiBar />
      <PreviewMeniu />
      <DeceNoi />
      <Echipa />
      <Recenzii />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
