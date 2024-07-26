import axios from "axios";
import { useSelector } from "react-redux";

export const axiosJWTproduct = axios.create();

export const getAllProductTest = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${
        import.meta.env.VITE_API_URL_BACKEND
      }/product/getAll?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/product/getAll?limit=${limit}`
    );
  }
  return res.data;
};

export const getAllProduct = async (
  search,
  limit,
  page,
  sort,
  brand,
  ram,
  price
) => {
  // Get filter values from the Redux store
  // const { brand, ram, price } = useSelector((state) => state.product);
  // Convert price to a numeric range
  let minPrice = 0;
  let maxPrice = Infinity;
  if (price === "Dưới 2 triệu") {
    maxPrice = 2000000;
  } else if (price === "2 - 5 triệu") {
    minPrice = 2000000;
    maxPrice = 5000000;
  } else if (price === "5 - 10 triệu") {
    minPrice = 5000000;
    maxPrice = 10000000;
  } else if (price === "10 - 15 triệu") {
    minPrice = 10000000;
    maxPrice = 15000000;
  } else if (price === "Trên 15 triệu") {
    minPrice = 15000000;
  }

  const params = {
    limit,
    search,
    page: page - 1, // Convert page number to 0-based index
    sort,
    brand,
    ram,
    minPrice,
    maxPrice,
  };
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/product/getAll`,
    params
  );
  return res.data;
};

export const getAllProductMain = async (search, limit, page, sort, filter) => {
  const params = {
    limit,
    page: page - 1, // Chuyển đổi số trang thành chỉ số bắt đầu từ 0
  };

  // Thêm tham số tìm kiếm vào params
  if (search?.length > 0) {
    params.search = search; // Thay đổi tên tham số nếu API yêu cầu
  }

  // Thêm tham số lọc vào params
  if (filter) {
    params.filter = filter; // Ví dụ: 'name,brand,category' hoặc JSON string của đối tượng lọc
  }

  // Thêm tham số sắp xếp vào params
  if (sort?.length > 0) {
    params.sort = sort;
  }

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/product/getAll`,
      { params }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
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
    `${
      import.meta.env.VITE_API_URL_BACKEND
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
