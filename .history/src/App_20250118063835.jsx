import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mint from './pages/Mint';
import Transfer from './pages/Transfer';
import Balance from './pages/Balance';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/balance" element={<Balance />} />
      </Routes>
    </Router>
  );
};

export default App;
