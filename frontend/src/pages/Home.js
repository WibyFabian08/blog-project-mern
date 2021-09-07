import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Navbar, Footer, Post, Auth } from "../parts";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import {
  deletePostAction,
  getPosts,
  likePost,
  getPostBySearch,
} from "../redux/action/postAction";

const Home = () => {
  const { posts } = useSelector((state) => state.postState);
  const dispatch = useDispatch();
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    title: "",
    tags: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  const handleChangeQuery = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    dispatch(getPostBySearch(searchQuery));
  };

  const handleClearSearch = () => {
    setSearchQuery({
      ...searchQuery,
      title: "",
      tags: "",
    });

    dispatch(getPosts(currentPage, perPage));
  };

  const deletePost = (id) => {
    dispatch(deletePostAction(id, confirmAlert));
  };

  const handleLike = (id) => {
    dispatch(likePost(id, currentPage, perPage));
  };

  useEffect(() => {
    window.scrollTo({
      top: 180,
      behavior: "smooth",
    });

    dispatch(getPosts(currentPage, perPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [showAuth]);

  return (
    <div className="relative overflow-hidden">
      <Navbar
        setShowAuth={setShowAuth}
        showAuth={showAuth}
        user={user}
        setUser={setUser}
        searchQuery={searchQuery}
        handleChangeQuery={handleChangeQuery}
      ></Navbar>
      <div className="container px-5 mx-auto md:px-20">
        <div className="mt-10">
          <input
            type="text"
            name="title"
            value={searchQuery?.title}
            onChange={(e) => handleChangeQuery(e)}
            placeholder="Search Title..."
            className="inline px-4 py-2 mb-5 mr-5 border border-gray-300 border-solid rounded-lg focus:outline-none md:mb-0"
          />
          <input
            type="text"
            name="tags"
            value={searchQuery?.tags}
            onChange={(e) => handleChangeQuery(e)}
            placeholder="Search Tags..."
            className="px-4 py-2 mr-5 border border-gray-300 border-solid rounded-lg focus:outline-none"
          />
          <div className="flex items-center">
            {(searchQuery.title !== "" || searchQuery.tags !== "") && (
              <>
                <button
                  className="block px-4 py-2 mt-5 mr-2 text-white transition-all duration-200 bg-blue-500 rounded-md text-md hover:bg-blue-400"
                  onClick={() => handleSearch()}
                >
                  Search
                </button>
                <button
                  className="block px-4 py-2 mt-5 text-white transition-all duration-200 bg-red-500 rounded-md text-md hover:bg-red-400"
                  onClick={() => handleClearSearch()}
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
        <h2 className="mt-10 text-4xl font-bold text-center">All Post</h2>
        <div className="flex flex-wrap items-center py-5">
          {posts?.post?.length > 0 ? (
            posts.post.map((post) => {
              return (
                <Post
                  key={post._id}
                  post={post}
                  currentPage={currentPage}
                  perPage={perPage}
                  deletePost={deletePost}
                  handleLike={handleLike}
                  user={user}
                ></Post>
              );
            })
          ) : (
            <div className="w-full">
              <h2 className="text-xl text-center text-gray-400">No Post Yet</h2>
            </div>
          )}
        </div>
        {/* pagination */}
        {posts?.totalPage > 1 && (
          <div className="flex items-center justify-center pb-10">
            <ArrowBackIosIcon
              fontSize="large"
              style={{
                color: "#4267B2",
                cursor: "pointer",
                display: currentPage >= 2 ? "block" : "none",
              }}
              onClick={() => setCurrentPage(currentPage - 1)}
            ></ArrowBackIosIcon>
            <p className="font-semibold">{`${currentPage}  /  ${posts?.totalPage}`}</p>
            <ArrowForwardIosIcon
              fontSize="large"
              style={{
                color: "#4267B2",
                cursor: "pointer",
                marginLeft: "10px",
                display: posts?.totalPage > currentPage ? "block" : "none",
              }}
              onClick={() => setCurrentPage(currentPage + 1)}
            ></ArrowForwardIosIcon>
          </div>
        )}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center h-screen transition-all duration-300"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            transform: showAuth ? "scale(1)" : "scale(0)",
          }}
        >
          <Auth
            setShowAuth={setShowAuth}
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
          ></Auth>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
