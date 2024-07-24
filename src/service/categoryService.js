import axios from "axios";

export const getAllCategory = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/category/getAll`
  );
  return res.data;
};
