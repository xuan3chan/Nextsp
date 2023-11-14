export const brandState = {
  brands: null,
  addBrandModal: false,
  editBrandModal: {
    modal: false,
    id: "",
    nameBrand: "",
    description: "",
    status: "",
    category: "",
  },
  loading: false
}

export const brandReducer = (state, action) => {
  switch (action.type) {
    /* Get all brand */
    case "fetchBrandAndChangeState":
      return {
        ...state,
        brands: action.payload,
      };
      case "addBrandModal":
      return {
        ...state,
        addBrandModal: action.payload,
      };
      case "editBrandModalOpen":
      return {
        ...state,
        editBrandModal: {
          modal: true,
          id: action.id,
          nameBrand: action.nameBrand,
          description: action.description,
          status: action.status,
          category: action.category,
        },
      };
      case "editBrandModalClose":
      return {
        ...state,
        editBrandModal: {
          modal: false,
          id: "",
          nameBrand: "",
          description: "",
          status: "",
          category: "",
        },
      };
      case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}