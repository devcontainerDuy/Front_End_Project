/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
function Single() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [gallery, setGallery] = useState([]);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "products/" + id)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
        setGallery(res.medias);
        setLinks(res.links);
      });
  }, [id]);
  return (
    <>
      <Header />
      <section className="page-content">
        <div className="container mt-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-4">
              <Carousel showStatus={false} showArrows={true}>
                {gallery &&
                  gallery.map((item, index) => (
                    <div key={index}>
                      <img
                        src={process.env.REACT_APP_IMG_URL + "products/" + item}
                        alt={`gallery-${item}`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Single;
