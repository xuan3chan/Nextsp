import axios from "axios";
const apiURL = process.env.REACT_APP_BRANDS


export const getAllBrand = async () => {
  try {
    let res = await axios.get(`${apiURL}/getall`);
    return res.data.brands;
  } catch (error) {
    console.log(error);
  }
}