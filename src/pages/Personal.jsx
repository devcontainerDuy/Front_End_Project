/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Header from "../components/Header";
function Personal() {
  const [bills, setBills] = useState([]);
  const [idBill, setIdBill] = useState(0);
  const [single, setSingle] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [verified, setVerified] = useState(null);
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "customers/bills?page=" + page, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBills(res.data.data);
        setLastPage(res.data.last_page);
      });
  }, [page]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [password2, setPassword2] = useState("");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "customers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setPhone(res.data.phone);
        setAdress(res.data.address);
        setEmail(res.data.email);
        setVerified(res.data.verified);
      });
  }, []);
  const submitName = () => {
    if (name == "") {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập email mới",
      });
    } else {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "customers/" +
            localStorage.getItem("id"),
          {
            name: name,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.check == true) {
            notyf.open({
              type: "success",
              message: "Đã cập nhật tên thành công",
            });
            setName(res.data.data.name);
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
  const submitPhone = () => {
    if (phone == "") {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập số điện thoại mới",
      });
    } else {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "customers/" +
            localStorage.getItem("id"),
          {
            phone: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.check == true) {
            notyf.open({
              type: "success",
              message: "Đã cập nhật số điện thoại thành công",
            });
            setPhone(res.data.data.phone);
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
  const submitAddress = () => {
    if (address == "") {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập địa chỉ mới",
      });
    } else {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "customers/" +
            localStorage.getItem("id"),
          {
            address: address,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.check == true) {
            notyf.open({
              type: "success",
              message: "Đã cập nhật địa chỉ thành công",
            });
            setAdress(res.data.data.address);
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
  const submitEmail = () => {
    if (email == "") {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập email mới",
      });
    } else {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "customers/" +
            localStorage.getItem("id"),
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.check == true) {
            notyf.open({
              type: "success",
              message: "Đã cập nhật email thành công",
            });
            setEmail(res.data.data.email);
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
  const submitPassword = () => {
    if (password == "") {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập mật khẩu mới",
      });
    } else {
      setOpen(true);
    }
  };
  const submitChangePass = () => {
    if (password != password2) {
      notyf.open({
        type: "error",
        message: "Vui lòng nhập đúng mật khẩu mới",
      });
    } else {
      axios
        .put(
          process.env.REACT_APP_API_URL +
            "customers/" +
            localStorage.getItem("id"),
          {
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.check == true) {
            notyf.open({
              type: "success",
              message: "Đã cập nhật thành công",
            });
            setTimeout(() => {
              localStorage.clear();
              window.location.replace("/");
            }, 2000);
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
  useEffect(() => {
    if (idBill !== 0) {
      bills.forEach((el) => {
        if (el.id == idBill) {
          setSingle(el);
        }
      });
    }
  }, [idBill]);
  return (
    <>
      <Header />

      <div className="page-content" style={{ minHeight: "470px" }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập lại mật khẩu"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  id="button-addon2"
                  onClick={(e) => submitChangePass()}
                >
                  Thay đổi
                </button>
              </div>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal>
        <div style={{ fontSize: "18px" }} className="pt-4 container">
          <div class="card shadow mb-5">
            <div class="card-body">
              <div className="d-flex align-items-start">
                <div
                  className="nav flex-column nav-pills me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                    onClick={(e) => {
                      setIdBill(0);
                      setSingle(null);
                    }}
                  >
                    Bills
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    TTTK
                  </button>
                </div>
                <div className="tab-content w-100" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    {!single && (
                      <div class="table-responsive w-100">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col-2">Ngày mua</th>
                              <th scope="col-2">Số hóa đơn</th>
                              <th scope="col-2">Trạng thái</th>
                              <th scope="col-2">Tổng tiền</th>
                              <th scope="col-2">Tùy chọn</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bills.length > 0 &&
                              bills.map((item, index) => (
                                <tr class="">
                                  <td>{++index}</td>
                                  <td scope="row">
                                    {formatDate(item.created_at)}
                                  </td>
                                  <td>HD_00{item.id}</td>
                                  <td>
                                    {item.status == 0 ? "Đặt hàng" : ""}

                                    {item.status == 1 ? "Thành công" : ""}
                                    {item.status == 2 ? "Thất bại" : ""}
                                  </td>

                                  <td>
                                    {Intl.NumberFormat("en-US").format(
                                      item.total
                                    )}
                                  </td>

                                  <td>
                                    <a
                                      href="#"
                                      className="btn btn-sm btn-primary"
                                      onClick={(e) => setIdBill(item.id)}
                                    >
                                      Xem thêm
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            {bills.length == 0 && (
                              <tr>
                                <td colSpan={5}>Chưa phát sinh đơn hàng</td>
                              </tr>
                            )}
                            {page > 1 && (
                              <button
                                className="btn btn-outline-secondary mt-2"
                                onClick={() => setPage(page - 1)}
                              >
                                &lt;&lt;
                              </button>
                            )}
                            {page != null && page < lastPage && (
                              <button
                                className="btn btn-outline-primary mt-2"
                                onClick={() => setPage(page + 1)}
                              >
                                &gt;&gt;
                              </button>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {single && (
                      <div className="row">
                        <div className="col-md-2">
                          <ul className="list-group">
                            {bills.map((bill, index) => (
                              <li
                                onClick={(e) => setIdBill(bill.id)}
                                className={
                                  bill.id == idBill
                                    ? "list-group-item active"
                                    : "list-group-item"
                                }
                                aria-current="true"
                              >
                                HD_00{bill.id} <br />
                                {formatDate(bill.created_at)}
                              </li>
                            ))}
                          </ul>
                          <div className="row">
                            <div className="col-md-6">
                              {page > 1 && (
                                <button
                                  className="btn btn-outline-secondary mt-2"
                                  onClick={() => setPage(page - 1)}
                                >
                                  &lt;&lt;
                                </button>
                              )}
                              {page != null && page < lastPage && (
                                <button
                                  className="btn btn-outline-primary mt-2"
                                  onClick={() => setPage(page + 1)}
                                >
                                  &gt;&gt;
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md">
                          {single && (
                            <div className="row">
                              <div className="col-md">
                                <div className="card text-start">
                                  <div className="card-body">
                                    <h4 className="card-title">
                                      Hóa đơn : HD_00{single.id}
                                    </h4>
                                    <p
                                      className="card-text"
                                      style={{ fontSize: "18px" }}
                                    >
                                      Tên người nhận: {single.name}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                      {" "}
                                      Số điện thoại người nhận: {single.phone}
                                    </p>
                                    <p style={{ fontSize: "18px" }}>
                                      Địa chỉ : {single.address}
                                    </p>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="">Ghi chú</label>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: single.note,
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="table-responsive">
                                        <table className="table table-striped">
                                          <thead className="">
                                            <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Tên sản phẩm</th>
                                              <th scope="col">Đơn giá</th>
                                              <th scope="col">Số lượng</th>
                                              <th scope="col">Giá tiền</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {single.details.map(
                                              (line, index) => (
                                                <tr key={line.id}>
                                                  <td scope="row">
                                                    {index + 1}
                                                  </td>
                                                  <td>{line.product.name}</td>
                                                  <td>
                                                    {Intl.NumberFormat(
                                                      "en-US"
                                                    ).format(
                                                      line.product.price
                                                    )}
                                                  </td>
                                                  <td>{line.quantity}</td>
                                                  <td>
                                                    {Intl.NumberFormat(
                                                      "en-US"
                                                    ).format(
                                                      line.quantity *
                                                        line.product.price
                                                    )}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                            <tr>
                                              <td colSpan={4}>Tổng tiền</td>
                                              <td>
                                                {Intl.NumberFormat(
                                                  "en-US"
                                                ).format(single.total)}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
  className="tab-pane fade"
  id="v-pills-profile"
  role="tabpanel"
  aria-labelledby="v-pills-profile-tab"
>
<div className="row">
                      <div className="col-md">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email mới"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  id="button-addon2"
                                  onClick={(e) => submitEmail()}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Họ tên"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  id="button-addon2"
                                  onClick={(e) => submitName()}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Số diện thoại"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  id="button-addon2"
                                  onClick={(e) => submitPhone()}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Địa chỉ"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={address}
                                  onChange={(e) => setAdress(e.target.value)}
                                />
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  id="button-addon2"
                                  onClick={(e) => submitAddress()}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-group mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Mật khẩu mới"
                                  aria-label="Recipient's username"
                                  aria-describedby="button-addon2"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  id="button-addon2"
                                  onClick={(e) => submitPassword()}
                                >
                                  Thay đổi
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Personal;
