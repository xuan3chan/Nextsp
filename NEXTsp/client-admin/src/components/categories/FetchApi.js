import axios from "axios";
const apiURL = process.env.REACT_APP_CATEGORYIES;

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
    const res = await axios.get(`${apiURL}/getall`);
    return res.data.categories;
  } catch (err) {
    console.error(err);
  }
};

export const createCategory = async ({
  nameCategory,
  description,
  status
}) => {
  let formData = new FormData();
  formData.append("nameCategory", nameCategory);
  formData.append("description", description);
  formData.append("status", status);

  try {
    let res = await axios.post(
      `${apiURL}/add`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

