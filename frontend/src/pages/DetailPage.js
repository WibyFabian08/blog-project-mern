import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import moment from "moment";

import { CommentSection, Navbar } from "../parts";
import { useDispatch } from "react-redux";
import {
  getPost,
  getPostBySearch,
} from "../redux/action/postAction";
import { useSelector } from "react-redux";

const DetailPage = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { posts, post } = useSelector((state) => state.postState);

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    title: "none",
    tags: "",
  });

  let recomend = posts?.post?.filter(
    (recomendPost) => recomendPost?._id !== post?._id
  );

  const handleDetail = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    history.push(`/detail/${id}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setUser(JSON.parse(localStorage.getItem("user")));

    dispatch(getPost(match.params.id, setSearchQuery, searchQuery));
  }, [match.params.id, dispatch]);

  useEffect(() => {
    dispatch(getPostBySearch(searchQuery));
  }, [dispatch, searchQuery]);

  if (!post) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <Navbar user={user} setUser={setUser}></Navbar>
      <div
        className="mx-auto mb-10 bg-white rounded-lg shadow-lg"
        style={{ width: "85%" }}
      >
        <div className="container flex flex-wrap w-full mx-auto my-10">
          <div className="w-3/5 p-5">
            <h2 className="mb-3 text-3xl font-regular">{post?.title}</h2>
            <div className="flex flex-wrap items-center w-full mb-3">
              {post?.tags &&
                post?.tags.map((tag) => {
                  return (
                    <p key={tag} className="mr-3 text-sm text-gray-400">
                      #{tag}
                    </p>
                  );
                })}
            </div>
            <p className="mb-3 text-sm">{post?.body}</p>
            <h2 className="mb-3 text-xl">Created By : {post?.name}</h2>
            <p className="mb-3 text-sm text-gray-400">
              {post?.likes?.length < 2
                ? `Like ${post?.likes?.length}`
                : `Likes ${post?.likes?.length}`}
            </p>
            <p className="mb-3 text-sm text-gray-400">
              {post && moment(post?.createdAt).fromNow()}
            </p>
            <h2 className="text-xl">Comments</h2>
            <div className="w-full mt-3 border-b border-gray-300 border-solid"></div>
            <CommentSection post={post} user={user}></CommentSection>
            <div className="w-full mt-5 border-b border-gray-300 border-solid"></div>
          </div>
          <div className="w-2/5 overflow-hidden rounded-lg">
            <img
              src={post ? `${process.env.REACT_APP_URL}/${post?.image}` : ""}
              className="object-cover w-full h-full post-image"
              alt="detail"
            />
          </div>
        </div>
        {recomend?.length > 0 && (
          <div className="px-5">
            <h2 className="text-xl">You might also like : </h2>
            <div className="w-full mt-3 border-b border-gray-300 border-solid"></div>
          </div>
        )}
        <div className="flex flex-wrap items-center w-full p-5">
          {recomend?.length > 0 &&
            recomend?.map((data) => {
              return (
                <div className="w-4/12 mx-5 bg-white" key={data?._id}>
                  <p className="mb-3 text-lg font-semibold">{data?.title}</p>
                  <p className="mb-3 mr-3 text-sm text-gray-500">
                    {data?.name}
                  </p>
                  <p className="mb-3 text-sm text-gray-500">{data?.body}</p>
                  <p className="mb-3 text-sm text-gray-500">
                    Like {data?.likes.length}
                  </p>
                  <img
                    src={
                      data ? `${process.env.REACT_APP_URL}/${data?.image}` : ""
                    }
                    className="object-cover w-full h-full rounded-lg post-image"
                    alt="detail"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetail(data?._id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
