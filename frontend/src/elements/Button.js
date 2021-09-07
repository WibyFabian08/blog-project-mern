import React from "react";

const Button = ({
  label,
  del,
  edit,
  post,
  type,
  onClick,
  auth,
  google,
  login,
}) => {
  if (login) {
    return (
      <button
        className="px-4 py-2 ml-2 text-white transition-all duration-200 bg-blue-500 rounded-md text-md hover:bg-blue-400"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  if (google) {
    return (
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-blue-500 rounded-md text-md hover:bg-blue-400"
      >
        {label}
      </button>
    );
  }

  if (auth) {
    return (
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-green-500 rounded-md text-md hover:bg-green-400"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  if (post) {
    return (
      <button
        type="submit"
        className="px-3 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-400"
      >
        {label}
      </button>
    );
  }
  if (edit) {
    return (
      <button
        className="px-3 py-1 ml-2 text-sm text-white transition-all duration-200 bg-blue-500 rounded-md hover:bg-blue-400"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  if (del) {
    return (
      <button
        className="px-3 py-1 text-sm text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-400"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  return (
    <button className="px-3 py-1 text-sm text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-400">
      {label}
    </button>
  );
};

export default Button;
