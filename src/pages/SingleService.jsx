import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
function SingleService() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [book,setBook]= useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "services/service/" + id)
      .then((res) => res.json())
      .then((res) => {
        setService(res[0]);
      });
  }, [id]);
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container pt-4 pb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Dịch vụ
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          <div class="card shadow">
            <div class="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h3 className="text-danger">{service.name}</h3>
                </div>
                <div className="col-md text-end">
                  <span className="text-decoration-line-through">
                    {Intl.NumberFormat("en-US").format(
                      Number(service.compare_price)
                    )}
                  </span>{" "}
                  <span className="text-danger">
                    {" "}
                    {Intl.NumberFormat("en-US").format(Number(service.price))}
                  </span>
                  <br /> <button className="btn btn-primary">Đặt lịch</button>
                </div>
              </div>
                <div className="row">
                {!book &&(
                                    <div className="col-md">
                    <div dangerouslySetInnerHTML={{ __html: service.content }} />

                    </div>
                )}
                {book && (
                    <div className="col-md-6">
                    <div dangerouslySetInnerHTML={{ __html: service.content }} />
                    </div>
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

export default SingleService;
