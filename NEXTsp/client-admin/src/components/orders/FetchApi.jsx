import axios from "axios";
const apiURL = process.env.REACT_APP_ORDERS;


export const getAllOrders = async () => {
  try {
    let res = await axios.get(`${apiURL}/getall`);
    return res.data.order;
  } catch (error) {
    console.log(error);
  }
}

// export const deleteOrder = async (_id) => {
//   try {
//     let res = await axios.delete(`${apiURL}/delete/${_id}`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const updateTracking = async (_id, newTracking) => {
//   try {
//     const res = await axios.put(`${apiURL}/update/${_id}`, { tracking: newTracking });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// }