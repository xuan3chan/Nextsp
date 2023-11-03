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

export const createProduct = async ({ nameProduct, description, image, status, brand, price }) => {
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
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const editProduct = async (product) => {
  console.log(product)
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.images) {
    for (const file of product.images) {
      formData.append("images", file);
    }
  }
  /* Most important part for updating multiple image  */
  formData.append("nameProduct", product.nameProduct);
  formData.append("description", product.description);
  formData.append("status", product.status);
  formData.append("brand", product.brand);
  formData.append("price", product.price);
  formData.append("id", product.id);
  try {
    let res = await axios.put(`${apiURL}/update/${product.id}`, formData);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
}