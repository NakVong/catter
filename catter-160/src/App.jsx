import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MainPage from './pages/MainPage';
import GuidePage from './pages/GuidePage';
import GuidePageQ1 from './pages/GuidePageQ1';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import FormPage from './pages/FormPage';
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import './App.css';

function App() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send Mail
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={ <FormPage /> }/>
          <Route path="/main" element={ <MainPage/> }/>
                  <Route path="/guide" element={<GuidePage />} />
                  <Route path="/guide/q1" element={<GuidePageQ1 />} />
          <Route path="/chat" element={ <ChatPage/> }/>
          <Route path="/profile" element={ <ProfilePage/> }/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
