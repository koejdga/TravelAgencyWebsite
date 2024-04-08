import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function AddCity({ city, setCity, add, alertMessage, countries }) {
  return (
    <Form className="form">
      <h2 className="form-title">Додати місто</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва міста"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) => setCity({ ...city, city_name: e.target.value })}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Країна" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setCity({ ...city, country: parseInt(e.target.value) })
          }
        >
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {alertMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{alertMessage}</p>
      )}

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

export default AddCity;
