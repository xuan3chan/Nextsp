export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    _id: "",
    nameProduct: "",
    description: "",
    images: null,
    status: "",
    brand: "",
    price: "",
  },
}

export const productReducer = (state, action) => {
  switch(action.type) {
    case "fetchProductsAndChangeState":
      return {
        ...state,
        products: action.payload
      };
    case "addProductModal":
      return {
        ...state,
        addProductModal: action.payload
      };
    case "editProductModalOpen":
      return {
        ...state,
        editProductModal: {
          modal: true,
          _id: action.product._id,
          nameProduct: action.product.nameProduct,
          description: action.product.description,
          images: action.product.images,
          status: action.product.status,
          brand: action.product.brand,
          price: action.product.price,
        }
      };
    case "editProductModalClose":
      return {
        ...state,
        editProductModal: {
          modal: false,
          _id: "",
          nameProduct: "",
          description: "",
          images: null,
          status: "",
          brand: "",
          price: "",
        }
      };
    default:
      return state
  }
}