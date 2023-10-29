import React, { Fragment, useState, useContext, useEffect } from 'react'
import { BrandContext } from './index'
import { createBrand, getAllBrand } from './FetchAPI'
import { getAllCategory } from '../categories/FetchApi'


// const AddBrandModal = () => {
//   const { data, dispatch } = useContext(BrandContext)

//   const alert = (msg, type) => (
//     <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
//   )
//   const [fData, setFdata] = useState({
//     nameBrand: '',
//     description: '',
//     nameCategory: '',
//     status: 'Active',
//     success: false,
//     error: false,
//   })

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await getAllCategory();
//         if (response.success) {
//           dispatch({ type: 'fetchCategories', payload: response.categories });
//         }
//       } catch (error) {
//         // Handle error
//       }
//     }
//     fetchCategories();
//   }, [dispatch]);

//   const fetchData = async () => {
//     let responseData = await getAllBrand()
//     if (responseData.Brands) {
//       dispatch({
//         type: 'fetchBrandAndChangeState',
//         payload: responseData.Brands,
//       })
//     }
//   }

//   if (fData.error || fData.success) {
//     setTimeout(() => {
//       setFdata({ ...fData, success: false, error: false })
//     }, 3000)
//   }

//   const submitForm = async (e) => {
//     dispatch({ type: 'loading', payload: true })
//     // Reset and prevent the form
//     e.preventDefault()
//     e.target.reset()

//     if (!fData.nameBrand) {
//       dispatch({ type: 'loading', payload: false })
//       return setFdata({ ...fData, error: 'Please Add the name !' })
//     }

//     try {
//       let responseData = await createBrand(fData)
//       if (responseData && responseData.success) {
//         fetchData()
//         setFdata({
//           ...fData,
//           nameBrand: '',
//           description: '',
//           status: 'Active',
//           success: responseData.success,
//           error: false,
//         })
//         dispatch({ type: 'loading', payload: false })
//         setFdata({
//           ...fData,
//           nameBrand: '',
//           description: '',
//           status: 'Active',
//           success: responseData.success,
//           error: false,
//         })
//       }
//     } catch (err) {
//       dispatch({ type: 'loading', payload: false })
//       setFdata({
//         ...fData,
//         nameBrand: '',
//         description: '',
//         status: 'Active',
//         success: false,
//         error: err.response.data.error,
//       })
//     }
//   }

//   return (
//     <Fragment>
//       {/* Black Overlay */}
//       <div
//         onClick={(e) => dispatch({ type: 
//           'addBrandModal', payload: false })}
//         className={`${
//           data.addBrandModal ? '' : 'hidden'
//         } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
//       />
//       {/* End Black Overlay */}
//       {/* Modal Start */}
//       <div
//         className={`${
//           data.addBrandModal ? '' : 'hidden'
//         } fixed inset-0 m-4  flex items-center z-30 justify-center`}
//       >
//         <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
//           <div className="flex items-center justify-between w-full pt-4">
//             <span className="text-left font-semibold text-2xl tracking-wider">
//               Add Brand
//             </span>
//             {/* Close Modal */}
//               <span onClick={(e) =>
//                 dispatch({ type: 'addBrandModal', payload: false })
//               }
//               className="cursor-pointer text-gray-100 py-2 px-2 rounded-full bg-black">
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </span>
//             {/* End Close Modal */}
//           </div>
//           <hr />
//           {/* Form Start */}
//           <form
//             onSubmit={submitForm}
//             className="w-full flex flex-col space-y-8 mt-4"
//           >
//             {fData.error && alert(fData.error, 'red')}
//             {fData.success && alert(fData.success, 'green')}
//             <div className="flex flex-col space-y-1 w-full">
//               <label className="text-sm font-medium text-gray-900">
//                 Name
//               </label>
//               <input
//                 onChange={(e) =>
//                   setFdata({ ...fData, nameBrand: e.target.value })
//                 }
//                 value={fData.nameBrand}
//                 type="text"
//                 className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
//                 placeholder="Name"
//               />
//             </div>
//             <div className="flex flex-col space-y-1 w-full">
//               <label className="text-sm font-medium text-gray-900">
//                 Description
//               </label>
//               <textarea
//                 onChange={(e) =>
//                   setFdata({ ...fData, description: e.target.value })
//                 }
//                 value={fData.description}
//                 type="text"
//                 className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
//                 placeholder="Description"
//               />
//             </div>
//             <div className="flex flex-col space-y-1 w-full">
//               <label className="text-sm font-medium text-gray-900">
//                 Status
//               </label>
//               <select
//                 onChange={(e) =>
//                   setFdata({ ...fData, status: e.target.value })
//                 }
//                 value={fData.status}
//                 className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//             <div className="flex flex-col space-y-1 w-full">
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-lg"
//               >
//                 Add Brand
//               </button>
//             </div>
//           </form>
//           {/* End Form */}
//         </div>
//       </div>
//       {/* End Modal */}      
//     </Fragment>
//   )
// }
const AddBrandModal = () => {
  const { data, dispatch } = useContext(BrandContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    nameBrand: '',
    description: '',
    nameCategory: '',
    status: 'Active',
    success: false,
    error: false,
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategory();
        if (response.success) {
          dispatch({ type: 'fetchCategories', payload: response.categories });
        }
      } catch (error) {
        // Handle error
      }
    }
    fetchCategories();
  }, [dispatch]);

  const fetchData = async () => {
    let responseData = await getAllBrand();
    if (responseData.Brands) {
      dispatch({
        type: 'fetchBrandAndChangeState',
        payload: responseData.Brands,
      });
    }
  };

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 3000);
  }

  const submitForm = async (e) => {
    dispatch({ type: 'loading', payload: true });
    // Reset and prevent the form
    e.preventDefault();
    e.target.reset();

    if (!fData.nameBrand) {
      dispatch({ type: 'loading', payload: false });
      return setFdata({ ...fData, error: 'Please Add the name !' });
    }

    try {
      let responseData = await createBrand(fData);
      if (responseData && responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          nameBrand: '',
          description: '',
          status: 'Active',
          success: responseData.success,
          error: false,
        });
        dispatch({ type: 'loading', payload: false });
        setFdata({
          ...fData,
          nameBrand: '',
          description: '',
          status: 'Active',
          success: responseData.success,
          error: false,
        });
      }
    } catch (err) {
      dispatch({ type: 'loading', payload: false });
      setFdata({
        ...fData,
        nameBrand: '',
        description: '',
        status: 'Active',
        success: false,
        error: err.response.data.error,
      });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={() => dispatch({ type: 'addBrandModal', payload: false })}
        className={`${
          data.addBrandModal ? '' : 'hidden'
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}
      {/* Modal Start */}
      <div
        className={`${
          data.addBrandModal ? '' : 'hidden'
        } fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Brand
            </span>
            {/* Close Modal */}
            <span
              onClick={() => dispatch({ type: 'addBrandModal', payload: false })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full bg-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            {/* End Close Modal */}
          </div>
          <hr />
          {/* Form Start */}
          <form onSubmit={submitForm} className="w-full flex flex-col space-y-8 mt-4">
            {fData.error && alert(fData.error, 'red')}
            {fData.success && alert(fData.success, 'green')}
            <div className="flex flex-col space-y-1 w-full">
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                onChange={(e) => setFdata({ ...fData, nameBrand: e.target.value })}
                value={fData.nameBrand}
                type="text"
                className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus-border-indigo-500"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label className="text-sm font-medium text-gray-900">Description</label>
              <textarea
                onChange={(e) => setFdata({ ...fData, description: e.target.value })}
                value={fData.description}
                type="text"
                className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus-border-indigo-500"
                placeholder="Description"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label className="text-sm font-medium text-gray-900">Category</label>
              <select
                onChange={(e) => setFdata({ ...fData, nameCategory: e.target.value })}
                value={fData.nameCategory}
                className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus-border-indigo-500"
              >
                <option value="">Select Category</option>
                {data.categories && data.categories.length > 0 ? (
                  data.categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.nameCategory}
                    </option>
                  ))
                ) : (
                  <option value="">No Category Found</option>
                )}
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label className="text-sm font-medium text-gray-900">Status</label>
              <select
                onChange={(e) => setFdata({ ...fData, status: e.target.value })}
                value={fData.status}
                className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus-border-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-lg"
              >
                Add Brand
              </button>
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
      {/* End Modal */}
    </Fragment>
  );
};


export default AddBrandModal