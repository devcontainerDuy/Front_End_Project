/* eslint-disable*/
import React from "react";

function Post({ title ,image,slug}) {
  return (
    <a style={{ textDecoration:'none' }} href={`/${slug}`}>
    <div className="card shadow pt-2 mb-2 border-0">
      <div className="position-relative overflow-hidden" style={{ margin:'0px auto' }}>
        <div className="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0">
        </div>
        <a href={`/tin-tuc/${slug}`}>
          <img
            style={{ height:'200px',width:'auto',}}
            src={process.env.REACT_APP_IMG_URL+'posts/'+image}
            className="card-img-top"
            alt={title}
          />
        </a>
      </div>
      <div className="card-body" style={{ minHeight:'100px' }}>
        <div className="product-info text-center">
        <a style={{ textDecoration:'none' }} href={`/tin-tuc/${slug}`}><h6 className="mb-1 fw-bold product-name">{title}</h6></a>
        </div>
      </div>
    </div>
    </a>
  );
}

export default Post;
