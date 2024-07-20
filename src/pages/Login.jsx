/* eslint-disable*/
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";

function Login() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
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
  const submitLogin=()=>{
    if(email==''){
      notyf.open({
        type: "error",
        message: "Thiếu email tài khoản",
      });
    }else if(password==''){
      notyf.open({
        type: "error",
        message: "Thiếu mật khẩu tài khoản",
      });
    }else{
      axios.post(process.env.REACT_APP_API_URL+'customers/auth/login',{
        email:email,
        password:password
      }).then((res)=>{
        if(res.data.check==true){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('id',res.data.id);
          notyf.open({
            type: "success",
            message: "Đăng nhập thành công",
          });
          setTimeout(() => {
            window.location.replace('/');
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
                  <a style={{ textDecoration:'none' }} href="#">Đăng nhập</a>
                </li>
              </>
            </ol>
          </nav>
          <div class="card rounded text-white border-0 ">
            <div class="card-body shadow p-3 text-dark bg-opacity-25 rounded">
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
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e)=>setEmail(e.target.value)}
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
                      onChange={(e)=>setPassword(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-sm btn-primary" onClick={(e)=>submitLogin()}>
                      Đăng nhập
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
