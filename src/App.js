import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../src/home";
import Header from './components/header';

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
