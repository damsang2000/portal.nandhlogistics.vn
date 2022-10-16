const getJsonDataLogin = (typeId, prototypeId, username, password) => {
  return {
    Auth: {
      Token: "",
      Type_ID: typeId,
      Prototype_ID: prototypeId,
      Device_ID: "",
    },
    Data: {
      Ma_Dang_Nhap: username,
      Mat_Khau: password,
    },
  };
};

const getJsonDataInventory = (
  token,
  type_id,
  prototye_id,
  ownerCode,
  pageNum,
  pageLimit
) => {
  return {
    Auth: {
      Token: token,
      Type_ID: type_id,
      Prototype_ID: prototye_id,
      Device_ID: "",
    },
    Data: {
      Owner_Code: ownerCode,
      Page_Num: pageNum,
      Page_Limit: pageLimit,
    },
  };
};

const getJsonDataXuatNhapTon = (
  token,
  type_id,
  prototye_id,
  ownerCode,
  dateFrom,
  dateTo,
  pageNum,
  pageLimit,
  viewTypeId
) => {
  return {
    Auth: {
      Token: token,
      Type_ID: type_id,
      Prototype_ID: prototye_id,
      Device_ID: "",
    },
    Data: {
      Owner_Code: ownerCode,
      Date_From: dateFrom,
      Date_To: dateTo,
      Page_Num: pageNum,
      Page_Limit: pageLimit,
      View_Type_ID: viewTypeId,
    },
  };
};

export { getJsonDataLogin, getJsonDataInventory, getJsonDataXuatNhapTon };
