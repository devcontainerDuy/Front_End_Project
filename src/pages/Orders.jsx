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
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const orders = [
    {
      id: "#192611",
      product: "Sửa rửa mặt simple",
      payment: "COD",
      status: "Thành công",
      total: "550.000 VNĐ",
      items: [
        { name: "Sửa rửa mặt simple", quantity: 1, price: "250.000 VNĐ" },
        { name: "Kem chống nắng", quantity: 2, price: "300.000 VNĐ" },
      ],
      date: "2024-09-18",
    },
    { id: "#192612", product: "Kem chống nắng", payment: "COD", status: "Mới", total: "300.000 VNĐ", items: [{ name: "Kem chống nắng", quantity: 1, price: "300.000 VNĐ" }], date: "2024-09-19" },
    { id: "#192613", product: "Dưỡng ẩm", payment: "COD", status: "Thất bại", total: "200.000 VNĐ", items: [{ name: "Dưỡng ẩm", quantity: 1, price: "200.000 VNĐ" }], date: "2024-09-20" },
  ];

  const filteredOrders = orders.filter((order) => {
    if (currentTab === "all") return true;
    return order.status === (currentTab === "new" ? "Mới" : currentTab === "success" ? "Thành công" : "Thất bại");
  });

  return (
    <>
      <Header />
      <div className="container my-5">
        <h3 className="mt-4 fw-bold">Lịch sử hóa đơn</h3>
        {/* Tabs */}
        <ul className="nav nav-tabs mt-2 fw-bold">
          <li className="nav-item">
            <a className={`nav-link ${currentTab === "all" ? "bg-primary text-white" : "text-muted"}`} onClick={() => setCurrentTab("all")}>
              Tất cả hóa đơn ({orders.length})
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currentTab === "new" ? "bg-primary text-white" : "text-muted"}`} onClick={() => setCurrentTab("new")}>
              Mới ({orders.filter((o) => o.status === "Mới").length})
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currentTab === "success" ? "bg-primary text-white" : "text-muted"}`} onClick={() => setCurrentTab("success")}>
              Thành công ({orders.filter((o) => o.status === "Thành công").length})
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currentTab === "failed" ? "bg-primary text-white" : "text-muted"}`} onClick={() => setCurrentTab("failed")}>
              Thất bại ({orders.filter((o) => o.status === "Thất bại").length})
            </a>
          </li>
        </ul>

        <div className="row mt-3">
          <div className="col-md-8">
            <div className="input-group w-50">
              <input type="text" className="form-control" placeholder="Tìm hóa đơn..." />
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-end">
            <div className="me-2">
              <span>Từ:</span>
              <input type="date" className="form-control form-control-sm" />
            </div>
            <div className="ms-2 me-2">
              <span>Đến:</span>
              <input type="date" className="form-control form-control-sm" />
            </div>
            <div className="ms-2">
              <span>Lọc:</span>
              <select className="form-control form-control-sm">
                <option>Option 1</option>
                <option>Option 2</option>
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
            {filteredOrders.map((order, index) => (
              <tr key={index} className="fw-bold">
                <td className="text-primary">{order.id}</td>
                <td className="d-flex">
                  <img className="me-3" src="https://via.placeholder.com/35x35" alt="Sản phẩm" />
                  <p>{order.product}</p>
                </td>
                <td className="text-success">{order.payment}</td>
                <td className={order.status === "Thành công" ? "text-success" : order.status === "Mới" ? "text-warning" : "text-danger"}>{order.status}</td>
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
                  <strong>Tên khách hàng:</strong> Nguyễn Văn A
                </Typography>
                <Typography variant="body1">
                  <strong>Số điện thoại:</strong> 0123456789
                </Typography>
                <Typography variant="body1">
                  <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM
                </Typography>
                <Typography variant="body1">
                  <strong>Ngày tạo:</strong> {selectedOrder.date}
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
