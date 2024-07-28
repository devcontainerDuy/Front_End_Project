/* eslint-disable */
import React from "react";
import "../assets/css/services.css";
function Service({ name, price, compare_price, slug, image }) {
  return (
    <a style={{ textDecoration: "none" }} href={`/${slug}`}>
      <div className="card shadow pt-2 border-0">
        <div
          className="position-relative overflow-hidden"
          style={{ margin: "0px auto" }}
        >
          <div className="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0">
          </div>
          <a href={`/${slug}`}>
            <img
              style={{ height: "200px", width: "auto" }}
              src={process.env.REACT_APP_IMG_URL + "services/" + image}
              className="card-img-top"
              alt={name}
            />
          </a>
        </div>
        <div className="card-body" style={{ minHeight: "140px" }}>
          <div className="service-info text-center">
            <a style={{ textDecoration: "none" }} href={`/${slug}`}>
              <h6 className="mb-1 fw-bold service-name">{name}</h6>
            </a>
            <div className="ratings mb-1 h6">
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
              <i className="bi bi-star-fill text-warning" />
            </div>
            <span className="mb-0 h6 fw-bold service-price text-danger">
              {Intl.NumberFormat("en-US").format(Number(price))}
            </span>
            <span className="text-decoration-line-through ms-3 mb-0 h6 fw-bold original-price">
              {Intl.NumberFormat("en-US").format(Number(compare_price))}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default Service;
