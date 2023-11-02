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

export const createPorductImage = async ({ image }) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of image) {
    formData.append("image", file);
  }
  /* Most important part for uploading multiple image  */
};

export const createProduct = async ({
  nameProduct,
  description,
  image,
  status,
  brand,
  price,
}) => {
  let formData = new FormData();
  for (const file of image) {
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