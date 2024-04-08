import React, { useEffect, useState } from "react";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import EditRestaurantsPageUI from "../components/EditRestaurantsPageUI";
import { axiosClient } from "./config";

function EditRestaurantsPage() {
  const RESTAURANTS_ROUTE = "/restaurants";
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [restaurantToAdd, setRestaurantToAdd] = useState({});
  const [restaurantToEdit, setRestaurantToEdit] = useState({});
  const [restaurantIdToEdit, setRestaurantIdToEdit] = useState("");

  const [restaurantAddAlertMessage, setRestaurantAddAlertMessage] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantsResponse = await axiosClient.get(RESTAURANTS_ROUTE);
        const citiesResponse = await axiosClient.get("/cities");
        setRestaurants(restaurantsResponse.data.results);
        setCities(citiesResponse.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addRestaurant = async () => {
    try {
      const response = await axiosClient.post(
        RESTAURANTS_ROUTE,
        restaurantToAdd
      );
      setRestaurants([...restaurants, response.data.newObject]);
    } catch (error) {
      setRestaurantAddAlertMessage(error);
    }
  };

  const editRestaurant = async () => {
    try {
      await axiosClient.put(
        RESTAURANTS_ROUTE + "/" + restaurantIdToEdit,
        restaurantToEdit
      );
      const updatedData = restaurants.map((item) =>
        item.id === restaurantIdToEdit ? restaurantToEdit : item
      );
      setRestaurants(updatedData);
    } catch (error) {
      setRestaurantAddAlertMessage(error);
    }
  };

  const deleteRestaurant = async () => {
    try {
      await axiosClient.delete(RESTAURANTS_ROUTE + "/" + restaurantIdToEdit);
      setRestaurants(
        restaurants.filter((item) => item.id !== restaurantIdToEdit)
      );
    } catch (error) {
      setRestaurantAddAlertMessage(error);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  return (
    <EditRestaurantsPageUI
      restaurantToAdd={restaurantToAdd}
      setRestaurantToAdd={setRestaurantToAdd}
      addRestaurant={addRestaurant}
      editRestaurant={editRestaurant}
      deleteRestaurant={deleteRestaurant}
      restaurantAddAlertMessage={restaurantAddAlertMessage}
      restaurants={restaurants}
      cities={cities}
      restaurantToEdit={restaurantToEdit}
      setRestaurantToEdit={setRestaurantToEdit}
      setRestaurantIdToEdit={setRestaurantIdToEdit}
    />
  );
}

export default EditRestaurantsPage;
