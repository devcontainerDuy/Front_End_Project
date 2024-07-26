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
import Products from './pages/Products';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import Search from './pages/Search';
import Bills from './pages/Personal';
import Services from './pages/Services';
import SingleService from './pages/SingleService';
import Success from './pages/Success';
import Contact from './pages/Contact';
import About from './pages/About';
import Blogs from './pages/Blogs';
import SingleBlog from './pages/SingleBlog';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Single />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/:id" element={<Categories />} />
          <Route path="/thuong-hieu/:id" element={<Brands />} />

          {localStorage.getItem("id") && (
            <>
              <Route path="/gio-hang" element={<Cart2 />} />
            </>
          )}
          {!localStorage.getItem("id") && (
            <>
              <Route path="/gio-hang" element={<Cart />} />
            </>
          )}
          {localStorage.getItem("token") && (
            <>
              <Route path="/tai-khoan" element={<Bills />} />
            </>
          )}
          <Route path="/about" element={<About />} />
          <Route path="/tin-tuc" element={<Blogs />} />
          <Route path="/tin-tuc/:id" element={<SingleBlog />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/dich-vu" element={<Services />} />
          <Route path="/dich-vu/:id" element={<SingleService />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/tim-kiem/:id" element={<Search />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/pay-success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
