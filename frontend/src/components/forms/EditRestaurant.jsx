import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function EditRestaurant({
  restaurant,
  setRestaurant,
  edit,
  alertMessage,
  cities,
}) {
  return (
    <Form className="form">
      <h2 className="form-title">Редагувати ресторан</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва ресторану"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={restaurant.restaurant_name || ""}
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
          value={restaurant.restaurant_address || ""}
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
          value={restaurant.link || ""}
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
        onClick={edit}
      >
        Редагувати
      </Button>
    </Form>
  );
}

export default EditRestaurant;
