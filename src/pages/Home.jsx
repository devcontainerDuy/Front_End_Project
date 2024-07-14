/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Product from "../components/Product";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [banners, setBanners] = useState([]);
  const [collections, setCollections] = useState([]);
  const [services, setServices] = useState([]);
  const [idCollection,setIdCollection]= useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "slides/home-banner")
      .then((res) => res.json())
      .then((res) => {
        setBanners(res);
      });
    fetch(process.env.REACT_APP_API_URL + "highlight-service-collections")
      .then((res) => res.json())
      .then((res) => {
        setCollections(res);
      });
      fetch(process.env.REACT_APP_API_URL + "services/home")
      .then((res) => res.json())
      .then((res) => {
        setServices(res);
      });
  }, []);
  useEffect(() => {
    if (limit == 4) {
      fetch(process.env.REACT_APP_API_URL + "products")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.data);
          setTotal(res.total);
        });
    }else{
      fetch(process.env.REACT_APP_API_URL + "products?limit=" + limit)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
    }

  }, [limit]);
  const changeLimit = () => {
    if (limit == 0) {
      setLimit(8);
    } else {
      setLimit(limit + 4);
    }
  };
  return (
    <>
      <Header />
      <div className="page-content">
        <Slider />
        <div className="container">
          <div className="row mb-4 mt-4">
            {products.length > 0 &&
              products.map((product, index) => (
                <div className="col-md-3 mb-3">
                  <Product
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    slug={product.slug}
                    discount={product.discount}
                  />
                </div>
              ))}
          </div>
          <div className="row mb-4 text-center">
            <div className="col-md">
              {limit < total && (
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => changeLimit()}
                >
                  Xem thêm
                </button>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md mb-2">
              <img
                className="w-100"
                src={
                  process.env.REACT_APP_IMG_URL +
                  "slides/" +
                  banners[0]?.desktop
                }
                alt=""
              />
            </div>
          </div>
          <div className="row mb-2 mt-2">
            <h3 className="text-center">Dịch vụ </h3>
            <ul className="list-inline text-center" style={{fontSize:'20px'}}>
            <li style={{cursor:'pointer'}} className="list-inline-item ps-4">Tát cả</li>
              {collections &&
                collections.map((collection, index) => (
                  <li style={{cursor:'pointer'}} className="list-inline-item ps-4">{collection.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
