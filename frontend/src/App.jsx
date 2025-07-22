import { Route, Routes } from 'react-router'

import Home from './pages/Home'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return <>
    <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>

        </Routes>
      </main>
    <Footer />
  </>
}

export default App
