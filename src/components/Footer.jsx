/* eslint-disable*/
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [sitemap, setSiteMap] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "sitemap").then((res) => {
      setSiteMap(res.data);
    });
  }, []);

  return (
    <>
      <section className="footer-section bg-section-2 section-padding mt-0">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 g-4">
            <div className="col">
              <div className="footer-widget-6">
                <Link to="/about">
                  <img
                    src="/assets/images/codevui_shop.png"
                    className="logo-img mb-2"
                    alt=""
                  />
                </Link>
                <h5 className="mb-3 fw-bold">Về chúng tôi</h5>
                <p className="mb-20" style={{ textAlign: "justify" }}>
                  Chúng tôi không chỉ là nơi bạn có thể đặt lịch làm tóc để có
                  mái tóc đẹp tự tin, mà còn là địa điểm tuyệt vời để khám phá
                  các sản phẩm chăm sóc tóc và da mặt.
                </p>
                <a className="link-dark" href="javascript:;">
                  Đọc thêm
                </a>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-7">
                <h5 className="mb-3 fw-bold">Cửa hàng</h5>
                <ul className="widget-link list-unstyled">
                  {sitemap.length > 0 &&
                    sitemap.map((item, index) =>
                      item.static_page === 0 ? (
                        <li key={index}>
                          <a href={item.url}>{item.page}</a>
                        </li>
                      ) : null
                    )}
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-8">
                <h5 className="mb-3 fw-bold">Thông tin</h5>
                <ul className="widget-link list-unstyled">
                  {sitemap.length > 0 &&
                    sitemap.map((item, index) =>
                      item.static_page === 1 ? (
                        <li key={index}>
                          <a href={item.url}>{item.page}</a>
                        </li>
                      ) : null
                    )}

                  {/* <li>
                    <a href="/">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="/">Liên hệ</a>
                  </li>
                  <li>
                    <a href="/">Blog</a>
                  </li>
                  <li>
                    <a href="/">Privacy</a>
                  </li>
                  <li>
                    <a href="/">Terms</a>
                  </li>
                  <li>
                    <a href="/">Complaints</a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-9">
                <h5 className="mb-3 fw-bold">Theo dõi chúng tôi</h5>
                <div className="social-link d-flex align-items-center gap-2">
                  <a href="javascript:;">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="javascript:;">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="javascript:;">
                    <i className="bi bi-linkedin" />
                  </a>
                  <a href="javascript:;">
                    <i className="bi bi-youtube" />
                  </a>
                  <a href="javascript:;">
                    <i className="bi bi-instagram" />
                  </a>
                </div>
                <div className="mb-3 mt-3">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125430.3743159128!2d106.61966090126204!3d10.757649992134107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1sen!2s!4v1719279653416!5m2!1sen!2s"
                    width={"100%"}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
