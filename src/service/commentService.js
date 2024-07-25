import axios from "axios";

export const createComment = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/comment/create`,
    data
  );
  return res.data;
};

export const getAllComment = async (productId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/comment/getAll/${productId}`
  );
  return res.data;
};
