import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filter, setFilter] = useState("default");

  const orders = [
    {
      id: "#192611",
      productName: "Sửa rửa mặt simple",
      payment: "COD",
      status: "Thành công",
      total: "550.000 VNĐ",
      items: [
        { name: "Sửa rửa mặt simple", quantity: 1, price: "250.000 VNĐ" },
        { name: "Kem chống nắng", quantity: 2, price: "300.000 VNĐ" }
      ],
      customer: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        date: "2024-09-18"
      }
    },
    {
      id: "#192612",
      productName: "Kem chống nắng",
      payment: "COD",
      status: "Mới",
      total: "300.000 VNĐ",
      items: [
        { name: "Kem chống nắng", quantity: 1, price: "300.000 VNĐ" }
      ],
      customer: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        date: "2024-09-19"
      }
    },
    {
      id: "#192613",
      productName: "Dưỡng ẩm",
      payment: "COD",
      status: "Thất bại",
      total: "200.000 VNĐ",
      items: [
        { name: "Dưỡng ẩm", quantity: 1, price: "200.000 VNĐ" }
      ],
      customer: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        date: "2024-09-20"
      }
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || order.status.toLowerCase() === activeTab;

    const orderDate = new Date(order.customer.date);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    const matchesDate =
      (!dateFrom || orderDate >= fromDate) && (!dateTo || orderDate <= toDate);

    return matchesSearch && matchesTab && matchesDate;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    const totalA = parseInt(a.total.replace(".", "").replace(" VNĐ", ""));
    const totalB = parseInt(b.total.replace(".", "").replace(" VNĐ", ""));
    if (filter === "high") return totalB - totalA; // Giá cao nhất
    if (filter === "low") return totalA - totalB; // Giá thấp nhất
    return 0; // Mặc định
  });

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <div className="container my-5">
        <h3 className="mt-4 fw-bold">Lịch sử hóa đơn</h3>
        
        <ul className="nav nav-tabs mt-2 fw-bold">
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === "all" ? "bg-primary text-white" : "text-muted"}`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả hóa đơn ({orders.length})
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === "mới" ? "bg-primary text-white" : "text-muted"}`}
              onClick={() => setActiveTab("mới")}
            >
              Mới ({orders.filter(o => o.status.toLowerCase() === "mới").length})
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === "thành công" ? "bg-primary text-white" : "text-muted"}`}
              onClick={() => setActiveTab("thành công")}
            >
              Thành công ({orders.filter(o => o.status.toLowerCase() === "thành công").length})
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === "thất bại" ? "bg-primary text-white" : "text-muted"}`}
              onClick={() => setActiveTab("thất bại")}
            >
              Thất bại ({orders.filter(o => o.status.toLowerCase() === "thất bại").length})
            </a>
          </li>
        </ul>

        <div className="row mt-3">
          <div className="col-md-8">
            <div className="input-group w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm hóa đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-end">
            <div className="me-2">
              <span>Từ:</span>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                value={dateFrom} 
                onChange={(e) => setDateFrom(e.target.value)} 
              />
            </div>
            <div className="ms-2 me-2">
              <span>Đến:</span>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                value={dateTo} 
                onChange={(e) => setDateTo(e.target.value)} 
              />
            </div>
            <div className="ms-2">
              <span>Lọc:</span>
              <select className="form-control form-control-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="default">Mặc định</option>
                <option value="high">Giá cao nhất</option>
                <option value="low">Giá thấp nhất</option>
              </select>
            </div>
          </div>
        </div>

        <table className="table table-striped mt-3">
          <thead>
            <tr className="fs-5">
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Thành tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr className="fw-bold" key={order.id}>
                <td className="text-primary">{order.id}</td>
                <td className="d-flex">
                  <img className="me-3" src="https://via.placeholder.com/35x35" alt="Sản phẩm" />
                  <p>{order.productName}</p>
                </td>
                <td className="text-success">{order.payment}</td>
                <td className={order.status === "Thành công" ? "text-success" : order.status === "Mới" ? "text-warning" : "text-danger"}>
                  {order.status}
                </td>
                <td>{order.total}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => handleOpen(order)}>
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Chi tiết hóa đơn
            </Typography>
            {selectedOrder && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1">
                    <strong>ID:</strong> {selectedOrder.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Trạng thái:</strong> {selectedOrder.status}
                  </Typography>
                </div>
                <Typography variant="body1">
                  <strong>Tên khách hàng:</strong> {selectedOrder.customer.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Số điện thoại:</strong> {selectedOrder.customer.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Địa chỉ:</strong> {selectedOrder.customer.address}
                </Typography>
                <Typography variant="body1">
                  <strong>Ngày tạo:</strong> {selectedOrder.customer.date}
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
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Tổng tiền hóa đơn:</strong> {selectedOrder.total}
                </Typography>
              </div>
            )}
            <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
              Đóng
            </Button>
          </Box>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
