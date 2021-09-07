const initialState = {
  postBody: {
    title: "",
    body: "",
    tags: "",
    image: "",
  },
  posts: [],
  post: null,
  currentPost: null,
  isLoading: false,
  imagePreview: null,
};

const postState = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.value,
      };

    case 'SET_POST':
      return {
        ...state,
        post: action.value
      }

    case "SET_CURRENT_POST":
      return {
        ...state,
        currentPost: {
          ...state.posts?.post?.find((post) => post?._id === action.value),
        },
      };

    case "SET_BODY":
      return {
        ...state,
        postBody: {
          ...state.postBody,
          [action.name]: action.value,
        },
      };

    case "SET_CLEAR_BODY":
      return {
        ...state,
        postBody: {
          ...state.postBody,
          title: "",
          body: "",
          creator: "",
          tags: "",
          image: "",
        },
      };

    case "SET_DELETE":
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.value)],
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };

    case "SET_IMAGE_PREVIEW":
      return {
        ...state,
        imagePreview: action.value,
      };

    default:
      return state;
  }
};

export default postState;
