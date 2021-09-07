import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../elements";

import decode from "jwt-decode";

import LockOpenIcon from "@material-ui/icons/LockOpen";

const Navbar = ({ setShowAuth, user, setUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const HEIGHT = showMenu ? 75 : 0;

  const handleClickOutside = (e) => {
    if (menuRef?.current && !menuRef?.current?.contains?.(e.target)) {
      setShowMenu(false);
    }
  };

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    setShowMenu(false);
    history.push("/");
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 10000 < new Date().getTime()) {
        handleLogOut();
      }
    }
  }, [user?.token]);

  return (
    <header
      className="relative bg-white border-b border-gray-200 border-solid shadow-lg"
      style={{ height: 70 }}
    >
      <div className="container flex items-center justify-between h-full px-5 mx-auto md:px-20">
        <div>
          <Link to="/" className="inline mr-5 text-xl font-bold brand-yellow">
            Blog Project
          </Link>
        </div>
        <div className="relative flex items-center ml-10">
          {user ? (
            <>
              <p className="mr-2 text-sm font-semibold text-gray-900 truncate ...">
                {user?.profile?.name
                  ? user?.profile?.name
                  : user?.user?.username}
              </p>{" "}
              <div
                className="overflow-hidden bg-white border border-white border-solid rounded-full"
                style={{ width: 30, height: 30, cursor: "pointer" }}
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                ref={menuRef}
              >
                <div
                  className="overflow-hidden bg-blue-400 rounded-full"
                  style={{ height: 30, width: 30 }}
                >
                  {user?.profile?.imageUrl ? (
                    <img
                      src={user?.profile?.imageUrl}
                      className="block object-cover w-full"
                      alt="profile"
                    />
                  ) : (
                    <div className="text-lg text-center text-white">
                      {user?.user?.username?.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <LockOpenIcon
              onClick={() => {
                dispatch({ type: "SET_ERROR", value: null });
                setShowAuth(true);
              }}
              fontSize="large"
              style={{
                color: "#4267B2",
                cursor: "pointer",
              }}
            ></LockOpenIcon>

            // <Button
            //   label="Login"
            //   login
            //   onClick={() => {
            //     dispatch({ type: "SET_ERROR", value: null });
            //     setShowAuth(true);
            //   }}
            // ></Button>
          )}
        </div>
        <div
          className="absolute z-20 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg right-28 top-16"
          style={{
            height: HEIGHT,
            width: 200,
            border: showMenu ? "1px solid lightgray" : "",
            padding: showMenu ? "10px" : 0,
          }}
        >
          <Link
            to="/create"
            className="py-2 text-sm text-black hover:underline"
            style={{ cursor: "pointer" }}
          >
            Create Post
          </Link>
          <p
            className="py-2 text-sm text-black hover:underline"
            style={{ cursor: "pointer" }}
            onClick={() => handleLogOut()}
          >
            SignOut
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
