import axios from "axios";
const apiURL = process.env.REACT_APP_ORDERS;

export const getAllOrders = async () => {
  try {
    let res = await axios.get(`${apiURL}/getall`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}