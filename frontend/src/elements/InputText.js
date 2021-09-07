import React from "react";

const InputText = ({type, name, placeholder, value, onChange}) => {
  return (
    <div className="w-full mb-5">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 border-solid rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default InputText;
