import React, { useEffect, useState } from "react";

import { Navbar } from "../parts";
import { useHistory } from "react-router-dom";

import { InputText, InputFile, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  setPostBody,
  updatePost,
} from "../redux/action/postAction";

const CreatePost = ({ match }) => {
  const id = match.params.id;
  const { postBody, isLoading, posts, imagePreview } = useSelector(
    (state) => state.postState
  );
  
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    dispatch({
      type: "SET_BODY",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const creator = user?.user?._id
      ? user?.user?._id
      : user?.profile?.googleId;
    const name = user?.user?.username
      ? user?.user?.username
      : user?.profile?.name;

    const data = new FormData();

    data.append("name", name);
    data.append("title", postBody?.title);
    data.append("body", postBody?.body);
    data.append("creator", creator);
    data.append("tags", postBody?.tags);
    data.append("image", postBody?.image[0]);

    if (id) {
      dispatch(updatePost(id, data, history));
    } else {
      dispatch(createPost(data, history));
    }

    dispatch({ type: "SET_IMAGE_PREVIEW", value: null });
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    if (id) {
      const post = posts?.post?.find((post) => post?._id === id);

      dispatch(setPostBody("title", post?.title));
      dispatch(setPostBody("body", post?.body));
      dispatch(setPostBody("tags", post?.tags));
      dispatch(setPostBody("image", post?.image));
    } else {
      dispatch({ type: "SET_CLEAR_BODY" });
    }
  }, [dispatch, id, posts]);

  return (
    <div className="overflow-hidden">
      <Navbar user={user} setUser={setUser}></Navbar>
      <div className="w-1/2 p-5 mx-auto my-10 shadow-xl rounded-xl create-post">
        <h2 className="mb-5 text-xl font-semibold text-center text-black">
          {id ? "Edit Post" : "Create New Post"}
        </h2>
        <form action="POST" onSubmit={submit}>
          <InputText
            type="text"
            name="title"
            placeholder="Post Title"
            value={postBody.title}
            onChange={(e) =>
              dispatch({
                type: "SET_BODY",
                name: e.target.name,
                value: e.target.value,
              })
            }
          ></InputText>
          <InputText
            type="text"
            name="body"
            placeholder="Post Body"
            value={postBody.body}
            onChange={onChange}
          ></InputText>
          <InputText
            type="text"
            name="tags"
            placeholder="Exp tech,science..."
            value={postBody.tags}
            onChange={onChange}
          ></InputText>
          <InputFile onChange={onChange}></InputFile>
          {imagePreview && (
            <div className="relative w-1/3 transition-all duration-300 ease-in-out">
              <div
                className="absolute top-0 right-0 px-2 text-white bg-black rounded-full opacity-50"
                onClick={() => {
                  dispatch({ type: "SET_IMAGE_PREVIEW", value: null });
                }}
                style={{ cursor: "pointer" }}
              >
                x
              </div>
              <img
                src={URL.createObjectURL(imagePreview)}
                className="w-full mb-5 rounded-xl"
                alt="preview"
              />
            </div>
          )}
          <Button
            label={isLoading ? "Loading..." : id ? "Edit Post" : "Create Post"}
            type="submit"
            post
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
