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
function Search() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { collections, loading1 } = useSelector((state) => state.collections);
  const { brands, loading } = useSelector((state) => state.brands);
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const setProductFilter = ()=>{
    if (min != 0 && max == 0) {
        var sortedProducts = products.filter(product => Number(product.price) >= min);
        setFilterProducts(sortedProducts);
    } else if (min == 0 && max != 0) {
        var sortedProducts = products.filter(product => Number(product.price) <= max);
        setFilterProducts(sortedProducts);
    } else if (min != 0 && max != 0) {
        var sortedProducts = products.filter(product => Number(product.price) >= min && Number(product.price) <= max);
        setFilterProducts(sortedProducts);
    } else {
        setFilterProducts(products)
    }
  }
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "products/search/"+id )
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setFilterProducts(res.products);
      });
    dispatch(getCollection());
    dispatch(getBrands());
  }, [id]);
  return (
    <>
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
                  <li className="breadcrumb-item">Tìm kiếm</li>
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
                              onChange={(e)=>setMin(e.target.value)}
                            />
                            <span className="input-group-text bg-section-1 border-0">
                              -
                            </span>
                            <input
                              type="text"
                              className="form-control rounded-0"
                              placeholder="Giá cao nhất"
                              onChange={(e)=>setMax(e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-dark rounded-0 ms-2"
                                onClick={(e)=>setProductFilter()}
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
                  <div className="row">
                    {filterProducts.length > 0 &&
                      filterProducts.map((product, index) => (
                       <div className="col-md-3">
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

export default Search;
