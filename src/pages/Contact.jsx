/* eslint-disable*/
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container pt-3 pb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Liên hệ
              </li>
            </ol>
          </nav>

          <div class="card shadow">
            <div class="card-body shadow">
              <div className="row">
                <div className="col-md-5">
                  <img
                    className="img-fluid"
                    src="https://img.freepik.com/free-photo/smiling-businesswoman-having-corporate-conversation_482257-8054.jpg?t=st=1721199133~exp=1721202733~hmac=4bc6654c59ebed7128ab1c1026cae4613a69b6abd1d4f5ee8050f70eb9d11935&w=1380"
                    alt=""
                  />
                </div>
                <div className="col-md align-items-center">
                  <div className="row w-100">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName">Họ tên</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        placeholder="Họ tên . . ."
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phoneNumber">Số điện thoại</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Số điện thoại . . ."
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row w-100">
                    <div className="col-md">
                        <label htmlFor="">Chủ đề</label>
                        <input type="text" placeholder="Số điện thoại" className="form-control" />
                    </div>
                  </div>
                  <div className="row w-100">
                    <div className="col-md">
                        <label htmlFor="">Tin nhắn</label>
                        <textarea name="" className="form-control" rows={5} id=""></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md pt-2">
                        <button className="btn btn-primary">Gửi yêu cầu</button>
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

export default Contact;
