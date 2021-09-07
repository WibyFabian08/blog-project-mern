import * as api from "../../api";

export const signIn = (data, setShowAuth) => async (dispatch) => {
  try {
    const user = await api.signIn(data);

    dispatch({ type: "SET_AUTH_PROFILE", value: user.data });
    dispatch({ type: "SET_ERROR", value: null });
    dispatch({ type: "SET_LOADING", value: false });
    setShowAuth(false);
  } catch (err) {
    dispatch({ type: "SET_ERROR", value: err?.response?.data?.message });
    dispatch({ type: "SET_LOADING", value: false });
  }
};

export const signUp = (data, notify) => async (dispatch) => {
  try {
    await api.signUp(data);

    notify()

    dispatch({ type: "SET_ERROR", value: null });
    dispatch({ type: "SET_LOADING", value: false });
  } catch (err) {
    dispatch({ type: "SET_ERROR", value: err?.response?.data?.message });
    dispatch({ type: "SET_LOADING", value: false });
  }
};
