import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Player from './Player';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bgImages from '../assets/bgImages';

function App() {
  const [bgImage, setBgImage] = useState('');

  const location = useLocation();

  const getBgImage = () => {
    const rand = Math.floor(Math.random() * bgImages.length);
    return bgImages[rand];
  };

  const bgLayer = (path) => {
    if (path === '/login') return 'background-transparent';
    if (path === '/register') return 'background-transparent';
    return 'background-gradient';
  };

  useEffect(() => {
    setBgImage(getBgImage());
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <motion.div
        key={bgImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        exit={{ opacity: 1 }}
      >
        <div
          className="background"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
      </motion.div>

      <div className={`app ${bgLayer(location.pathname)}`}>
        {location.pathname !== '/player/' ? <Navigation /> : null}

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/series" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
