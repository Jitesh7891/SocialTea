import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './components/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

const {user}=useContext(AuthContext);

  return (
    <BrowserRouter>

          <div className="container">
            <Routes>
              <Route exact path="/" element={user?<Home/>:<Login/>}> </Route>
              <Route exact path="/login" element={<Login/>}> </Route>
              <Route exact path="/register" element={user?<Navigate  to="/"/> :<Register/>}> </Route>
              <Route exact path="/profile/:username" element={<Profile/>}> </Route>
            </Routes>
          </div>
        </BrowserRouter>
  );
}

export default App;
