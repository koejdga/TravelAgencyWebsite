import React, { useEffect, useState } from "react";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import EditTripsPageUI from "../components/EditTripsPageUI";
import { axiosClient } from "./config";

function EditTripsPage() {
  const TRIPS_ROUTE = "/trips";
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tripToAdd, setTripToAdd] = useState({});
  const [tripToEdit, setTripToEdit] = useState({});
  const [tripIdToEdit, setTripIdToEdit] = useState("");

  const [tripAddAlertMessage, setTripAddAlertMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsResponse = await axiosClient.get(TRIPS_ROUTE);
        const hotelsResponse = await axiosClient.get("/hotels");
        const restaurantsResponse = await axiosClient.get("/restaurants");
        const citiesResponse = await axiosClient.get("/cities");

        setTrips(tripsResponse.data.results);
        setHotels(hotelsResponse.data.results);
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

  const addTrip = async () => {
    try {
      const response = await axiosClient.post(TRIPS_ROUTE, tripToAdd);
      setTrips([...trips, response.data.newObject]);
    } catch (error) {
      setTripAddAlertMessage(error);
    }
  };

  const editTrip = async () => {
    try {
      await axiosClient.put(TRIPS_ROUTE + "/" + tripIdToEdit, tripToEdit);
      const updatedData = trips.map((item) =>
        item.id === tripIdToEdit ? tripToEdit : item
      );
      setTrips(updatedData);
    } catch (error) {
      setTripAddAlertMessage(error);
    }
  };

  const deleteTrip = async () => {
    try {
      await axiosClient.delete(TRIPS_ROUTE + "/" + tripIdToEdit);
      setTrips(trips.filter((item) => item.id !== tripIdToEdit));
    } catch (error) {
      setTripAddAlertMessage(error);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  return (
    <EditTripsPageUI
      tripToAdd={tripToAdd}
      setTripToAdd={setTripToAdd}
      addTrip={addTrip}
      editTrip={editTrip}
      deleteTrip={deleteTrip}
      tripAddAlertMessage={tripAddAlertMessage}
      trips={trips}
      hotels={hotels}
      restaurants={restaurants}
      cities={cities}
      tripToEdit={tripToEdit}
      setTripToEdit={setTripToEdit}
      setTripIdToEdit={setTripIdToEdit}
    />
  );
}

export default EditTripsPage;
