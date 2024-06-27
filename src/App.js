import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Single from './pages/Single';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart2 from './pages/Cart2';
function App() {
  return (
    < >
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/:id'  element={<Single/>}/>
        {localStorage.getItem('id') && <>
          <Route path='/gio-hang'  element={<Cart2/>}/>
        </>}
        {!localStorage.getItem('id') && <>
          <Route path='/gio-hang'  element={<Cart/>}/>
        </>}
        <Route path='/dang-ky' element={<Register/>}/>
        <Route path='/dang-nhap' element={<Login/>}/>
        <Route path='/not-found'  element={<NotFound/>}/>
        <Route path='*'  element={<NotFound/>}/>
    
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
