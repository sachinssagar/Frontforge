import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <BootstrapSpinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;
