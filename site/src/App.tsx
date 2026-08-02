import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/left-to-live/privacy" element={<Legal type="privacy" />} />
            <Route path="/left-to-live/cgu" element={<Legal type="cgu" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </>
  )
}

export default App
