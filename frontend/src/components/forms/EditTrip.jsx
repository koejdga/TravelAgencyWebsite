import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function EditRestaurant({
  trip,
  setTrip,
  edit,
  alertMessage,
  restaurants,
  hotels,
  cities,
}) {
  return (
    <Form className="form">
      <h2 className="form-title">Редагувати поїздку</h2>

      <FloatingLabel
        controlId="floatingInput"
        label="Назва поїздки"
        className="mb-3"
      >
        <Form.Control
          type="text"
          value={trip.trip_name || ""}
          onChange={(e) => setTrip({ ...trip, trip_name: e.target.value })}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Опис" className="mb-3">
        <Form.Control
          type="text"
          value={trip.trip_description || ""}
          onChange={(e) =>
            setTrip({ ...trip, trip_description: e.target.value })
          }
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Ціна" className="mb-3">
        <Form.Control
          type="number"
          value={trip.price || ""}
          onChange={(e) =>
            setTrip({ ...trip, price: parseInt(e.target.value) })
          }
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Знижка" className="mb-3">
        <Form.Control
          type="number"
          value={trip.sale || ""}
          onChange={(e) =>
            setTrip({ ...trip, sale: parseFloat(e.target.value) })
          }
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Місто" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setTrip({ ...trip, city: parseInt(e.target.value) })}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Готель" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setTrip({ ...trip, hotel: parseInt(e.target.value) })
          }
        >
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.hotel_name}, {hotel.hotel_address}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Ресторан"
        className="mb-3"
      >
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setTrip({ ...trip, restaurant: parseInt(e.target.value) })
          }
        >
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.restaurant_name}, {restaurant.restaurant_address}
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

export default EditRestaurant;
