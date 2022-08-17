//tao dsnv tu lop doi tuong danh sach nhan vien
var dsnv = new DanhSachNhanVien();
var validation = new Validation();
function getEle(id) {
  return document.getElementById(id);
}
getLocalStorage();

function layThongTinNhanVien(isAdd) {
  var taiKhoan = getEle("tknv").value;
  var name = getEle("name").value;
  var mail = getEle("email").value;
  var ngayLam = getEle("datepicker").value;
  var password = getEle("password").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;
  //valid tai khoan

  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTKNV",
        "(*) Vui long nhap tai khoan"
      ) &&
      validation.kiemTraDoDaiKiTu(
        taiKhoan,
        "tbTKNV",
        "vui long nhap tai khoan co 4-6 chu so",
        4,
        6
      ) &&
      validation.checkMaSVTonTai(
        taiKhoan,
        "tbTKNV",
        "(*)tai khoan da ton tai",
        dsnv.arr
      );
  }
  //valid ho va ten
  isValid &=
    validation.kiemTraRong(name, "tbTen", "(*) Vui long nhap ten") &&
    validation.kiemTraKiTuChuoi(
      name,
      "tbTen",
      "(*) Vui long nhap dung dinh dang"
    );
  //valid mail
  isValid &=
    validation.kiemTraRong(mail, "tbEmail", "(*) Vui long nhap mail") &&
    validation.checkEmail(
      mail,
      "tbEmail",
      "(*) Vui long nhap mail dung dinh dang"
    );
  //valid mat khau
  isValid &=
    validation.kiemTraRong(
      password,
      "tbMatKhau",
      "(*) Vui long nhap mat khau"
    ) &&
    validation.kiemTraDoDaiKiTu(
      password,
      "tbMatKhau",
      "(*) Vui long nhap mat khau co 6-10 chu so",
      6,
      10
    ) &&
    validation.kiemTraPass(
      password,
      "tbMatKhau",
      "(*) Vui long nhap mat khau dung dinh dang"
    );
  //vailid ngay vao lam
  isValid &= validation.kiemTraRong(
    ngayLam,
    "tbNgay",
    "(*) Vui long nhap ngay thang"
  );
  //valid luong
  isValid &=
    validation.kiemTraRong(
      luongCoBan,
      "tbLuongCB",
      "(*) Vui long nhap du so lieu"
    ) &&
    validation.checkLuong(
      luongCoBan,
      "tbLuongCB",
      "(*) vui long nhap dung so luong",
      1000000,
      20000000
    );
  //valid chuc vu
  isValid &= validation.checkChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui long chon chuc vu"
  );
  //valid gio lam
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*) Vui long nhap du so lieu"
    ) &&
    validation.checkLuong(
      gioLam,
      "tbGiolam",
      "(*) Vui long nhap du so lieu",
      80,
      200
    );
  if (!isValid) return null;
  var nhanVien = new NhanVien(
    taiKhoan,
    name,
    mail,
    password,
    ngayLam,
    luongCoBan,
    gioLam,
    chucVu
  );
  nhanVien.tinhLuong(getEle("chucvu").selectedIndex);
  nhanVien.xepHangNhanVien();
  return nhanVien;
}

//btn them
getEle("btnThem").addEventListener("click", function () {
  getEle("tknv").disabled = false;
});

//btn them sinh vien
getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien(true);
  if (nhanVien) {
    dsnv.addNV(nhanVien);
    renderTable(dsnv.arr);
    setLocalStorage();
  }
});
//render table
function renderTable(data) {
  var content = "";

  data.forEach(function (nv) {
    content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.name}</td>
                <td>${nv.mail}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.hangNhanVien}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>
                </td>
            </tr>
        `;
  });

  getEle("tableDanhSach").innerHTML = content;
}

/**
 * Xoa nV
 */
function xoaNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage();
}

/**
 * cap nhat nv
 */
getEle("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNhanVien(false);
  dsnv.capNhatSinhVien(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
});

function suaNV(taiKhoan) {
  var nv = dsnv.layThongTinNV(taiKhoan);
  if (nv) {
    //Dom tới các thẻ input show value
    getEle("tknv").value = nv.taiKhoan;
    //disabled #txtMaSV
    getEle("tknv").disabled = true;
    getEle("name").value = nv.name;
    getEle("email").value = nv.mail;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}
function setLocalStorage() {
  //Convert JSON => string
  var dataString = JSON.stringify(dsnv.arr);
  //Luu xuong localStorage
  localStorage.setItem("DanhSachNhanVien", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DanhSachNhanVien")) {
    var dataString = localStorage.getItem("DanhSachNhanVien");
    //Convet string => JSON
    var dataJson = JSON.parse(dataString);
    //backup lại dự liệu cho dssv.arr từ dataJson
    dsnv.arr = dataJson;
    //hiển thị dssv ra ngoài table
    renderTable(dataJson);
  }
}
/**
 * Tim kiem sinh vien
 */
getEle("searchName").addEventListener("keyup", function () {
  //dom lấy value input#txtKeyword
  var keyword = getEle("searchName").value;

  var mangTimKiem = dsnv.timKiemSinhVien(keyword);
  renderTable(mangTimKiem);
});
