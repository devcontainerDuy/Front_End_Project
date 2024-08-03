<<<<<<< Updated upstream
/* eslint-disable*/
=======

>>>>>>> Stashed changes
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Helmet } from 'react-helmet';
const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [id]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Họ tên là bắt buộc";
    }
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Email phải kết thúc bằng @gmail.com";
    }
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.subject) {
      newErrors.subject = "Chủ đề là bắt buộc";
    }
    if (!formData.message) {
      newErrors.message = "Tin nhắn là bắt buộc";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch(
        "https://backend.codingfs.com/api/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        notyf.success("Yêu cầu của bạn đã được gửi thành công!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        notyf.error("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      notyf.error("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Liên hệ</title>
        <meta name="description" content="Liên hệ" />
      </Helmet>
      <div id="root">
        <Header />
        <main className="page-content">
          <div className="container pt-3 pb-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
<<<<<<< Updated upstream
                <li className="breadcrumb-item active" aria-current="page">
=======
<li className="breadcrumb-item active" aria-current="page">
>>>>>>> Stashed changes
                  Liên hệ
                </li>
              </ol>
            </nav>

            <div className="card shadow">
              <div className="card-body shadow">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-photo/smiling-businesswoman-having-corporate-conversation_482257-8054.jpg?t=st=1721199133~exp=1721202733~hmac=4bc6654c59ebed7128ab1c1026cae4613a69b6abd1d4f5ee8050f70eb9d11935&w=1380"
                      alt=""
                    />
                  </div>
                  <div className="col-md align-items-center m-5 ">
                    <div className="row w-100">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name">Họ tên</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Họ tên . . ."
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <small className="text-danger">{errors.name}</small>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          placeholder="Email . . ."
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <small className="text-danger">{errors.email}</small>
                        )}
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Số điện thoại . . ."
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && (
                          <small className="text-danger">{errors.phone}</small>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="subject">Chủ đề</label>
                        <input
<<<<<<< Updated upstream
                          type="text"
=======
type="text"
>>>>>>> Stashed changes
                          id="subject"
                          placeholder="Chủ đề . . ."
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                        {errors.subject && (
                          <small className="text-danger">
                            {errors.subject}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-md 20px high">
                        <label htmlFor="message">Tin nhắn</label>
                        <textarea
                          id="message"
                          className="form-control"
                          rows={5}
                          placeholder="Tin nhắn . . ."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && (
                          <small className="text-danger">
                            {errors.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md pt-2">
                        <button
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Gửi yêu cầu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Contact;