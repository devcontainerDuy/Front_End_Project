/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Product from "../components/Product";

function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  useEffect(() => {
    if(limit==4){
      fetch(process.env.REACT_APP_API_URL + "products" )
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      });
    }
    fetch(process.env.REACT_APP_API_URL + "products?limit=" + limit)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
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
          <div className="row text-center">
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
        </div>
      </div>
    </>
  );
}

export default Home;
