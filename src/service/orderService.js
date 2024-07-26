import axios from "axios";
import { axiosJWT } from "./useService";

export const createOrder = async (access_token, data) => {
  const res = axiosJWT.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsOrders = async (userId, access_token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/order/get-order-details/${userId}`
  );
  return res.data;
};

export const cancelOrder = async (id, token, orderItems) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_API_URL_BACKEND}/order/cancel-order/${id}`,
    { data: orderItems }
  );
  return res.data;
};

export const getAllOrder = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/order/getAll`
  );
  return res.data;
};
