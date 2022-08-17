function DanhSachNhanVien() {
  this.arr = [];

  this.addNV = function (id) {
    this.arr.push(id);
  };
  this.timViTriSV = function (taiKhoan) {
    /**
     * Tìm vị trí
     * - Tạo 1 biến index = -1;
     * - Duyệt mảng arr, i
     * - Kiểm tra sv.maSV trùng maSV?
     * => True: Cập nhật index = i
     */
    var index = -1;

    this.arr.forEach(function (sv, i) {
      if (sv.taiKhoan === taiKhoan) {
        index = i;
      }
    });

    return index;
  };

  this.xoaNV = function (taiKhoan) {
    var index = this.timViTriSV(taiKhoan);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.layThongTinNV = function (taiKhoan) {
    var nv = null;
    //tìm vị trí sinh viên
    var index = this.timViTriSV(taiKhoan);

    if (index !== -1) {
      nv = this.arr[index];
    }

    return nv;
  };
  this.capNhatSinhVien = function (nv) {
    //tim vi tri
    var index = this.timViTriSV(nv.taiKhoan);

    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
  this.timKiemSinhVien = function (keyword) {
    /**
     * 0. tạo mangTimKiem = []
     * 1. Duyệt mảng this.arr => sv
     * 2. Kiểm tra sv.tenSV trùng với lại keyword?
     *      => true => thêm sv vào mangTimKiem;
     * 3. trả về mangTimKiem;
     */
    var mangTimKiem = [];

    this.arr.forEach(function (nv) {
      //chuyen tenSV => chu thuong
      var nameLowerCase = nv.hangNhanVien.toLowerCase();
      var keywordLowerCase = keyword.toLowerCase();
      if (nameLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    });

    return mangTimKiem;
  };
}
