import React from "react";

const Footer = () => {
  return (
    <div
      className="bg-black flex flex-col items-center justify-center"
      style={{ height: 464 }}
    >
      <h2 className="text-white font-bold text-3xl">Blog Project</h2>
      <p className="text-white text-center mt-5">
        Blog project adalah sebuah blog yang dibangun dengan teknologi MERN{" "}
        <br />
        Stack, dibangun untuk proses latihan dalam memperdalam ilmu FullStack{" "}
        <br />
        Javascript. Teknologi yang digunakan tentu saja MongoDB sebagai
        database, <br />
        Express sebagai Node JS Framework, <br /> React sebagai frontend dan Node JS
        sebagai server.
      </p>
    </div>
  );
};

export default Footer;
