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
    let res = await axios.delete(`${apiURL}/delete/${_id}`);
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
}

export const createProduct = async ({
  nameProduct,
  description,
  images,
  status,
  brand,
  price,
}) => {
  let formData = new FormData();
  for (const file of images) {
    formData.append("images", file);
  }
  formData.append("nameProduct", nameProduct);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("brand", brand);
  formData.append("price", price);

  try {
    let res = await axios.post(`${apiURL}/add`, formData);
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
}