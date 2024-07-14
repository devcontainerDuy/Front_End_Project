import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from "react-router-dom";
function SingleService() {
    const { id } = useParams();
    const [service, setService] = useState({});
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'services/service/' + id).then((res) => res.json())
            .then((res) => {
                setService(res.data[0]);
            })
    }, [id])
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
                            <div
                                dangerouslySetInnerHTML={{ __html: service.content }}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default SingleService