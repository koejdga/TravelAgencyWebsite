import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function AddCountry({ country, setCountry, add }) {
  return (
    <Form className="form">
      <h2 className="form-title">Додати країну</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва країни"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) =>
            setCountry({ ...country, country_name: e.target.value })
          }
        />
      </FloatingLabel>

      <Button
        variant="primary"
        type="button"
        className="form-button"
        onClick={add}
      >
        Додати
      </Button>
    </Form>
  );
}

export default AddCountry;
