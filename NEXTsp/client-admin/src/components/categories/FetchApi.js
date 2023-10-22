import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// const BearerToken = () =>
//   localStorage.getItem("accessToken")
//     ? JSON.parse(localStorage.getItem("accessToken")).token
//     : false;
// const Headers = () => {
//   return {
//     headers: {
//       token: `Bearer ${BearerToken()}`,
//     },
//   };
// };

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/getallcategory`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};