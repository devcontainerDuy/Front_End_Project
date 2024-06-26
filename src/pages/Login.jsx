import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container pt-5 pb-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <>
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" disabled aria-current="page">
                  <a style={{ textDecoration:'none' }} href="#">Đăng nhập</a>
                </li>
              </>
            </ol>
          </nav>
          <div class="card rounded text-white border-0 ">
            <div class="card-body bg-success p-3 text-dark bg-opacity-25 rounded">
              <div className="row">
                <div className="col-md-6">
                  <img
                    className="img-fluid"
                    src="https://static.vecteezy.com/system/resources/thumbnails/008/014/115/small_2x/tropical-leaves-background-design-summer-leaves-flat-illustration-simple-banner-with-copy-space-free-vector.jpg"
                    alt=""
                  />
                </div>
                <div className="col-md">
                  <div className="mb-3 align-middle">
                    <label for="" className="text-dark form-label">
                      Tên tài khoản
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3 align-middle">
                    <label for="" className="text-dark form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3 align-middle">
                    <label for="" className="text-dark form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <div className="mb-3 align-middle">
                    <label for="" className="text-dark form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-sm btn-primary">
                        Tạo tài khoản
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
