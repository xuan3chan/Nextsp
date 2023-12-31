export const categoryState = {
  categories: [],
  addCategoryModal: false,
  editCategoryModal: {
    modal: false,
    _id: "",
    nameCategory: "",
    description: "",
    status: "",
  },
  loading: false,
}

export const categoryReducer = (state, action) => {
  switch (action.type) {
    /* Get all category */
    case "fetchCategoryAndChangeState":
      return {
        ...state,
        categories: action.payload,
      };
      case "addCategoryModal":
      return {
        ...state,
        addCategoryModal: action.payload,
      };
      case "editCategoryModalOpen":
      return {
        ...state,
        editCategoryModal: {
          modal: true,
          _id: action._id,
          nameCategory: action.nameCategory,
          description: action.description,
          status: action.status,
        },
      };
      case "editCategoryModalClose":
      return {
        ...state,
        editCategoryModal: {
          modal: false,
          _id: "",
          nameCategory: "",
          description: "",
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