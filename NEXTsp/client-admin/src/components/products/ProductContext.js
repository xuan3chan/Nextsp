export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    id: "",
    nameProduct: "",
    description: "",
    images: null,
    status: "",
    brand: "",
    category: "",
    price: "",
    oldprice: ""
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
          id: action.product.id,
          nameProduct: action.product.nameProduct,
          description: action.product.description,
          images: action.product.images,
          status: action.product.status,
          brand: action.product.brand,
          category: action.product.category,
          price: action.product.price,
          oldprice: action.product.oldprice,
        }
      };
    case "editProductModalClose":
      return {
        ...state,
        editProductModal: {
          modal: false,
          id: "",
          nameProduct: "",
          description: "",
          images: null,
          status: "",
          brand: "",
          category: "",
          price: "",
          oldprice: ""
        }
      };
    default:
      return state
  }
}