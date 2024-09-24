/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Col, Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";
import axios from "axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Orders() {
	const [orders, setOrders] = useState([]);
	const [idBill, setIdBill] = useState(0);
	const [single, setSingle] = useState(null);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [filteredOrders, setFilteredOrders] = useState(orders);
	const [sortOrder, setSortOrder] = useState("default");
	const [startDate, setStartDate] = useState(""); // Ngày bắt đầu
	const [endDate, setEndDate] = useState(""); // Ngày kết thúc

	const handleOpen = (orderDetail) => {
		setOpen(true);
		setIdBill(orderDetail);
	};

	const handleClose = () => setOpen(false);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_URL + "customers/bills?page=" + page, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setOrders(res.data.data);
				setLastPage(res.data.last_page);
			});
	}, [page]);

	useEffect(() => {
		const filterByDate = () => {
			if (!startDate && !endDate) {
				setFilteredOrders(orders);
			} else {
				const filtered = orders.filter((order) => {
					const orderDate = new Date(order.created_at);
					if (startDate && !endDate) {
						return new Date(startDate) <= orderDate;
					}
					if (!startDate && endDate) {
						return orderDate <= new Date(endDate);
					}
					return new Date(startDate) <= orderDate && orderDate <= new Date(endDate);
				});
				setFilteredOrders(filtered);
			}
		};

		filterByDate();
	}, [orders, startDate, endDate]);

	useEffect(() => {
		if (searchKeyword === "") {
			setFilteredOrders(orders);
		} else {
			setFilteredOrders(
				orders.filter((order) => {
					return order.details.some((detail) => detail.product.name.toLowerCase().includes(searchKeyword.toLowerCase()));
				}),
			);
		}
	}, [orders, searchKeyword]);

	useEffect(() => {
		if (idBill !== 0) {
			orders.forEach((el) => {
				if (el.id == idBill) {
					setSingle(el);
				}
			});
		}
	}, [idBill]);

	const handleSortOrder = (sortOrder) => {
		setSortOrder(sortOrder);
		if (sortOrder === "asc") {
			orders.sort((a, b) => a.total - b.total);
		} else if (sortOrder === "desc") {
			orders.sort((a, b) => b.total - a.total);
		} else if (sortOrder === "default") {
			orders.sort((a, b) => a.id - b.id);
		}
	};

	return (
		<>
			<Header />
			<div className="container my-5">
				<h3 className="mt-4 fw-bold">Lịch sử hóa đơn</h3>

				<Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
					<Tab eventKey="home" title="Hóa đơn">
						<Row className="mt-3">
							<Col md="9"></Col>
							<Col xs="12" md="3">
								<div className="d-flex justify-content-end mb-3">
									<Form.Control type="date" className="rounded-pill" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
									<div className="mx-3 my-2">
										<span>To</span>
									</div>
									<Form.Control type="date" className="rounded-pill" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
								</div>
							</Col>
							<Col md="6">
								<InputGroup className="w-50 rounded-pill">
									<InputGroup.Text role="button">
										<i className="bi bi-search" />
									</InputGroup.Text>
									<Form.Control type="text" placeholder="Tìm hóa đơn..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
								</InputGroup>
							</Col>
							<Col md="6" className="d-flex align-items-center justify-content-end column-gap-2">
								<Form.Group className="mb-3" controlId="formGridState">
									<Form.Select defaultValue="default" className="rounded-pill" onChange={(e) => handleSortOrder(e.target.value)} value={sortOrder}>
										<option value="default">Mặc định</option>
										<option value="asc">Giá thấp nhất</option>
										<option value="desc">Giá cao nhất</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>

						<table className="table table-striped mt-3">
							<thead>
								<tr className="fs-5">
									<th>ID</th>
									<th>Sản phẩm</th>
									<th>Số lượng</th>
									<th>Trạng thái</th>
									<th>Thành tiền</th>
									<th>Chi tiết</th>
								</tr>
							</thead>
							<tbody>
								{filteredOrders.length > 0 ? (
									filteredOrders.map((order, index) => (
										<tr key={index + 1}>
											<td>HD00{order.id}</td>
											<td> {order.details[0].product.name}</td>
											<td>{order.details[0].quantity}</td>
											<td>
												{order.status == 0 ? "Đặt hàng" : ""}
												{order.status == 1 ? "Thành công" : ""}
												{order.status == 2 ? "Thất bại" : ""}
											</td>
											<td>{Intl.NumberFormat("en-US").format(order.total)}</td>
											<td>
												<Button variant="primary" onClick={() => handleOpen(order.id)}>
													Chi tiết
												</Button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="6" className="text-center">
											Không có hóa đơn
										</td>
									</tr>
								)}
							</tbody>
							<tfoot>
								<div className="row">
									<div className="col-md-6">
										{page > 1 && (
											<button className="btn btn-outline-secondary mt-2" onClick={() => setPage(page - 1)}>
												&lt;&lt;
											</button>
										)}
									</div>

									<div className="col-md-6">
										{page != null && page < lastPage && (
											<button className="btn btn-outline-primary mt-2" onClick={() => setPage(page + 1)}>
												&gt;&gt;
											</button>
										)}
									</div>
								</div>
							</tfoot>
						</table>
					</Tab>
					<Tab eventKey="profile" title="Profile">
						<div>Profile content here...</div>
					</Tab>
				</Tabs>
				{single ? (
					<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Chi tiết hóa đơn
							</Typography>

							<div>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="body1">
										<strong>ID:</strong> HD00{single.id}
									</Typography>
									<Typography variant="body1">
										<strong>Trạng thái:</strong> {single.status == 0 ? "Đặt hàng" : ""} {single.status == 1 ? "Thành công" : ""} {single.status == 2 ? "Thất bại" : ""}
									</Typography>
								</div>
								<Typography variant="body1">
									<strong>Tên khách hàng:</strong> {single.name}
								</Typography>
								<Typography variant="body1">
									<strong>Số điện thoại:</strong> {single.phone}
								</Typography>
								<Typography variant="body1">
									<strong>Địa chỉ:</strong> {single.address}
								</Typography>
								<Typography variant="body1">
									<strong>Ngày tạo:</strong> {new Date(single.created_at).toLocaleString()}
								</Typography>
								<TableContainer component={Paper} sx={{ mt: 2 }}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Tên sản phẩm</TableCell>
												<TableCell>Số lượng</TableCell>
												<TableCell>Thành tiền</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{single.details.map((detail, index) => (
												<TableRow key={index}>
													<TableCell>{detail.product.name}</TableCell>
													<TableCell>{detail.quantity}</TableCell>
													<TableCell>
														<p>{Intl.NumberFormat("en-US").format(detail.product.price)}</p>
														<p className="text-danger">- {(((detail.product.price - detail.product.discount) / detail.product.price) * 100).toFixed(0)}%</p>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
								<Typography variant="body1" sx={{ mt: 2 }}>
									<strong>Tổng tiền hóa đơn:</strong> {Intl.NumberFormat("en-US").format(single.total)} VND
								</Typography>
							</div>
							<Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
								Đóng
							</Button>
						</Box>
					</Modal>
				) : (
					<></>
				)}
			</div>
			<Footer />
		</>
	);
}

export default Orders;
