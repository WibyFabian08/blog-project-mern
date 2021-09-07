const initialState = {
  authProfile: null,
  authBody: {
    username: "",
    email: "",
    password: "",
    confirm: "",
  },
  isLoading: false,
  error: null
};

const authState = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH_PROFILE":
      localStorage.setItem("user", JSON.stringify(action.value))
      return {
        ...state,
        authProfile: action.value
      }

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authProfile: null
      }

    case "SET_AUTH_BODY":
      return {
        ...state,
        authBody: {
          ...state.authBody,
          [action.name]: action.value,
        },
      };

    case "SET_AUTH_CLEAR":
      return {
        ...state,
        authBody: {
          ...state.authBody,
          username: "",
          email: "",
          password: "",
          confirm: "",
        },
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.value
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.value
      }

    default:
      return state;
  }
};

export default authState;
