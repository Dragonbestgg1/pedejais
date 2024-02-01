// App.js
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../src/home";
import Header from './components/header';
import Activities from './activities';
import Profile from './user_profile';
import Films from './films';
import LoginErrorPage from './login/login';
import Register from './register';
import axios from 'axios';
import { AuthProvider } from './AuthProvider'; // import the AuthProvider

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <div className='main'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />}/>
            <Route path="user_profile" element={<Profile />}/>
            <Route path="films" element={<Films />}/>
            <Route path="/login" element={<LoginErrorPage />}/>
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
