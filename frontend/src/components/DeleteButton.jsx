import React from "react";
import Button from "react-bootstrap/Button";

function DeleteButton({ deleteItem }) {
  return (
    <Button
      variant="danger"
      type="button"
      className="form-button"
      onClick={deleteItem}
    >
      Видалити
    </Button>
  );
}

export default DeleteButton;
