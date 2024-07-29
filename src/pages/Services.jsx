/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBrands } from "../redux/BrandSlice";
import { getCollection } from "../redux/CollectionSlice";
import { useDispatch, useSelector } from "react-redux";
import Service from "../components/Service";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
function Services() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { collections, loading1 } = useSelector((state) => state.collections);
  const { brands, loading } = useSelector((state) => state.brands);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  const setServiceFilter = () => {
    if (min !== 0 && max === 0) {
      var sortedServices = services.filter(
        (service) => Number(service.compare_price) >= min
      );
      setFilterServices(sortedServices);
    } else if (min === 0 && max !== 0) {
      sortedServices = services.filter(
        (service) => Number(service.compare_price) <= max
      );
      setFilterServices(sortedServices);
    } else if (min !== 0 && max !== 0) {
      sortedServices = services.filter(
        (service) =>
          Number(service.compare_price) >= min &&
          Number(service.compare_price) <= max
      );
      setFilterServices(sortedServices);
    } else setFilterServices(services);
  };

  const [filterServices, setFilterServices] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}services?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setLastPage(res.last_page);
        setServices(res.data);
        setFilterServices(res.data);
      });
    dispatch(getCollection());
    dispatch(getBrands());
  }, [page]);

  return (
    <>
      <Helmet>
          <title>Dịch vụ</title>
          <meta name="description" content='Dịch vụ' />
      </Helmet>
      <Header />
      <div className="page-content mt-3">
        <div className="row mt-3 text-center w-100">
          <div className="py-4 border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">Dịch vụ</li>
                </ol>
              </nav>
              <button
                onClick={(e) => {
                  filter ? setFilter(false) : setFilter(true);
                }}
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-funnel"></i>
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
                    <div className="row">
                      <div className="Price">
                        <h6 className="p-1 fw-bold bg-light">Lọc dịch vụ</h6>
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
                              onClick={setServiceFilter}
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
                    {filterServices && filterServices.length > 0 ? (
                      filterServices.map((service, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          {/* <Link to={`/dich-vu/${service.slug}`}>
                            <img
                              className="w-100"
                              src={`${process.env.REACT_APP_IMG_URL}services/${service.image}`}
                              alt={service.name}
                            />
                          </Link> */}
                         <Link to={`/dich-vu/${service.slug}`}>
                         <Service
                            name={service.name}
                            image={service.image}
                            price={service.price}
                            slug={service.slug}
                            compare_price={service.compare_price}
                          />
                         </Link>
                        </div>
                      ))
                    ) : services && services.length > 0 ? (
                      services.map((service, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          {/* <Link to={`/dich-vu/${service.slug}`}>
                            <img
                              className="w-100"
                              src={`${process.env.REACT_APP_IMG_URL}services/${service.image}`}
                              alt={service.name}
                            />
                          </Link> */}
                         <Link to={`/dich-vu/${service.slug}`}>

                          <Service
                            name={service.name}
                            image={service.image}
                            price={service.price}
                            slug={service.slug}
                            compare_price={service.compare_price}
                          />
                         </Link>

                        </div>
                      ))
                    ) : (
                      <p>Không có dịch vụ nào được tìm thấy.</p>
                    )}
                  </div>
                </div>
                {min === 0 && max === 0 && (
                  <>
                    <hr className="my-4" />
                    <div className="service-pagination">
                      <nav>
                        <ul className="pagination justify-content-center">
                          <li
                            className={
                              page === 1 ? "page-item disabled" : "page-item"
                            }
                          >
                            <button
                              className="page-link"
                              onClick={() => setPage(page - 1)}
                            >
                              Previous
                            </button>
                          </li>
                          {page === 1 && (
                            <>
                              <li className="page-item active">
                                <button className="page-link">1</button>
                              </li>
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() => setPage(2)}
                                >
                                  2
                                </button>
                              </li>
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() => setPage(3)}
                                >
                                  3
                                </button>
                              </li>
                            </>
                          )}
                          {page !== 1 && (
                            <>
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() => setPage(page - 1)}
                                >
                                  {page - 1}
                                </button>
                              </li>
                              <li className="page-item disabled active">
                                <button className="page-link">{page}</button>
                              </li>
                              {page + 1 <= lastPage && (
                                <li className="page-item">
                                  <button
                                    className="page-link"
                                    onClick={() => setPage(page + 1)}
                                  >
                                    {page + 1}
                                  </button>
                                </li>
                              )}
                            </>
                          )}
                          <li
                            className={
                              page !== lastPage
                                ? "page-item"
                                : "disabled page-item"
                            }
                          >
                            <button
                              className="page-link"
                              onClick={() => setPage(page + 1)}
                              disabled={page === lastPage}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Services;
