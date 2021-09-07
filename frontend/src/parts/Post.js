import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import moment from "moment";

import Button from "../elements/Button";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";


const Post = ({ post, deletePost, handleLike, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.profile?.googleId || user?.user?._id)
      ) ? (
        <>
          &nbsp;
          {post.likes.length > 1
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return <>&nbsp;Like</>;
  };

  if (!post) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="w-full px-2 sm:w-1/2 lg:w-4/12">
      <div className="relative w-full pb-5 mb-5 overflow-hidden shadow-2xl rounded-xl">
        <img
          src={post ? `${process.env.REACT_APP_URL}/${post?.image}` : ""}
          className="object-cover w-full post-image"
          alt="post"
          style={{ height: 270, cursor: "pointer" }}
          onClick={() => history.push(`/detail/${post._id}`)}
        />
        <div className="absolute top-0 flex items-center justify-between">
          <div>
            <p className="px-2 mt-1 text-sm text-gray-100 capitalize">
              {post && post?.name}
            </p>
            <p className="px-2 text-sm text-gray-100">
              {post && moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-2">
          {post &&
            post?.tags.map((data, index) => {
              return (
                <p
                  key={index}
                  className="inline px-2 mx-1 mb-2 text-xs text-white bg-gray-400 rounded-full"
                >
                  #{data}
                </p>
              );
            })}
        </div>
        <h2 className="px-2 mt-1 mb-2 text-xl font-semibold capitalize truncate ...">
          {post && post?.title}
        </h2>
        <div
          style={{ textOverflow: "ellipsis", height: 49 }}
          className="px-2 overflow-hidden"
        >
          <p className="text-xs text-gray-500">{post && post?.body}</p>
        </div>
        <div className="flex items-center justify-end px-2 pt-3">
          <p className="mr-auto text-sm" style={{ color: "#4267B2" }}>
            {user ? (
              <ThumbUpAltOutlinedIcon
                onClick={() => handleLike(post._id)}
                style={{
                  color: "#4267B2",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                fontSize="small"
              ></ThumbUpAltOutlinedIcon>
            ) : (
              <ThumbUpAltOutlinedIcon
                style={{
                  color: "lightgray",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                fontSize="small"
              ></ThumbUpAltOutlinedIcon>
            )}
            <Likes></Likes>
          </p>
          {(user?.profile?.googleId === post?.creator ||
            user?.user?._id === post?.creator) && (
            <>
              <EditIcon
                onClick={() => {
                  dispatch({ type: "SET_CURRENT_POST", value: post._id });
                  history.push(`/create/${post?._id}`);
                }}
                style={{ color: "#4267B2", cursor: "pointer", marginRight: '10px' }}
              ></EditIcon>
              <DeleteIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => deletePost(post._id)}
              ></DeleteIcon>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
