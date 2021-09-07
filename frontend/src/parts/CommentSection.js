import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../redux/action/postAction";

const CommentSection = ({ post, user }) => {
  const dispatch = useDispatch();
  const [commentBody, setCommentBody] = useState("");

  const handleComment = (id) => {
    const data = {
      name: user?.profile?.name ? user?.profile?.name : user?.user?.username,
      body: commentBody,
      id,
    };

    dispatch(commentPost(id, data));

    setCommentBody("");
  };

  return (
    <div
      className="flex flex-wrap w-full mt-5 overflow-hidden"
      style={{ height: 200 }}
    >
      <div className="w-1/2 h-full px-5 overflow-y-auto">
        {post?.comments.length > 0 ? (
          post?.comments?.map((data, index) => {
            return (
              <div className="mb-3" key={index}>
                <p className="mb-1 text-sm font-semibold truncate ...">
                  {data?.name}
                </p>
                <p className="text-xs text-justify text-gray-500 font-regular">
                  {data?.body}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-gray-400">No Comment Yet</div>
        )}
      </div>
      {user && (
        <div className="w-1/2 px-5">
          <textarea
            placeholder="Type your comment here..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 border-solid rounded-lg focus:outline-none"
          ></textarea>
          {commentBody !== "" && (
            <button
              className="w-full py-1 text-white transition-all duration-300 bg-green-500 rounded-lg hover:bg-green-400"
              onClick={() => handleComment(post?._id)}
            >
              Comment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
