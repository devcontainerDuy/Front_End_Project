import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Helmet } from "react-helmet";
import Post from "../components/Post";
function Blogs() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);
	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL + "posts?page=" + page)
			.then((res) => res.json())
			.then((res) => {
				setPosts(res.data);
				setLastPage(res.last_page);
			});
	}, [page]);
	return (
		<>
			<Header />
			<Helmet>
				<title>Tin tức</title>
				<meta name="description" content="Tin tức" />
			</Helmet>
			<div className="page-content">
				<div className="pt-4 container pb-4">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb mb-0">
							<li className="breadcrumb-item">
								<a href="/">Home</a>
							</li>
							<li className="breadcrumb-item active">Tin tức</li>
						</ol>
					</nav>
					<div class="card shadow mt-4 mb-4 pb-3">
						<div class="card-body">
							<Swiper
								slidesPerView={1}
								spaceBetween={10}
								pagination={{
									clickable: true,
								}}
								breakpoints={{
									640: {
										slidesPerView: 1,
										spaceBetween: 20,
									},
									768: {
										slidesPerView: 2,
										spaceBetween: 40,
									},
									1024: {
										slidesPerView: 3,
										spaceBetween: 50,
									},
								}}
								loop={true}
								className="mySwiper">
								{posts.length > 0 &&
									posts.map((post, index) => (
										<SwiperSlide key={index}>
											<Post title={post.title} slug={post.slug} image={post.image} created_at={post.created_at} />
										</SwiperSlide>
									))}
							</Swiper>
							<div className="row">
								<>
									<hr className="my-4" />
									<div className="service-pagination">
										<nav>
											<ul className="pagination justify-content-center">
												<li className={page === 1 ? "page-item disabled" : "page-item"}>
													<button className="page-link" onClick={() => setPage(page - 1)}>
														Previous
													</button>
												</li>
												{page === 1 && (
													<>
														<li className="page-item active">
															<button className="page-link">1</button>
														</li>
														<li className="page-item">
															<button className="page-link" onClick={() => setPage(2)}>
																2
															</button>
														</li>
														<li className="page-item">
															<button className="page-link" onClick={() => setPage(3)}>
																3
															</button>
														</li>
													</>
												)}
												{page !== 1 && (
													<>
														<li className="page-item">
															<button className="page-link" onClick={() => setPage(page - 1)}>
																{page - 1}
															</button>
														</li>
														<li className={"page-item disabled" + page ? "active" : ""}>
															<button className="page-link">{page}</button>
														</li>
														{page + 1 <= lastPage && (
															<li className="page-item">
																<button className="page-link" onClick={() => setPage(page + 1)}>
																	{page + 1}
																</button>
															</li>
														)}
													</>
												)}
												<li className={page !== lastPage ? "page-item" : "disabled page-item"}>
													<button className="page-link" onClick={() => setPage(page + 1)} disabled={page === lastPage}>
														Next
													</button>
												</li>
											</ul>
										</nav>
									</div>
								</>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Blogs;
