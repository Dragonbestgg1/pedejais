import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../src/home";
import Login from "../src/login/login";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
