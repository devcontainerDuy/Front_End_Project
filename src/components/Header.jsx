/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import { useDispatch, useSelector } from "react-redux";
import { getCollection } from "../redux/CollectionSlice";
import "notyf/notyf.min.css";
import { getBrands } from "../redux/BrandSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
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
  const logout = () => {
    localStorage.clear();
    notyf.open({
      type: "info",
      message: "Hẹn gặp lại",
    });
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  };
  const changeShow = () => {
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const { collections, loading1 } = useSelector((state) => state.collections);
  const { brands, loading } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getCollection());
    dispatch(getBrands());
  }, []);
  return (
    <>
      <header className="top-header">
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên sản phẩm"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-success"
                type="button"
                id="button-addon2"
              >
                Tìm kiếm
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <nav className="navbar navbar-expand-xl w-100 navbar-dark container gap-3">
          <a className="navbar-brand d-none d-xl-inline" href="/">
            <img src="assets/images/logo.webp" className="logo-img" alt="" />
          </a>
          <a
            className="mobile-menu-btn d-inline d-xl-none"
            href="#"
            onClick={(e) => changeShow()}
          >
            <i className="bi bi-list" />
          </a>
          <div
            className={
              show
                ? "offcanvas offcanvas-start show"
                : "offcanvas offcanvas-start"
            }
            tabIndex={-1}
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <div className="offcanvas-logo">
                <img
                  src="/assets/images/logo.webp"
                  className="logo-img"
                  alt=""
                />
              </div>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={(e) => setShow(false)}
              />
            </div>
            <div className="offcanvas-body primary-menu">
              <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item dropdown">
                  {/* <a className="nav-link" href="/san-pham">
                                    Shop
                                    </a> */}
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                    href="javascript:;"
                    data-bs-toggle="dropdown"
                  >
                    Sản phẩm
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/san-pham">
                        Sản phẩm
                      </a>
                    </li>
                    {collections &&
                      collections.map((item, index) => (
                        <li>
                          <a
                            className="dropdown-item"
                            href={"/categories/" + item.slug}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  {/* <a className="nav-link" href="/san-pham">
                                    Shop
                                    </a> */}
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                    href="javascript:;"
                    data-bs-toggle="dropdown"
                  >
                    Thương hiệu
                  </a>
                  <ul className="dropdown-menu">
                    {brands &&
                      brands.map((item, index) => (
                        <li>
                          <a
                            className="dropdown-item"
                            href={"/brands/" + item.slug}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/lien-he">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                    href="javascript:;"
                    data-bs-toggle="dropdown"
                  >
                    Tài khoản
                  </a>
                  <ul className="dropdown-menu">
                    {localStorage.getItem("token") && (
                      <>
                        <li>
                          <a className="dropdown-item" href="/hoa-don">
                            Hóa đơn
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/tai-khoan">
                            Tài khoản
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </>
                    )}
                    <li>
                      <a className="dropdown-item" href="/dang-nhap">
                        Đăng nhập
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/dang-ky">
                        Đăng ký
                      </a>
                    </li>
                    {localStorage.getItem("token") && (
                      <>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => logout()}
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tin-tuc">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="navbar-nav secondary-menu flex-row">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => setLgShow(true)}>
                <i className="bi bi-search" />
              </a>
            </li>
            <li
              className="nav-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
            >
              <a className="nav-link position-relative" href="/gio-hang">
                <i className="bi bi-basket2" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dang-nhap">
                <i className="bi bi-person-circle" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
