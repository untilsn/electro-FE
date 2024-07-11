import axios from "axios";

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

export const getAllProduct = async (search, limit, page, sort) => {
  let res = {};
  const params = {
    limit,
    page: page - 1, // Convert page number to 0-based index
  };

  if (search?.length > 0) {
    params.filter = `name,${search}`;
  }

  if (sort?.length > 0) {
    params.sort = sort;
  }

  res = await axios.get(
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
