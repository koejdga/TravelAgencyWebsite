import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function EditCountry({ country, setCountry, edit }) {
  return (
    <Form className="form">
      <h2 className="form-title">Редагувати країну</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва країни"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={country.country_name || ""}
          onChange={(e) =>
            setCountry({ ...country, country_name: e.target.value })
          }
        />
      </FloatingLabel>

      <Button
        variant="primary"
        type="button"
        className="form-button"
        onClick={edit}
      >
        Редагувати
      </Button>
    </Form>
  );
}

export default EditCountry;
