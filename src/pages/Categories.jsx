/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { getBrands } from "../redux/BrandSlice";
import { getCollection } from "../redux/CollectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "@mui/icons-material";
import Product from "../components/Product";
import { Helmet } from 'react-helmet';

function Categories() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { collections, loading1 } = useSelector((state) => state.collections);
  const { brands, loading } = useSelector((state) => state.brands);
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const setProductFilter = () => {
    if (min != 0 && max == 0) {
      var sortedProducts = products.products.filter(
        (product) => Number(product.discount) >= min
      );
      setFilterProducts(sortedProducts);
    } else if (min == 0 && max != 0) {
      var sortedProducts = products.products.filter(
        (product) => Number(product.discount) <= max
      );
      setFilterProducts(sortedProducts);
    } else if (min != 0 && max != 0) {
      var sortedProducts = products.products.filter(
        (product) =>
          Number(product.discount) >= min && Number(product.discount) <= max
      );
      setFilterProducts(sortedProducts);
    } else {
      setFilterProducts(products.products);
    }
  };
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "categories/" + id)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res[0]);
        const activeProducts = res[0].products.filter(product => product.status === 1);
        setFilterProducts(activeProducts);
      });
    dispatch(getCollection());
    dispatch(getBrands());
  }, [id]);
  return (
    <>
      <Helmet>
        <title>{products.name}</title>
        <meta name="description" content={products.name} />
      </Helmet>
      <Header />
      <div className="page-content">
        <div className="row mt-3 text-center w-100">
          <div className="py-4 border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">{products.name}</li>
                </ol>
              </nav>
              <button
                onClick={(e) => {
                  filter ? setFilter(false) : setFilter(true);
                }}
                className="btn btn-sm btn-outline-primary"
              >
                <i class="bi bi-funnel"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-12">
              {filter && (
                <div className="row mt-2">
                  <div className="col-md-5">
                    <div className="row ">
                      <div className="Price">
                        <h6 className="p-1 fw-bold bg-light">Lọc sản phẩm</h6>
                        <div className="Price-wrapper p-1">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              placeholder="Giá thấp nhất"
                              onChange={(e) => setMin(e.target.value)}
                            />
                            <span className="input-group-text bg-section-1 border-0">
                              -
                            </span>
                            <input
                              type="text"
                              className="form-control rounded-0"
                              placeholder="Giá cao nhất"
                              onChange={(e) => setMax(e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-dark rounded-0 ms-2"
                              onClick={(e) => setProductFilter()}
                            >
                              <i className="bi bi-chevron-right" />

                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="shop-right-sidebar">
                <div className="product-grid mt-4">
                  <div className="row mb-3">
                    {filterProducts.length > 0
                      ? filterProducts.map((product, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          <Product
                            name={product.name}
                            image={product.gallery[0].image}
                            price={product.price}
                            slug={product.slug}
                            discount={product.discount}
                          />
                        </div>
                      ))
                      : products.length > 0 && products.map((product, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          <Product
                            name={product.name}
                            image={product.gallery[0]}
                            price={product.price}
                            slug={product.slug}
                            discount={product.discount}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <hr className="my-4" />
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Categories;
