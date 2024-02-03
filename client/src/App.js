import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import "./index.css"

// Lazy load components
const Home = lazy(() => import('./pages/home/Home'));
const Profile = lazy(() => import('./components/profile/Profile'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const Messenger = lazy(() => import('./pages/messenger/Messenger'));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/messenger" element={user ? <Messenger /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </div>
  </BrowserRouter>
  );
}

export default App;
