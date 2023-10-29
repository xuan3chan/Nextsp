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

export const createBrand = async ({nameBrand, description, nameCategory, status}) => {
  try {
    const formData = {
      nameBrand,
      description,
      nameCategory,
      status,
    };

    const res = await axios.post(`${apiURL}/add`, formData);
    
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Failed to create the brand." };
  }
}