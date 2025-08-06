import { Route, Routes, useLocation } from 'react-router'

import Home from './pages/Home'
import Login from './pages/Login'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  const location = useLocation();

  // List of routes where NavBar and Footer should be hidden
  const hideLayoutRoutes = ['/login'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <NavBar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App
