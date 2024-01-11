import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import "./index.css"

// Lazy load components
const Home = lazy(() => import('./pages/home/Home'));
const Profile = lazy(() => import('./components/profile/Profile'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Login></Login>}
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route
              exact
              path="/profile/:username"
              element={<Profile />}
            ></Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
