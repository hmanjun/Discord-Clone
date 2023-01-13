import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChannelPage from './pages/channelPage';
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/login'
            element={<LoginPage/>}
          />
          <Route
            path="/register"
            element={<RegisterPage/>}
          />
          <Route
            path="/channels"
            element={<ChannelPage/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
