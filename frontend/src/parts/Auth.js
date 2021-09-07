import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputText, Button } from "../elements";

import { GoogleLogin } from "react-google-login";
import { signIn, signUp } from "../redux/action/authAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({ setShowAuth, isSignIn, setIsSignIn }) => {
  const { authBody, error, isLoading } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    dispatch({ type: "SET_LOADING", value: true });
    e.preventDefault();

    const data = {
      username: authBody.username,
      email: authBody.email,
      password: authBody.password,
      confirm: authBody.confirm,
    };

    if (!isSignIn) {
      const data = {
        email: authBody.email,
        password: authBody.password,
      };
      dispatch(signIn(data, setShowAuth));
    } else {
      dispatch(signUp(data, notify));
    }

    dispatch({ type: "SET_AUTH_CLEAR" });
  };

  const handleAuthBody = (e) => {
    dispatch({
      type: "SET_AUTH_BODY",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const googleSuccess = async (res) => {
    try {
      const data = {
        profile: res?.profileObj,
        token: res?.tokenId,
      };

      dispatch({ type: "SET_AUTH_PROFILE", value: data });
      setShowAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  const googleError = (err) => console.log(err);

  const notify = () =>
    toast.success("Register Success, Please Login!!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="relative w-4/5 bg-white rounded-lg shadow-lg md:w-1/3">
      <h2 className="pt-5 text-xl font-semibold text-center">
        {!isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      <form className="p-5">
        {isSignIn && (
          <InputText
            placeholder="Username"
            value={authBody.username}
            onChange={(e) => handleAuthBody(e)}
            name="username"
            type="text"
          ></InputText>
        )}
        <InputText
          placeholder="Email"
          name="email"
          type="text"
          value={authBody.email}
          onChange={(e) => handleAuthBody(e)}
        ></InputText>
        <InputText
          placeholder="Password"
          value={authBody.password}
          onChange={(e) => handleAuthBody(e)}
          name="password"
          type="password"
        ></InputText>
        {isSignIn && (
          <InputText
            placeholder="Confirm Password"
            value={authBody.confirm}
            onChange={(e) => handleAuthBody(e)}
            name="confirm"
            type="password"
          ></InputText>
        )}
        {error && (
          <p className="mb-5 text-sm text-red-500 capitalize">{error}</p>
        )}
        <Button
          label={
            isSignIn
              ? isLoading
                ? "Loading..."
                : "Sign up"
              : isLoading
              ? "Loading..."
              : "Sign In"
          }
          onClick={(e) => handleLogin(e)}
          auth
        ></Button>
      </form>
      <div className="px-5 pb-5">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <button
              className="w-full px-3 py-2 text-white bg-blue-500 rounded-md text-md hover:bg-blue-400"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign in With Google
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />
        <p
          className="mt-3 text-sm text-center text-gray-400 hover:underline"
          style={{ cursor: "pointer" }}
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn
            ? "Alerady have an account? Sign In"
            : "Don't have an Account? Sign Up"}
        </p>
      </div>

      <div
        onClick={() => {
          setShowAuth(false);
          dispatch({ type: "SET_AUTH_CLEAR" });
        }}
        className="absolute top-0 right-0 px-2 text-white bg-black rounded-full opacity-50"
        style={{ cursor: "pointer" }}
      >
        x
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default Auth;
