import axios from "axios";
import "dotenv/config";
import jwt from "jsonwebtoken";
const url = process.env.NEXT_PUBLIC_URL;

export const getAllData = async (tableName) => {
  try {
    const result = await axios.post(
      `${url}api/sqlFetchData/sqlFetchDataAll`,
      tableName,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDataByCondition = async (condition) => {
  try {
    const result = await axios.post(
      `${url}api/sqlFetchData/sqlFetchData`,
      condition,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDropDownValues = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/dropDownValues`, obj);
    return res.data?.data;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const getQuotationFormData = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/sendEmail`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const getShipperFormDataById = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/getShipmentById`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const getShipperListData = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/getShipmentListData`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const getInvoiceListData = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/getInvoiceListData`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const getBookingListData = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/getBookingListData`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const getQuotationListData = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/getQuotationListData`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const decryptToken = () => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    return error;
  }
};

export const login  = async (data) => {
  try {
    const path = `${url}api/v1/login`;
    const response = await axios.post(path, data);
    if (response.status == 200 )  { 
      localStorage.setItem('token', response.data?.token);
   };

    return {successMessge : response?.data?.message };

  } catch (error) {
    return { errorMessage : error?.response?.data?.message };
  }
}

export const sendEmailForQuotation =  (data) =>  {
  try {
    const path = `${url}api/v1/requestQuotation`;
    const response = axios.post(path, data);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
  }

}

export const vesselFormData = async (data) =>  {
  try {
    const path = `${url}api/v1/vseselInsert`;
    const response = await axios.post(path, data);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
  }

}

export const getBookingFormDataById = async (obj) => {
  try {
    const res = await axios.post(`${url}api/v1/getBookingById`, obj);
    return res;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export const submitQuotationFormData = async (obj) => {
   try {
    const res = await axios.post(`${url}api/v1/insertQuotation`, obj);
    return res; 
   } catch (error) {
    return {
      message: error.message,
    };
   }
};

export const submitBookingFormData = async (obj) => {
  try {
   const res = await axios.post(`${url}api/v1/insertBooking`, obj);
   return res; 
  } catch (error) {
   return {
     message: error.message,
   };
  }
};

export const submitShipperFormData = async (obj) => {
  try {
   const res = await axios.post(`${url}api/v1/insertShipment`, obj);
   return res; 
  } catch (error) {
   return {
     message: error.message,
   };
  }
};
