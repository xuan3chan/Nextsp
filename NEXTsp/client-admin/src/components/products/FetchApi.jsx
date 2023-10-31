import axios from "axios";
const apiURL = process.env.REACT_APP_PRODUCTS

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/getall`);
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
}

export const deleteProduct = async (_id) => {
  try {
    let res = await axios.post(`${apiURL}/delete/`, { _id });
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
};