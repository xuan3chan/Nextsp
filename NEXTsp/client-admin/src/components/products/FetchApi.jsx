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

export const deleteProduct = async (id) => {
  try {
    let res = await axios.delete(`${apiURL}/delete/${id}`);
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

export const createProduct = async ({ nameProduct, description, image, status, brand, category, price, oldprice }) => {
  let formData = new FormData();
  
  for (const file of image) {
    formData.append("images", file);
  }
  formData.append("nameProduct", nameProduct);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("brand", brand);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("oldprice", oldprice);

  try {
    let res = await axios.post(`${apiURL}/add`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const editProduct = async (product, originalProduct) => {
  try {
    let formData = new FormData();

    // If there are new images, upload them
    if (product.newImages) {
      for (const file of product.newImages) {
        formData.append("newImages", file);
      }
    }

    // If there are images to delete, add them to the form data
    if (product.imagesToDelete) {
      for (const url of product.imagesToDelete) {
        formData.append("imagesToDelete", url);
      }
    }

    if (product.images && product.images !== originalProduct.images) {
      for (const file of product.images) {
        formData.append("images", file);
      }
    }
    if (product.id !== originalProduct.id) {
      formData.append("id", product.id);
    }
    if (product.nameProduct !== originalProduct.nameProduct) {
      formData.append("nameProduct", product.nameProduct);
    }
    if (product.description !== originalProduct.description) {
      formData.append("description", product.description);
    }
    if (product.status !== originalProduct.status) {
      formData.append("status", product.status);
    }
    if (product.brand && originalProduct.brand && product.brand.id !== originalProduct.brand.id) {
      formData.append("brand", product.brand);
    }
    if (product.category && originalProduct.category && product.category.id !== originalProduct.category.id) {
      formData.append("category", product.category);
    } else if (!product.category) {
      formData.append("category", { _id: "", nameCategory: "" });
    }
    if (product.price !== originalProduct.price) {
      formData.append("price", product.price);
    }
    if (product.oldprice !== originalProduct.oldprice) {
      formData.append("oldprice", product.oldprice);
    }

    console.log("Product before sending request:", product);

    let res = await axios.put(`${apiURL}/update/${product.id}`, formData);
    return res.data;
  } catch (error) {
    return { error: 'An error occurred while updating the product.' };
  }
};


