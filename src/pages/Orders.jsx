/*eslint-disable*/ 
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <div className="container my-5">
        <h3 className="mt-4 fw-bold">Lịch sử hóa đơn</h3>
        {/* Tabs */}
        <ul className="nav nav-tabs mt-2 fw-bold">
          <li className="nav-item">
            <a className="nav-link bg-primary text-white active" href="#">
              Tất cả hóa đơn (50)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted" href="#">
              Mới (10)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted" href="#">
              Thành công (10)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted" href="#">
              Thất bại (10)
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
            <tr className="fw-bold">
              <td className="text-primary">#192611</td>
              <td className="d-flex">
                <img className="me-3" src="https://via.placeholder.com/35x35" alt="Sản phẩm" />
                <p>Sửa rửa mặt simple</p>
              </td>
              <td className="text-success">COD</td>
              <td className="text-success">Thành công</td>
              <td>550.000 VNĐ</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={handleOpen}>
                  Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="fw-bold">
              <td className="text-primary">#192611</td>
              <td className="d-flex">
                <img className="me-3" src="https://via.placeholder.com/35x35" alt="Sản phẩm" />
                <p>Sửa rửa mặt simple</p>
              </td>
              <td className="text-success">COD</td>
              <td className="text-warning">Tạo mới</td>
              <td>550.000 VNĐ</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={handleOpen}>
                  Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="fw-bold">
              <td className="text-primary">#192611</td>
              <td className="d-flex">
                <img className="me-3" src="https://via.placeholder.com/35x35" alt="Sản phẩm" />
                <p>Sửa rửa mặt simple</p>
              </td>
              <td className="text-success">COD</td>
              <td className="text-danger">Thất bại</td>
              <td>550.000 VNĐ</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={handleOpen}>
                  Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Chi tiết hóa đơn
            </Typography>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">
                  <strong>ID:</strong> #192611
                </Typography>
                <Typography variant="body1">
                  <strong>Trạng thái:</strong> Thành công
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
                <strong>Ngày tạo:</strong> 2024-09-18
              </Typography>{" "}
              {/* Ngày tạo hóa đơn */}
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>#192611</TableCell>
                      <TableCell>Sửa rửa mặt simple</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>250.000 VNĐ</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>#192611</TableCell>
                      <TableCell>Kem chống nắng</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>300.000 VNĐ</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Tổng tiền hóa đơn:</strong> 550.000 VNĐ
              </Typography>
            </div>
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
