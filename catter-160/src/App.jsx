import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Form } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GuidePage from './pages/GuidePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import FormPage from './pages/FormPage';
import TutorialPage from './pages/TutorialPage';
import './App.css';
import QuestionPage from './pages/QuestionPage';
import { FormProvider } from './pages/FormContext';
import TestPage from './pages/TestPage';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <TutorialPage /> } />
          <Route path="/form" element={ <FormPage /> } />
          <Route path="/main" element={ <MainPage/> }/>
          <Route path="/guide" element={ <GuidePage/> }/>
          <Route path="/chat" element={ <ChatPage/> }/>
          <Route path="/profile" element={ <ProfilePage/> }/>
          <Route path="/question" element={ <QuestionPage/> } />
          <Route path="/test" element={ <TestPage/> } />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
