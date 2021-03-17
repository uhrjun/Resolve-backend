import axiosInstace from "../apis/accounts.instance";

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    axiosInstance.post(
      "token/refresh",
      localStorage.getitem("resolve-refresh-token")
    );
  }
  return response;
});

