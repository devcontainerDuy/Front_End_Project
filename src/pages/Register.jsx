/* eslint-disable*/
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";

function Register() {
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [confirm_password,setConfirmPassword]= useState('');
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
  const submitRegister =()=>{
    if(name==''){
      notyf.open({
        type: "error",
        message: "Thiếu tên tài khoản",
      });
    }else if(email==''){
      notyf.open({
        type: "error",
        message: "Thiếu email tài khoản",
      });
    }else if(password==''){
      notyf.open({
        type: "error",
        message: "Thiếu mật khẩu",
      });
    }else if(confirm_password==''){
      notyf.open({
        type: "error",
        message: "Vui lòng xác nhận lại mật khẩu",
      });
    }else if(password!=confirm_password){
      notyf.open({
        type: "error",
        message: "Vui lòng nhập lại mật khẩu",
      });
    }else{
      axios.post(process.env.REACT_APP_API_URL+'customers/auth/register',{
        name:name,
        email:email,
        password:password
      }).then((res)=>{
        if(res.data.check==true){
          notyf.open({
            type: "success",
            message: "Đăng ký thành công",
          });
          setTimeout(() => {
            window.location.replace('/dang-nhap');
          }, 1200);
        }else if(res.data.check==false){
          if(res.data.msg){
            notyf.open({
              type: "error",
              message: res.data.msg,
            });
          }
        }
      })
    }
  }
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
                  <a style={{ textDecoration:'none' }} href="#">Đăng ký</a>
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
                      onChange={(e)=>setName(e.target.value)}
                      id=""
                      placeholder="Tên tài khoản"
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
                      onChange={(e)=>setEmail(e.target.value)}
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
                      onChange={(e)=>setPassword(e.target.value)}
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
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-sm btn-primary" onClick={(e)=>submitRegister()}>
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

export default Register;
