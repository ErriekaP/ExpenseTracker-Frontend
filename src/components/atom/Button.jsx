import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-md border-0 m-1 font-normal">
      {children}
    </button>
  );
};

export default Button;
