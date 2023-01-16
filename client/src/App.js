import './App.css';
//import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import MainPage from './pages/mainPage';
import ChannelPage from './pages/channelPage'

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/channels" element={<MainPage/>}>
            <Route path='/channels/:channelId' element={<ChannelPage/>}>
              <Route path='/channels/:channelId/:chatId' element={<ChannelPage/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
