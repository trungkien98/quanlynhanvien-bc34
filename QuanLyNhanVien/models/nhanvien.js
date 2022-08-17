function NhanVien(
  taiKhoan,
  name,
  mail,
  pass,
  ngayLam,
  luongCoBan,
  gioLam,
  chucVu
) {
  this.taiKhoan = taiKhoan;
  this.name = name;
  this.mail = mail;
  this.pass = pass;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.gioLam = gioLam;
  this.chucVu = chucVu;
  this.tinhLuong = function (chucVu) {
    this.tongLuong = 0;
    if (chucVu === 1) {
      this.tongLuong += this.luongCoBan * 3;
    } else if (chucVu === 2) {
      this.tongLuong += this.luongCoBan * 2;
    } else if (chucVu === 3) {
      this.tongLuong = this.luongCoBan * 1;
    }
  };
  this.xepHangNhanVien = function () {
    this.hangNhanVien = "";
    if (this.gioLam < 160) {
      this.hangNhanVien += "Trung bình";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      this.hangNhanVien += "Khá";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      this.hangNhanVien += "Giỏi";
    } else if (this.gioLam >= 192) {
      this.hangNhanVien += "Xuất sắc";
    }
  };
}
