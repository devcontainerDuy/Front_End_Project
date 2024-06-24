import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Product from "../components/Product";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
        console.log(products);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="page-content">
        <Slider />
        <div className="container">
          <div className="row mb-4 mt-4">
            {products.length > 0 &&
              products.map((product, index) => (
                <div className="col-md-3">
                  <Product name={product.name} image={product.image} price={product.price} discount={product.discount} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
