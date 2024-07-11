import { axiosJWT } from "./useService";

export const getConfig = async () => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/payment/config`
  );
  return res.data;
};
