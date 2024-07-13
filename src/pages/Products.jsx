/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBrands } from "../redux/BrandSlice";
import { getCollection } from "../redux/CollectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "@mui/icons-material";
import Product from "../components/Product";
function Products() {
  const dispatch = useDispatch();
  const { collections, loading1 } = useSelector((state) => state.collections);
  const { brands, loading } = useSelector((state) => state.brands);
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const setProductFilter = () => {
    if (min != 0 && max == 0) {
      var sortedProducts = products.filter(
        (product) => Number(product.discount) >= min
      );
      setFilterProducts(sortedProducts);
    } else if (min == 0 && max != 0) {
      var sortedProducts = products.filter(
        (product) => Number(product.discount) <= max
      );
      setFilterProducts(sortedProducts);
    } else if (min != 0 && max != 0) {
      var sortedProducts = products.filter(
        (product) =>
          Number(product.discount) >= min && Number(product.discount) <= max
      );
      setFilterProducts(sortedProducts);
    } else {
      setFilterProducts(products);
    }
  };
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "products?page=" + page)
      .then((res) => res.json())
      .then((res) => {
        setLastPage(res.last_page);
        setProducts(res.data);
        setFilterProducts(res.data);
      });
    dispatch(getCollection());
    dispatch(getBrands());
  }, [page]);
  return (
    <>
      <Header />
      <div className="page-content mb-2">
        <div className="row mt-3 text-center w-100">
          <div className="py-4 border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">Sản phẩm</li>
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
                              image={product.image}
                              price={product.price}
                              slug={product.slug}
                              discount={product.discount}
                            />
                          </div>
                        ))
                      : products.map((product, index) => (
                          <div className="col-md-3 mb-3" key={index}>
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
                {min==0 && max==0 && (
                  <>
                                  <hr className="my-4" />
                <div className="product-pagination">
                  <nav>
                    <ul className="pagination justify-content-center">
                      <li
                        className={
                          page == 1 ? "page-item disabled" : "page-item "
                        }
                      >
                        <a
                          onClick={(e) => setPage(page - 1)}
                          className="page-link"
                        >
                          Previous
                        </a>
                      </li>
                      {page == 1 && (
                        <>
                          <li className="page-item active">
                            <a className="page-link" href="javascript:;">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={(e) => setPage(2)}
                              href="javascript:;"
                            >
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={(e) => setPage(2)}
                              href="javascript:;"
                            >
                              3
                            </a>
                          </li>
                        </>
                      )}
                      {page != 1 && (
                        <>
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={(e) => setPage(page - 1)}
                              href="javascript:;"
                            >
                              {page - 1}
                            </a>
                          </li>
                          <li className="page-item disabled active">
                            <a className="page-link" href="javascript:;">
                              {page}
                            </a>
                          </li>
                          {page + 1 <= lastPage && (
                            <li className={"page-item"}>
                              <a
                                className="page-link"
                                onClick={(e) => setPage(page + 1)}
                                href="javascript:;"
                              >
                                {page + 1}
                              </a>
                            </li>
                          )}
                        </>
                      )}
                      <li
                        className={
                          page != lastPage ? "page-item" : "disabled page-item"
                        }
                      >
                        <a
                          className="page-link"
                          onClick={(e) => setPage(page + 1)}
                          href="javascript:;"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                  </>
                )}

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

export default Products;
