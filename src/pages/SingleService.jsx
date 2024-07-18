import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function SingleService() {
	const { id } = useParams();
	const [service, setService] = useState({});
	const [book, setBook] = useState(false);

	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL + "services/service/" + id)
			.then((res) => res.json())
			.then((res) => {
				setService(res[0]);
			});
	}, [id]);

	const notyf = new Notyf({
		duration: 3000,
		position: {
			x: "right",
			y: "top",
		},
		types: [
			{
				type: "warning",
				background: "orange",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "warning",
				},
			},
			{
				type: "error",
				background: "indianred",
				duration: 2000,
				dismissible: true,
			},
			{
				type: "success",
				background: "green",
				color: "white",
				duration: 2000,
				dismissible: true,
			},
		],
	});

	// Create booking
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");
	const [checkbox, setCheckbox] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		let token = localStorage.getItem("token");
		let idusr = localStorage.getItem("id");


			if (!name || !phone || !email || !time || !date) {
				notyf.error("Vui lòng điền đầy đủ thông tin đặt lịch");
			} else {
				if (checkbox === true) {
					axios
						.post(process.env.REACT_APP_API_URL + "bookings", {
							email: email,
							name: name,
							time: date + " " + time + ":00",
							id_service: Number(service.id),
							phone: phone,
						})
						.then((res) => {
							if (res.data.check === true) {
								notyf.success("Đặt lịch thành công");
								setBook(false);
							} else {
								notyf.error(res.data.msg);
							}
						});
				} else {
					notyf.error("Vui lòng phải đồng ý chính sách");
				}
		}
	};

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
									<span className="text-decoration-line-through">{Intl.NumberFormat("en-US").format(Number(service.compare_price))}</span>{" "}
									<span className="text-danger"> {Intl.NumberFormat("en-US").format(Number(service.price))}</span>
									<br />{" "}
									{!book && (
										<button className="btn btn-primary" onClick={() => setBook(true)}>
											Đặt lịch
										</button>
									)}
									{book && (
										<button className="btn btn-secondary" onClick={() => setBook(false)}>
											Hủy đặt
										</button>
									)}
								</div>
							</div>
							<div className="row">
								{!book && (
									<div className="col-md">
										<div dangerouslySetInnerHTML={{ __html: service.content }} />
									</div>
								)}
								{book && (
									<>
										<div className="col-md-8">
											<div dangerouslySetInnerHTML={{ __html: service.content }} />
										</div>
										<div className="col-md">
											<form onSubmit={handleSubmit}>
												<h2>
													<strong>Đặt lịch</strong>
												</h2>
												<div className="mb-3">
													<label htmlFor="exampleInput1" className="form-label">
														<strong>Tên người đặt lịch</strong>
													</label>
													<input type="text" className="form-control" id="exampleInput1" onChange={(e) => setName(e.target.value)} placeholder="Nhập tên của bạn..." />
												</div>
												<div className="mb-3">
													<label htmlFor="exampleInput2" className="form-label">
														<strong>Số điện thoại người đặt</strong>
													</label>
													<input type="number" className="form-control" id="exampleInput2" onChange={(e) => setPhone(e.target.value)} placeholder="Nhập vào số điện thoại của bạn..." />
												</div>
												<div className="mb-3">
													<label htmlFor="exampleInput3" className="form-label">
														<strong>Địa chỉ email người đặt</strong>
													</label>
													<input type="email" className="form-control" id="exampleInput3" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập địa chỉs email..." />
												</div>
												<div className="mb-3">
													<label htmlFor="exampleInput4" className="form-label">
														<strong>Thời gian đến</strong>
													</label>
													<div className="d-flex">
														<input type="time" className="form-control me-1" onChange={(e) => setTime(e.target.value)} id="exampleInput4" />
														<input type="date" className="form-control ms-1" onChange={(e) => setDate(e.target.value)} id="exampleInput4" />
													</div>
												</div>
												<div className="mb-3 form-check">
<input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => setCheckbox(e.target.checked)} />
													<label className="form-check-label text-secondary" htmlFor="exampleCheck1">
														<small>
															Tôi đã đọc kĩ <a href="#">điều khoản</a> và <a href="#">chính sách</a>
														</small>
													</label>
												</div>
												<button type="submit" className="btn btn-dark w-100">
													Đặt lịch hẹn ngay !
												</button>
											</form>
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

export default SingleService;