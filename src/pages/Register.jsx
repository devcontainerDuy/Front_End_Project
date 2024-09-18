/* eslint-disable*/
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";
import { Helmet } from "react-helmet";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "success",
        background: "green",
        color: "white",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "info",
        background: "#24b3f0",
        color: "white",
        duration: 1500,
        dismissible: false,
        icon: '<i class="bi bi-bag-check"></i>',
      },
    ],
  });
  const submitRegister = () => {
    if (name == "") {
      notyf.open({
        type: "error",
        message: "Thiếu tên tài khoản",
      });
    } else if (email == "") {
      notyf.open({
        type: "error",
        message: "Thiếu email tài khoản",
      });
    } else if (password == "") {
      notyf.open({
        type: "error",
        message: "Thiếu mật khẩu",
      });
    } else if (confirm_password == "") {
      notyf.open({
        type: "error",
        message: "Vui lòng xác nhận lại mật khẩu",
      });
    } else if (password != confirm_password) {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập lại mật khẩu",
      });
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "customers/auth/register", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.check == true) {
            notyf.open({
              type: "success",
              message: "Đăng ký thành công",
            });
            setTimeout(() => {
              window.location.replace("/dang-nhap");
            }, 1200);
          } else if (res.data.check == false) {
            if (res.data.msg) {
              notyf.open({
                type: "error",
                message: res.data.msg,
              });
            }
          }
        });
    }
  };
  return (
    <>
      <Header />
      <Helmet>
        <title>Đăng ký</title>
        <meta name="description" content="Đăng ký" />
      </Helmet>
      <div className="page-content">
        <div className="container pt-5 pb-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <>
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" disabled aria-current="page">
                  <a style={{ textDecoration: "none" }} href="#">
                    Đăng ký
                  </a>
                </li>
              </>
            </ol>
          </nav>
          <section className="container px-0">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                <div className="col-12 col-md-6 text-bg-dark">
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="col-10 col-xl-8 py-3">
                      {/* <img className="img-fluid rounded mb-4" loading="lazy" src="/assets/images/codevui_shop.png" width={245} height={80} alt="Logo" /> */}
                      <hr className="border-dark-subtle mb-4" />
                      <h2 className="h1 mb-4">30GLOW</h2>
                      <p className="lead m-0">Hệ thống chuyên gia tóc cao cấp.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-5">
                          <h3>Đăng Ký</h3>
                        </div>
                      </div>
                    </div>
                    <form action="#!">
                      <div className="row gy-3 gy-md-4 overflow-hidden">
                        <div className="col-12">
                          <label htmlFor="username" className="form-label">
                            Tên tài khoản <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} name="username" id="username" placeholder="Tên tài khoản" required="" />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Địa chỉ Email <span className="text-danger">*</span>
                          </label>
                          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="name@example.com" required="" />
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">
                            Mật khẩu <span className="text-danger">*</span>
                          </label>
                          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} name="password" id="password" defaultValue="" required="" />
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">
                            Nhập lại mật khẩu <span className="text-danger">*</span>
                          </label>
                          <input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} name="password" id="password" defaultValue="" required="" />
                        </div>

                        <div className="col-12">
                          <div className="d-grid">
                            <button className="btn bsb-btn-xl btn-dark" onClick={(e) => submitRegister()} type="button">
                              Đăng ký
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12">
                        {/* <hr className="mt-5 mb-4 border-secondary-subtle" /> */}
                        <div className="d-flex mt-2 gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                          <a href="/dang-nhap" className="link-secondary text-decoration-none">
                            Đã có tài khoản ?
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex gap-3 flex-column flex-xl-row">
                          {/* <a href="#!" className="btn bsb-btn-xl btn-outline-dark">
														<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
															<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
														</svg>
														<span className="ms-2 fs-6">Facebook</span>
													</a>
													<a href="#!" className="btn bsb-btn-xl btn-outline-dark">
														<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
															<path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
														</svg>
														<span className="ms-2 fs-6">Twitter</span>
													</a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
