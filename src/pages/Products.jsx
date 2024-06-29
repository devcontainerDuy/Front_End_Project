/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBrands } from "../redux/BrandSlice";
import { getCollection } from "../redux/CollectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "@mui/icons-material";
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
        (product) => Number(product.price) >= min
      );
      setFilterProducts(sortedProducts);
    } else if (min == 0 && max != 0) {
      var sortedProducts = products.filter(
        (product) => Number(product.price) <= max
      );
      setFilterProducts(sortedProducts);
    } else if (min != 0 && max != 0) {
      var sortedProducts = products.filter(
        (product) =>
          Number(product.price) >= min && Number(product.price) <= max
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
      <div className="page-content">
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
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {filterProducts.length > 0 &&
                      filterProducts.slice(0, 3).map((item, index) => (
                        <div className="col" key={index}>
                          <a
                            style={{ textDecoration: "none" }}
                            href={"/" + item.slug}
                          >
                            <div className="card border shadow-none">
                              <div className="position-relative overflow-hidden">
                                <img
                                  src={
                                    process.env.REACT_APP_IMG_URL +
                                    "products/" +
                                    item.image
                                  }
                                  className="card-img-top"
                                  alt="..."
                                />
                              </div>
                              <div className="card-body border-top">
                                <h5 className="mb-0 fw-bold product-short-title">
                                  {item.name}
                                </h5>
                                <div className="product-price d-flex align-items-center gap-2 mt-2">
                                  <div className="h6 fw-bold">
                                    {" "}
                                    {Intl.NumberFormat("en-US").format(
                                      Number(item.price)
                                    )}
                                  </div>
                                  <div className="h6 fw-light text-muted text-decoration-line-through">
                                    {Intl.NumberFormat("en-US").format(
                                      Number(item.discount)
                                    )}
                                  </div>
                                  <div className="h6 fw-bold text-danger">
                                    (30% off)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                  {/* Second row */}
                  <div className="row g-4 mt-4 justify-content-center">
                    {filterProducts.length > 3 && (
                      <div className="col-md-6 col-lg-4">
                        <a
                          style={{ textDecoration: "none" }}
                          href={"/" + filterProducts[3].slug}
                        >
                          <div className="card border shadow-none">
                            <div className="position-relative overflow-hidden">
                              <div className="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0"></div>

                              <img
                                src={
                                  process.env.REACT_APP_IMG_URL +
                                  "products/" +
                                  filterProducts[3].image
                                }
                                className="card-img-top"
                                alt="..."
                              />
                            </div>
                            <div className="card-body border-top">
                              <h5 className="mb-0 fw-bold product-short-title">
                                {filterProducts[3].name}
                              </h5>
                              <div className="product-price d-flex align-items-center gap-2 mt-2">
                                <div className="h6 fw-bold">
                                  {" "}
                                  {Intl.NumberFormat("en-US").format(
                                    Number(filterProducts[3].discount)
                                  )}
                                </div>
                                <div className="h6 fw-light text-muted text-decoration-line-through">
                                  {Intl.NumberFormat("en-US").format(
                                    Number(filterProducts[3].price)
                                  )}
                                </div>
                                <div className="h6 fw-bold text-danger">
                                  (30% off)
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                  {/*end row*/}
                </div>

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
                        <li className={page != lastPage?"page-item":"disabled page-item"}>
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
