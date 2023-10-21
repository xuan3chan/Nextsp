export const categoryState = {
  categories: []
}

export const categoryReducer = (state, action) => {
  switch (action.type) {
    /* Get all category */
    case "fetchCategoryAndChangeState":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}