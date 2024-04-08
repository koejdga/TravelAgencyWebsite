import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function AddHotel({ hotel, setHotel, add, alertMessage, cities }) {
  return (
    <Form className="form">
      <h2 className="form-title">Додати готель</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва готелю"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) => setHotel({ ...hotel, hotel_name: e.target.value })}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Адреса готелю"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) =>
            setHotel({ ...hotel, hotel_address: e.target.value })
          }
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Місто" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setHotel({ ...hotel, city: parseInt(e.target.value) })
          }
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Посилання"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) => setHotel({ ...hotel, link: e.target.value })}
        />
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

export default AddHotel;
