export const orderState = {
  orders: [],
  editOrderModal: {
    modal: false,
    status: "",
  },
  loading: false,
}

export const orderReducer = (state, action) => {
  switch (action.type) {
    /* Get all category */
    case "fetchOrderAndChangeState":
      return {
        ...state,
        orders: action.payload,
      }
    case "loading":
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}