import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {showSpinner && <Spinner animation="border" variant="secondary" />}
    </div>
  );
}

export default Loading;
