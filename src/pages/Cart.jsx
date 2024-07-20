/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { Notyf } from "notyf";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "notyf/notyf.min.css";
import Header from "../components/Header";
import Swal from "sweetalert2";
function Cart() {
  const [carts, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [address, setAddress] = useState("");
  const [checkOut, setCheckOut] = useState(false);
  const updateQuantity = (id, e) => {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((el) => {
      if (el[0] == id) {
        el[1] = Number(e.target.value);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  };
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
        background: "red",
        color: "white",
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

  const loadCart = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "products/loadCart", {
        cart: JSON.parse(localStorage.getItem("cart")),
      })
      .then((res) => {
        if(res.data.length>0){
          var sum =0
          res.data.forEach(el => {
              sum+=el.discount*el.quantity;
          });
        }else{
          var sum =0;
        }
        setCart(res.data);
        console.log(sum);
        setTotal(sum)
      });
  };
  const vnpaycheckout =()=>{
        if (!fullname || !email || !phone || !address) {
      notyf.error("Please fill in all the fields.");
      return;
    }

    const orderDetails = {
      name: fullname,
      email: email,
      phone: phone,
      vnpay:true,
      total:total,
      address: address,
      cart: JSON.parse(localStorage.getItem('cart')),
    };

    axios
      .post(process.env.REACT_APP_API_URL + "bills", orderDetails)
      .then((response) => {
        if (response.data.check==true) {
          if(response.data.url){
            window.open(response.data.url, "_blank", "noreferrer");
          }
          localStorage.removeItem("cart");
          setCart([]);
          setFullname("");
          setEmail("");
          setPhone("");
          setAddress("");
          setTotal(0);
        } else {
          notyf.error("Fail đặt hàng.");
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  }
  const submitBook = () => {
    if (!fullname || !email || !phone || !address) {
      notyf.error("Please fill in all the fields.");
      return;
    }

    const orderDetails = {
      name: fullname,
      email: email,
      phone: phone,
      address: address,
      cart: JSON.parse(localStorage.getItem('cart')),
    };

    axios
      .post(process.env.REACT_APP_API_URL + "bills", orderDetails)
      .then((response) => {
        if (response.data.check==true) {
          notyf.success("Đặt hàng thành công!");
          localStorage.removeItem("cart");
          setCart([]);
          setFullname("");
          setEmail("");
          setPhone("");
          setAddress("");
          setTotal(0);
        } else {
          notyf.error("Fail đặt hàng.");
        }
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };

  const deleteItem = (id) => {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var arr = [];
    cart.forEach((el) => {
      if (el[0] != id) {
        arr.push(el);
      }
    });
    if(arr.length>0){
      localStorage.setItem("cart", JSON.stringify(arr));
      loadCart();
    }else{
      setCart([]);  
      setTotal(0);
      localStorage.removeItem('cart');
    }
  };
  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {}, [localStorage.getItem("cart_token")]);
  return (
    <>
      <Header />
      <section className="section-padding">
        <div className="container pt-5">
          <div className="d-flex align-items-center px-3 py-2 border mb-4">
            <div className="text-start">
              <h4 className="mb-0 h4 fw-bold">Giỏ hàng</h4>
            </div>
            <div className="ms-auto">
              <a href="/san-pham" className="btn btn-light btn-ecomm">
                Tiếp tục mua sắm
              </a>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-xl-8">
              <div className="card rounded-0 mb-3">
                <div className="card-body" style={{ fontFamily: "Times New Roman" }}>
                  {window.innerWidth > 800 && (
                    <>
                      {carts && carts.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-light">
                            <thead>
                              <tr>
                                <th style={{ width: "20%" }}>#</th>
                                <th style={{ width: "65%" }}>Sản phẩm</th>
                                <th scope="col">Thành tiền</th>
                              </tr>
                            </thead>
                            <tbody>
                              {carts &&carts.length>0 && carts.map((item, index) => (
                                <tr key={index}>
                                  <td scope="row">
                                    <a href={`/${item.slug}`}>
                                      <img
                                        src={`${process.env.REACT_APP_IMG_URL}products/${item.image}`}
                                        width={150}
                                        alt=""
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <h5 className="fw-bold mb-0">
                                      <a style={{ textDecoration: "none" }} href={`/${item.slug}`}>
                                        {item.name ? item.name : "Item"}
                                      </a>
                                    </h5>
                                    <div className="product-price d-flex align-items-center gap-2 mt-3">
                                      <div className="h6 fw-bold">
                                        <span className="text-decoration-line-through pe-2">
                                          {Intl.NumberFormat("en-US").format(
                                            Number(item.price)
                                          )}
                                        </span>
                                        <span className="text-danger">
                                          {Intl.NumberFormat("en-US").format(
                                            Number(item.discount)
                                          )}
                                        </span>
                                        <br />
                                        <label htmlFor="" className="mt-2">
                                          Số lượng
                                        </label>
                                        <div className="input-group mb-3">
                                          <input
                                            type="number"
                                            className="form-control mt-2"
                                            value={item.quantity}
                                            onChange={(e) =>
                                              updateQuantity(item.id, e)
                                            }
                                          />
                                          <button
                                            className="btn btn-outline-danger mt-2"
                                            type="button"
                                            onClick={() => deleteItem(item.id)}
                                          >
                                            Xoá
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {Intl.NumberFormat("en-US").format(
                                      Number(item.total)
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <h4>Giỏ hàng rỗng</h4>
                      )}
                    </>
                  )}

                  {window.innerWidth <= 768 && (
                    <>
                      {carts && carts.length > 0 ? (
                        carts.map((item, index) => (
                          <div key={index} className="card mb-3">
                            <div className="card-header">
                              <a href={`/${item.slug}`}>
                                <img style={{ width: "100px", margin: "0px auto" }} src={process.env.REACT_APP_IMG_URL + "products/" + item.image} alt={item.name} />
                              </a>
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">
                                <a
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                  href={`/${item.slug}`}
                                >
                                  {item.name}
                                </a>
                              </h5>
                              <p className="card-text">Giá: {Intl.NumberFormat("en-US").format(item.price)}</p>
                              <p className="card-text">
                                Số lượng:
                                <input
                                  type="number"
                                  className="form-control d-inline-block w-auto ms-2"
                                  onChange={(e) => updateQuantity(item.purchaseId, item.quantity, item.id, e)}
                                  value={item.quantity}
                                />
                              </p>
                              <p className="card-text">Thành tiền: {Intl.NumberFormat("en-US").format(item.price * item.quantity)}</p>
                            </div>
                            <div className="card-footer text-end">
                              <button className="btn btn-danger btn-sm" onClick={(e) => deleteItem(item.id)}>
                                Xóa
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="card p-3">
                          <h4>Giỏ hàng rỗng</h4>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="card rounded-0 mb-3">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Hóa đơn</h5>
                  <div className="hstack align-items-center justify-content-between">
                    <p className="mb-0">Tổng hóa đơn :{Intl.NumberFormat("en-US").format(Number(total))}</p>
                  </div>
                  <hr />
                  {carts.length > 0 && (
                    <>
                      									<div className="container mt-4">
												<div className="mb-3">
													<label htmlFor="formGroupFullname" className="form-label fw-bold">
														Tên người mua
													</label>
													<input type="text" className="form-control" id="formGroupFullname" placeholder="Nhập tên của người mua..." onChange={(e) => setFullname(e.target.value)} />
												</div>
												<div className="mb-3">
													<label htmlFor="formGroupEmail" className="form-label fw-bold">
														Địa chỉ email
													</label>
													<input type="email" className="form-control" id="formGroupEmail" placeholder="Nhập vào địa chỉ email của bạn..." onChange={(e) => setEmail(e.target.value)} />
												</div>
												<div className="mb-3">
													<label htmlFor="formGroupPhone" className="form-label fw-bold">
														Số điện thoại
													</label>
													<input type="tel" className="form-control" id="formGroupPhone" placeholder="Nhập số điện thoại của bạn..." onChange={(e) => setPhone(e.target.value)} />
												</div>
												<div className="mb-3">
													<label htmlFor="formGroupAddress" className="form-label fw-bold">
														Địa chỉ nhận hàng
													</label>
													<input type="text" className="form-control" id="formGroupAddress" placeholder="Nhập vào địa chỉ nhận hàng của bạn..." onChange={(e) => setAddress(e.target.value)} />
												</div>
												<div className="d-grid mt-4">
													<button onClick={submitBook} type="button" className="btn btn-dark btn-ecomm py-3 px-5">
														Thanh toán hóa đơn
													</button>
												</div>
                        <div className="row mt-3 text-center">
                          <div className="col-md-5 w-100">
                          <button className="btn btn-primary" onClick={(e)=>vnpaycheckout()}>
                          <i class="bi bi-menu-button-wide me-3"></i> VNPay
                          </button>
                          </div>
                        </div>
											</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
