import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function AddRestaurant({
  restaurant,
  setRestaurant,
  add,
  alertMessage,
  cities,
}) {
  return (
    <Form className="form">
      <h2 className="form-title">Додати ресторан</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва ресторану"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) =>
            setRestaurant({ ...restaurant, restaurant_name: e.target.value })
          }
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Адреса ресторану"
        className="mb-3"
      >
        <Form.Control
          type="text"
          defaultValue=""
          onChange={(e) =>
            setRestaurant({ ...restaurant, restaurant_address: e.target.value })
          }
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Місто" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setRestaurant({ ...restaurant, city: parseInt(e.target.value) })
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
          onChange={(e) =>
            setRestaurant({ ...restaurant, link: e.target.value })
          }
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

export default AddRestaurant;
