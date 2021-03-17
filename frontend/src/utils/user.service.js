import axiosInstance from "../apis/accounts.instance";

const UserDetails = () => {
  axiosInstance
    .get("/user")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default {
  UserDetails,
};
