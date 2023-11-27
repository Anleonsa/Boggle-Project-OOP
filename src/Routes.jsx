import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Game from './Pages/Game'
//import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/game' exact element={<Game />} />
        {/* <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}
export default App
