import React from "react";

function Footer() {
  return (
    <>
      <section className="footer-section bg-section-2 section-padding">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 g-4">
            <div className="col">
              <div className="footer-widget-6">
                <img
                  src="assets/images/logo.webp"
                  className="logo-img mb-3"
                  alt=""
                />
                <h5 className="mb-3 fw-bold">About Us</h5>
                <p className="mb-2">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
                <a className="link-dark" href="javascript:;">
                  Read More
                </a>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-7">
                <h5 className="mb-3 fw-bold">Explore</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <a href="javascript:;">Fashion</a>
                  </li>
                  <li>
                    <a href="javascript:;">Women</a>
                  </li>
                  <li>
                    <a href="javascript:;">Furniture</a>
                  </li>
                  <li>
                    <a href="javascript:;">Shoes</a>
                  </li>
                  <li>
                    <a href="javascript:;">Topwear</a>
                  </li>
                  <li>
                    <a href="javascript:;">Brands</a>
                  </li>
                  <li>
                    <a href="javascript:;">Kids</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-8">
                <h5 className="mb-3 fw-bold">Company</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <a href="javascript:;">About Us</a>
                  </li>
                  <li>
                    <a href="javascript:;">Contact Us</a>
                  </li>
                  <li>
                    <a href="javascript:;">FAQ</a>
                  </li>
                  <li>
                    <a href="javascript:;">Privacy</a>
                  </li>
                  <li>
                    <a href="javascript:;">Terms</a>
                  </li>
                  <li>
                    <a href="javascript:;">Complaints</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-9">
                <h5 className="mb-3 fw-bold">Follow Us</h5>
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
                    width={'100%'}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="my-5" />
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h5 className="fw-bold mb-3">Download Mobile App</h5>
              </div>
              <div className="app-icon d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                <div>
                  <a href="javascript:;">
                    <img
                      src="assets/images/play-store.webp"
                      width={160}
                      alt=""
                    />
                  </a>
                </div>
                <div>
                  <a href="javascript:;">
                    <img
                      src="assets/images/apple-store.webp"
                      width={160}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
      </section>
    </>
  );
}

export default Footer;
