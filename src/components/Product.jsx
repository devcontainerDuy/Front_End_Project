/* eslint-disable*/
import React from "react";

function Product({ name, price, discount, slug, image }) {
  return (
    <a style={{ textDecoration:'none' }} href={`/${slug}`}>
    <div className="card shadow pt-2 border-0">
      <div className="position-relative overflow-hidden" style={{ margin:'0px auto' }}>
        <a href={`/${slug}`}>
          <img
            style={{ height:'200px',width:'auto',}}
            src={process.env.REACT_APP_IMG_URL+'products/'+image}
            className="card-img-top"
            alt={name}
          />
        </a>
      </div>
      <div className="card-body" style={{ minHeight:'140px' }}>
        <div className="product-info text-center">
        <a style={{ textDecoration:'none' }} href={`/${slug}`}><h6 className="mb-1 fw-bold product-name">{name}</h6></a>
          <div className="ratings mb-1 h6">
            <i className="bi bi-star-fill text-warning" />
            <i className="bi bi-star-fill text-warning" />
            <i className="bi bi-star-fill text-warning" />
            <i className="bi bi-star-fill text-warning" />
            <i className="bi bi-star-fill text-warning" />
          </div>
          <span className="mb-0 h6 fw-bold product-price text-danger" > {Intl.NumberFormat("en-US").format(Number(discount))}</span>
         
        <span className="text-decoration-line-through ms-3 mb-0 h6 fw-bold original-price">{Intl.NumberFormat("en-US").format(Number(price))}</span>
        </div>
      </div>
    </div>
    </a>
  );
}

export default Product;
