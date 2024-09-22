import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Import các trang
import Home from "./pages/Home";
import Single from "./pages/Single";
import Cart from "./pages/Cart";
import Cart2 from "./pages/Cart2";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Search from "./pages/Search";
import Bills from "./pages/Personal";
import Services from "./pages/Services";
import SingleService from "./pages/SingleService";
import Success from "./pages/Success";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import TypeBlogs from "./pages/TypeBlogs";
import ForgotPass from "./pages/ForgotPass";
import Orders from "./pages/Orders";
import Recall from "./pages/Recall";




function App() {
  const isLoggedIn = localStorage.getItem("token");
  const hasUserId = localStorage.getItem("id");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Single />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/san-pham/:id" element={<Categories />} />
        <Route path="/thuong-hieu/:id" element={<Brands />} />

        {/* Giỏ hàng tùy thuộc vào trạng thái đăng nhập */}
        <Route path="/gio-hang" element={hasUserId ? <Cart2 /> : <Cart />} />

        {/* Trang tài khoản và hóa đơn chỉ cho người dùng đã đăng nhập */}
        {isLoggedIn && (
          <>
            <Route path="/tai-khoan" element={<Bills />} />
            <Route path="/hoa-don" element={<Orders />} />
          </>
        )}

        <Route path="/about" element={<About />} />
        <Route path="/tin-tuc" element={<Blogs />} />
        <Route path="/loai-tin-tuc/:id" element={<TypeBlogs />} />
        <Route path="/tin-tuc/:id" element={<SingleBlog />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dich-vu" element={<Services />} />
        <Route path="/dich-vu/:id" element={<SingleService />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/quen-mat-khau" element={<ForgotPass />} />
        <Route path="/thiet-lap-mat-khau" element={<Recall />} />
        <Route path="/tim-kiem/:id" element={<Search />} />
        <Route path="/pay-success" element={<Success />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
