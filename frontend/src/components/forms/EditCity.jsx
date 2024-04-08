import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function EditCity({ city, setCity, edit, alertMessage, countries }) {
  return (
    <Form className="form">
      <h2 className="form-title">Редагувати місто</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва міста"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={city.city_name || ""}
          onChange={(e) => setCity({ ...city, city_name: e.target.value })}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Країна" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          value={city.country || ""}
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
        onClick={edit}
      >
        Редагувати
      </Button>
    </Form>
  );
}

export default EditCity;
