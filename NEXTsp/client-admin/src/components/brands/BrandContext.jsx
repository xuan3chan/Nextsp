export const brandState = {
  brands: null,
  addBrandModal: false,
  editBrandModal: {
    modal: false,
    id: "",
    nameBrand: "",
    description: "",
    category: "",
    status: "",
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
          category: action.category,
          status: action.status,
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
          category: "",
          status: "",
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