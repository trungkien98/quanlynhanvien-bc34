function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      //Error
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }

    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraKiTuChuoi = function (value, errorId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (value.match(letter)) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
  this.kiemTraPass = function (value, errorId, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
  this.checkEmail = function (value, errorId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.checkChucVu = function (selectId, errorId, mess) {
    if (getEle(selectId).selectedIndex !== 0) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.checkMaSVTonTai = function (value, errorId, mess, list) {
    //false => k ton tai
    //true => ton tai
    // var status = false;

    // list.forEach(function (sv) {
    //   if (value === sv.maSV) {
    //     status = true;
    //   }
    // });

    var status = list.some(function (nv) {
      return value === nv.taiKhoan;
    });

    if (status) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }

    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
  this.checkLuong = function (selectId, errorId, mess, min, max) {
    if (selectId < min || selectId > max) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
}
