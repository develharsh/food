import {
  LOAD_WISHLIST,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/wishlist";

export const loadWishlist = () => (dispatch) => {
  const today = new Date().getDay();
  try {
    let wishlist = localStorage.getItem("wishlist");
    if (!wishlist) throw null;
    wishlist = JSON.parse(wishlist);
    if (!wishlist[today]) throw null;
    else wishlist = wishlist[today];
    dispatch({ type: LOAD_WISHLIST, payload: wishlist });
  } catch (err) {
    localStorage.setItem("wishlist", JSON.stringify({ [today]: [] }));
    dispatch({ type: LOAD_WISHLIST, payload: [] });
  }
};

export const updateFromWishlist = (data, value) => (dispatch) => {
  try {
    let wishlist = localStorage.getItem("wishlist");
    if (!wishlist) throw null;
    wishlist = JSON.parse(wishlist);
    const today = new Date().getDay();
    if (!wishlist[today]) throw null;
    else wishlist = wishlist[today];
    let seen = false;
    wishlist = wishlist.map((each) => {
      if (each.id === data.id) {
        each.quantity = parseInt(value);
        seen = true;
      }
      return each;
    });
    if (!seen) {
      wishlist.push({ ...data, quantity: parseInt(value) });
    }
    localStorage.setItem("wishlist", JSON.stringify({ [today]: wishlist }));
    dispatch(loadWishlist());
  } catch (err) {
    dispatch(loadWishlist());
  }
};

export const removeFromWishlist = (id) => (dispatch) => {
  try {
    let wishlist = localStorage.getItem("wishlist");
    if (!wishlist) throw null;
    wishlist = JSON.parse(wishlist);
    const today = new Date().getDay();
    if (!wishlist[today]) throw null;
    else wishlist = wishlist[today];
    wishlist = wishlist.filter((each) => each.id !== id);
    localStorage.setItem("wishlist", JSON.stringify({ [today]: wishlist }));
    dispatch(loadWishlist());
  } catch (err) {
    dispatch(loadWishlist());
  }
};
export const clearWishlist = () => (dispatch) => {
  const today = new Date().getDay();
  localStorage.setItem("wishlist", JSON.stringify({ [today]: [] }));
  dispatch(loadWishlist());
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
