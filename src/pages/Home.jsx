/* eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [banners, setBanners] = useState([]);
  const [collections, setCollections] = useState([]);
  const [services, setServices] = useState([]);
  const [idCollection, setIdCollection] = useState(null);
  const [filterServices, setFilterServices] = useState(services);
  const [post, setPost] = useState({});
  const [voucher,setVoucher]= useState({});
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    
    fetch(process.env.REACT_APP_API_URL + "slides/home-banner")
      .then((res) => res.json())
      .then((res) => {
        setBanners(res);
      });

     setTimeout(() => {
      fetch(process.env.REACT_APP_API_URL + "campains")
      .then((res) => res.json())
      .then((res) => {
        setVoucher(res);
        setOpen(true)
      });
     }, 4000);

    fetch(process.env.REACT_APP_API_URL + "highlight-service-collections")
      .then((res) => res.json())
      .then((res) => {
        setCollections(res);
      });
    fetch(process.env.REACT_APP_API_URL + "services/home")
      .then((res) => res.json())
      .then((res) => {
        setServices(res.data);
        setFilterServices(res.data);
      });
    fetch(process.env.REACT_APP_API_URL + "highlight-posts")
      .then((res) => res.json())
      .then((res) => {
        setPost(res);
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
    } else {
      fetch(process.env.REACT_APP_API_URL + "products?limit=" + limit)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res);
        });
    }
  }, [limit]);
  useEffect(() => {
    if (idCollection != null) {
      var result = services;
      result = result.filter((item) => item.id_collection == idCollection);
      setFilterServices(result);
    } else {
      setFilterServices(services);
    }
  }, [idCollection]);
  const changeLimit = () => {
    if (limit == 0) {
      setLimit(8);
    } else {
      setLimit(limit + 4);
    }
  };
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    {products.length>0 && post && (
      <>
            <Header />
      <div className="page-content">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="row">
  <div className="col-md-4">
    <img src={process.env.REACT_APP_IMG_URL + voucher.image} alt="" />
  </div>
  <div className="col-md d-flex flex-column justify-content-center">
    <h4>{voucher.title}</h4>
    <h5>{voucher.summary}</h5>
    <a href={voucher.link} className="btn btn-sm btn-outline-primary">Xem thêm</a>
  </div>
</div>
          </Typography>
        
        </Box>
      </Modal>
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
            <h3 className="text-center">Dịch vụ</h3>
            <ul
              className="list-inline text-center"
              style={{ fontSize: "20px" }}
            >
              <li
                style={{ cursor: "pointer" }}
                onClick={(e) => setIdCollection(null)}
                className="list-inline-item ps-4"
              >
                Tất cả
              </li>
              {collections &&
                collections.map((collection, index) => (
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setIdCollection(collection.id)}
                    className="list-inline-item ps-4"
                  >
                    {collection.name}
                  </li>
                ))}
            </ul>
            <div className="row text-center">
              {filterServices.map((service, index) => (
                <div className="col-md-4 mb-3">
                  <div class="card shadow border-0">
                    <div class="card-header text-center">
                      <Link to={"/dich-vu/" + service.slug}>
                        {" "}
                        <img
                          className="w-100"
                          src={
                            process.env.REACT_APP_IMG_URL +
                            "services/" +
                            service.image
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                    <div class="card-body border border-1">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/dich-vu/" + service.slug}
                      >
                        {" "}
                        <h4 class="card-title text-center">{service.name}</h4>
                      </Link>
                      <h4 class="card-title text-center">
                        <span className="text-danger">
                          {Intl.NumberFormat("en-US").format(service.price)}
                        </span>{" "}
                        <span className="text-decoration-line-through">
                          {Intl.NumberFormat("en-US").format(
                            service.compare_price
                          )}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md mb-2">
              <img
                className="w-100"
                src={
                  process.env.REACT_APP_IMG_URL +
                  "slides/" +
                  banners[1]?.desktop
                }
                alt=""
              />
            </div>
          </div>
          <div className="row mt-2 mb-3">
            <div className="col-md">
              <div class="card shadow border-0">
                <div className="card-body">
                  <div className="row text-end">
                    <div className="col-md">
                      <span class="badge bg-danger">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <a href={"/tin-tuc/" + post.slug}>
                        {" "}
                        <img
                          src={
                            process.env.REACT_APP_IMG_URL +
                            "posts/" +
                            post.image
                          }
                          className="w-100 border-rounded"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md d-flex align-items-center">
                      <div>
                        <a href={"/tin-tuc/" + post.slug}>
                          <h4>{post.title}</h4>
                        </a>
                        <p>{post.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md text-center">
                      <a href="/tin-tuc" className="btn btn-outline-primary">
                        Xem thêm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
    )}

    </>
  );
}

export default Home;
