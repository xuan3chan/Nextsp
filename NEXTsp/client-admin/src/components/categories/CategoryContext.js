export const categoryState = {
  categories: [],
  addCategoryModal: false,
  // editCategoryModal: {
  //   modal: false,
  //   _id: null,
  //   nameCategory: "",
  //   description: "",
  //   status: "",
  // },
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
      case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}