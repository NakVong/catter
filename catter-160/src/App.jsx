import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GuidePage from './pages/GuidePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import './App.css';

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
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
          <Route path="/main" element={ <MainPage/> }/>
          <Route path="/guide" element={ <GuidePage/> }/>
          <Route path="/chat" element={ <ChatPage/> }/>
          <Route path="/profile" element={ <ProfilePage/> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App
