import {
  LOAD_WISHLIST,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/wishlist";

export const wishlist = (state = {}, action) => {
  switch (action.type) {
    case LOAD_WISHLIST:
      return { wishlist: action.payload };
    case "SHOW_BILLING":
      return { ...state, show_billing_modal: true };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
