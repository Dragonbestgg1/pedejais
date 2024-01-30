import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../src/home";
import Header from './components/header';
import Activities from './activities';
import Profile from './user_profile';
import Films from './films';

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />}/>
          <Route path="user_profile" element={<Profile />}/>
          <Route path="films" element={<Films />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
