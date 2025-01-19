import axios from "axios";

export const getAllBrand = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/brand/getAll`
  );
  return res.data;
};



