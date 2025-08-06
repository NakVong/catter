import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GuidePage from './pages/GuidePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import FormPage from './pages/FormPage';
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <FormPage /> }/>
          <Route path="/main" element={ <MainPage/> }/>
          <Route path="/guide" element={ <GuidePage/> }/>
          <Route path="/chat" element={ <ChatPage/> }/>
          <Route path="/profile" element={ <ProfilePage/> }/>
        </Routes>
      </Router>
    
  );
};

export default App;
