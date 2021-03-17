import axiosInstance from "../apis/accounts.instance";

const register = (username, email, password, first_name, last_name) => {
  return axiosInstance.post("register/", {
    username,
    email,
    password,
    first_name,
    last_name,
  });
};

const login = (values) => {
  return axiosInstance.post("/login/", values).then((response) => {
    const refreshtoken = response.data.refresh_token;
    localStorage.setItem("resolve-refresh-token", refreshtoken);
    axiosInstance.get("/user/").then((response) => {
      const userdata = response.data;
      localStorage.setItem("resolve-user-data", JSON.stringify(userdata));
    });
    return response.data;
  });
};

const logout = () => {
  return axiosInstance.post("/logout/").then((response) => {
    localStorage.removeItem("resolve-refresh-token");
    localStorage.removeItem("resolve-user-data");
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};
