import axios from "axios";

//   const token = localStorage.getItem("token");

function axiosWithAuth() {
  const token = localStorage.getItem("token");
  const visited = localStorage.getItem("visited");
  const cart = localStorage.getItem("cart");

  return axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_NAME,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
      visited: `${visited}`,
      cart: `${cart}`,
      shop_id: process.env.REACT_APP_USER_ID
    },
  });
}
// function axiosWithAuth() {
//   return axios.create({
//     baseURL: process.env.REACT_APP_DOMAIN_NAME,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": true,
//     },
//     withCredentials: true,
//   });
// }

function axiosWithoutAuth() {
  return axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_NAME,
  });
}

function axiosViewsSession() {
  axiosWithAuth()
    .post("/views/", {
      shop_id: parseInt(process.env.REACT_APP_USER_ID),
    })
    .then((res) => {
      localStorage.setItem("visited", res.data.token);
      console.log(res);
    })
    .catch((err) => console.log(err));
}

export { axiosWithAuth, axiosWithoutAuth, axiosViewsSession };
