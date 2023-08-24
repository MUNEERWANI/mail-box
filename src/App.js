import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/navigation/Home';
import Header from './components/navigation/Header';
import Inbox from './components/mail/Inbox';
import Sent from './components/mail/Sent';

function App() {
  return (
    <Fragment>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/sent' element={<Sent />} />
      </Routes>
    </Fragment>


  );
}

export default App;
