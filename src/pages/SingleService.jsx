/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Helmet } from "react-helmet";
import Chat from "../components/Chat";
import CommentList from "../components/CommentList";

function SingleService() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [book, setBook] = useState(false);
  const [comments, setComments] = useState([
    { name: "Nguyen Van A", content: "Dịch vụ rất tốt!" },
    { name: "Tran Thi B", content: "Tôi sẽ quay lại lần sau." },
  ]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}services/service/${id}`
        );
        const data = await response.json();
        setService(data[0]);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      }
    };

    fetchService();
  }, [id]);

  const notyf = new Notyf({
    duration: 3000,
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
    ],
  });

  // Create booking
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let idusr = localStorage.getItem("id");

    if (!name || !phone || !email || !time || !date) {
      notyf.error("Vui lòng điền đầy đủ thông tin đặt lịch");
      return;
    }

    if (checkbox) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}bookings`,
          {
            email,
            name,
            time: `${date} ${time}:00`,
            id_service: Number(service.id),
            phone,
          }
        );

        if (response.data.check) {
          notyf.success("Đặt lịch thành công");
          setBook(false);
        } else {
          notyf.error(response.data.msg);
        }
      } catch (error) {
        notyf.error("Có lỗi xảy ra khi đặt lịch.");
        console.error(error);
      }
    } else {
      notyf.error("Vui lòng phải đồng ý chính sách");
    }
  };

  return (
    <>
      <Helmet>
        <title>{service.name}</title>
        <meta name="description" content={service.name} />
      </Helmet>
      <Header />
      <div className="page-content">
        <div className="container pt-4 pb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Dịch vụ
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h3 className="text-danger">{service.name}</h3>
                </div>
                <div className="col-md text-end">
                  <span className="text-decoration-line-through">
                    {Intl.NumberFormat("en-US").format(
                      Number(service.compare_price)
                    )}
                  </span>{" "}
                  <span className="text-danger">
                    {Intl.NumberFormat("en-US").format(Number(service.price))}
                  </span>
                  <br />
                  <button
                    className={`btn ${book ? "btn-secondary" : "btn-primary"}`}
                    onClick={() => setBook(!book)}
                  >
                    {book ? "Hủy đặt" : "Đặt lịch"}
                  </button>
                </div>
              </div>
              <div className="row">
                {!book ? (
                  <div className="col-md">
                    <div
                      dangerouslySetInnerHTML={{ __html: service.content }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="col-md-8">
                      <div
                        dangerouslySetInnerHTML={{ __html: service.content }}
                      />
                    </div>
                    <div className="col-md">
                      <form onSubmit={handleSubmit}>
                        <h2>
                          <strong>Đặt lịch</strong>
                        </h2>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            <strong>Tên người đặt lịch</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên của bạn..."
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            <strong>Số điện thoại người đặt</strong>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập vào số điện thoại của bạn..."
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            <strong>Địa chỉ email người đặt</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập địa chỉ email..."
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="dateTime" className="form-label">
                            <strong>Thời gian đến</strong>
                          </label>
                          <div className="d-flex">
                            <input
                              type="time"
                              className="form-control me-1"
                              onChange={(e) => setTime(e.target.value)}
                              required
                            />
                            <input
                              type="date"
                              className="form-control ms-1"
                              onChange={(e) => setDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="terms"
                            onChange={(e) => setCheckbox(e.target.checked)}
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="terms"
                          >
                            <small>
                              Tôi đã đọc kĩ <a href="#">điều khoản</a> và{" "}
                              <a href="#">chính sách</a>
                            </small>
                          </label>
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                          Đặt lịch hẹn ngay!
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card shadow mt-4">
              <div className="card-body">
                <CommentList comments={comments} />
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-3 rounded">
            <h3 className="fw-bold">Trò chuyện với app</h3>
            <div className="col">
              <div className="card shadow border-0">
                <div className="card-body">
                  <Chat />
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

export default SingleService;
