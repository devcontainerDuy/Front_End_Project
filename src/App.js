import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Single from './pages/Single';

function App() {
  return (
    < >
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/:id'  element={<Single/>}/>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
