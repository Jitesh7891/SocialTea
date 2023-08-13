import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';


function App() {
  return (
    <BrowserRouter>

          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>}> </Route>
              {/* <Route exact path="/login" element={<Login/>}> </Route>
              <Route exact path="/register" element={<Register/>}> </Route>
              <Route exact path="/profile/:username" element={<Profile/>}> </Route> */}
            </Routes>
          </div>
        </BrowserRouter>
  );
}

export default App;
