import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const InputFile = ({ onChange }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [fileName, setFilename] = useState("");

  function getFileName(e) {
    setFilename(e.target.files[0].name);
    dispatch({type: 'SET_IMAGE_PREVIEW', value: e.target.files[0]})

    onChange({
      target: {
        name: e.target.name,
        value: e.target.files,
      },
    });
  }
  return (
    <>
      <input
        type="text"
        placeholder="Upload Image"
        defaultValue={fileName}
        className="w-full px-4 py-2 mb-5 border border-gray-300 border-solid rounded-lg focus:outline-none"
        style={{ cursor: "pointer" }}
        onClick={() => inputRef.current.click()}
      />

      <input
        type="file"
        name="image"
        className="hidden"
        onChange={getFileName}
        ref={inputRef}
      />
    </>
  );
};

export default InputFile;
