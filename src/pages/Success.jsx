import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Icon from "../components/Icon";

function Success() {
  return (
    <>
      <Header />
      <div className="page-content">
        <section className="section-padding">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6">
                <Icon />
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2 className='text-primary'>Thanh toán thành công </h2>
            <a href="/" className='btn btn-primary'>Quay về</a>
          </div>
        </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default function Success() {
    ;