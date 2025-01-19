import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/user/sign-in`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateUser = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${import.meta.env.VITE_API_URL_BACKEND}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data.updatedUser;
};

export const getAllUser = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/user/getAll`
  );
  return res.data;
};

// export const refreshToken = async () => {
//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL_BACKEND}/user/refresh-token`,
//       {},
//       {
//         withCredentials: true, // Tùy chọn cấu hình
//       }
//     );
//     return res.data;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     throw error;
//   }
// };

export const refreshTokenUser = async (refreshToken) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL_BACKEND}/user/refresh-token`,
      {},
      {
        headers: {
          token: `Bearer ${refreshToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL_BACKEND}/user/log-out`,
      {},
      {
        withCredentials: true,
      }
    );

    // Xóa mục cụ thể từ localStorage nếu cần thiết
    localStorage.removeItem("access_token");

    // Hoặc xóa toàn bộ localStorage
    localStorage.clear();

    return res.data;
  } catch (error) {
    console.error("Error logout", error);
    throw error;
  }
};
