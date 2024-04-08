import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function EditHotel({ hotel, setHotel, edit, alertMessage, cities }) {
  return (
    <Form className="form">
      <h2 className="form-title">Редагувати готель</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва готелю"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={hotel.hotel_name || ""}
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
          value={hotel.hotel_address || ""}
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
          value={hotel.link || ""}
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
        onClick={edit}
      >
        Редагувати
      </Button>
    </Form>
  );
}

export default EditHotel;
