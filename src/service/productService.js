import axios from "axios";
import { useSelector } from "react-redux";

export const axiosJWTproduct = axios.create();



export const getAllProduct = async (
  search = "",
  limit = 8,
  page = 1,
  sort = "",
  brand = [],
  ram = [],
  price = {}
) => {
  const params = {
    search,
    limit,
    page,
    sort,
    brand: brand.length > 0 ? brand : undefined, 
    ram: ram.length > 0 ? ram : undefined,
    minPrice: price.min ?? 0, 
    maxPrice: price.max ?? Number.MAX_SAFE_INTEGER, 
  };

  console.log(params);

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/getAll`,
    { params }
  );

  return res.data;
};



export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/details/${id}`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/create`,
    data
  );
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWTproduct.put(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/update/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWTproduct.delete(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/update/${id}`
  );
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all-type`
  );
  return res.data;
};
export const getAllBrand = async (brand) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all-brand`,
    brand
  );
  return res.data;
};

export const getProductType = async (type) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND
    }/product/getAll?filter=type&filter=${type}`
  );
  return res.data;
};

export const fetchProducts = async (limit, page, sort, filter) => {
  const response = await axios.get("/product/getAll", {
    params: {
      limit,
      page,
      sort: sort ? sort.join(",") : null,
      filter: filter ? filter.join(",") : null,
    },
  });
  return response.data;
};

export const getFilterProduct = async (filter) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/get-filter`,
    { params: filter }
  );
  return res.data;
};
