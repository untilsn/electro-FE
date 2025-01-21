import axios from "axios";

export const createOrder = async (userId, access_token, data) => {
  const res = axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/order/create/${userId}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getUserOrder = async (userId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/order/get-user-order/${userId}`
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
