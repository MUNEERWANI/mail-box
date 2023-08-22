import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/navigation/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    
  );
}

export default App;
