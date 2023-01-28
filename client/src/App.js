import './App.css';
//import React, {useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import MainPage from './pages/mainPage';
import ChannelPage from './pages/channelPage'
import MessageSection from './components/message-section';
import DefaultSection from './components/default-section';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/channels" element={<MainPage/>}>
            <Route path='/channels/@me' element={<DefaultSection/>}/>
            <Route path='/channels/:channelId' element={<ChannelPage/>}>
              <Route path='/channels/:channelId/:chatId' element={<MessageSection/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
