export const brandState = {
  brands: [],
  
  loading: false
}

export const brandReducer = (state, action) => {
  switch (action.type) {
    /* Get all brand */
    case "fetchbrandAndChangeState":
      return {
        ...state,
        categories: action.payload,
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