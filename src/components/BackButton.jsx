import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      className="d-flex align-items-center my-4"
      style={{ cursor: "pointer" }}
      onClick={goBack}
    >
      <BsArrowLeft
        className="text-white bg-primary rounded-pill p-2 me-2"
        style={{ fontSize: "1.5rem" }}
      />
      <span className="text-white fw-bold" style={{ fontSize: "1.2rem" }}>
        Back
      </span>
    </div>
  );
};

export default BackButton;
