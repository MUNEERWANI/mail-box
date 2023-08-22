import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/navigation/Home';
import Header from './components/navigation/Header';

function App() {
  return (
    <Fragment>
      <Header />   

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Fragment>


  );
}

export default App;
