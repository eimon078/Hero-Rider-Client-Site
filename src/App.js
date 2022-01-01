import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:name" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
