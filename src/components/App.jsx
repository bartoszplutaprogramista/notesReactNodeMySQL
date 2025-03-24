import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
          <Route path='/savetodatabase' element={<CreateArea />}></Route>
        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;
