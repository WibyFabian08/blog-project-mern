import * as api from "../../api";

export const setPostBody = (name, value) => {
  return {
    type: "SET_BODY",
    name,
    value,
  };
};

export const getPosts = (currentPage, perPage) => async (dispatch) => {
  try {
    const posts = await api.getPosts(currentPage, perPage);

    dispatch({ type: "SET_POSTS", value: posts.data });
  } catch (err) {
    console.log(err);
  }
};

export const getPost =
  (id, setSearchQuery, searchQuery) => async (dispatch) => {
    try {
      const post = await api.getPost(id);

      setSearchQuery({
        ...searchQuery,
        title: "none",
        tags: post.data.tags.toString(),
      });

      dispatch({ type: "SET_POST", value: post.data });
    } catch (err) {
      console.log(err);
    }
  };

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    const posts = await api.getPostBySearch(searchQuery);

    dispatch({ type: "SET_POSTS", value: posts.data });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (data, history) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  try {
    await api.createPost(data);

    history.push("/");

    dispatch({ type: "SET_LOADING", value: false });
    dispatch({ type: "SET_CLEAR_BODY" });
  } catch (err) {
    console.log(err?.response?.data?.message);
    dispatch({ type: "SET_LOADING", value: false });
  }
};

export const updatePost = (id, data, history) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });

  try {
    await api.editPost(id, data);

    history.push("/");

    dispatch({ type: "SET_LOADING", value: false });
    dispatch({ type: "SET_CLEAR_BODY" });
  } catch (err) {
    console.log(err);
    dispatch({ type: "SET_LOADING", value: false });
  }
};

export const deletePostAction = (id, confirmAlert) => (dispatch) => {
  const deleteAction = async (id) => {
    try {
      await api.deletePost(id);

      dispatch({ type: "SET_DELETE", value: id });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  confirmAlert({
    title: "Confirm to submit",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => deleteAction(id),
      },
      {
        label: "No",
        onClick: () => console.log("delete failed"),
      },
    ],
  });
};

export const likePost = (id, currentPage, perPage) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", value: true });
  try {
    await api.likePost(id);
    const posts = await api.getPosts(currentPage, perPage);

    dispatch({ type: "SET_POSTS", value: posts.data });
    dispatch({ type: "SET_LOADING", value: false });
  } catch (err) {
    console.log(err?.response?.data?.message);
    dispatch({ type: "SET_LOADING", value: false });
  }
};

export const commentPost = (id, data) => async (dispatch) => {
  try {
    const comment = await api.commentPost(id, data);

    dispatch({type: 'SET_POST', value: comment.data});

  } catch (err) {
    console.log(err)
  }
}
