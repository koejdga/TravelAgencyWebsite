import React, { useEffect, useState } from "react";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import EditHotelsPageUI from "../components/EditHotelsPageUI";
import { axiosClient } from "./config";

function EditHotelsPage() {
  const HOTELS_ROUTE = "/hotels";
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hotelToAdd, setHotelToAdd] = useState({});
  const [hotelToEdit, setHotelToEdit] = useState({});
  const [hotelIdToEdit, setHotelIdToEdit] = useState("");

  const [hotelAddAlertMessage, setHotelAddAlertMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelsResponse = await axiosClient.get(HOTELS_ROUTE);
        const citiesResponse = await axiosClient.get("/cities");
        setHotels(hotelsResponse.data.results);
        setCities(citiesResponse.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addHotel = async () => {
    try {
      const response = await axiosClient.post(HOTELS_ROUTE, hotelToAdd);
      setHotels([...hotels, response.data.newObject]);
    } catch (error) {
      setHotelAddAlertMessage(error);
    }
  };

  const editHotel = async () => {
    try {
      await axiosClient.put(HOTELS_ROUTE + "/" + hotelIdToEdit, hotelToEdit);
      const updatedData = hotels.map((item) =>
        item.id === hotelIdToEdit ? hotelToEdit : item
      );
      setHotels(updatedData);
    } catch (error) {
      setHotelAddAlertMessage(error);
    }
  };

  const deleteHotel = async () => {
    try {
      await axiosClient.delete(HOTELS_ROUTE + "/" + hotelIdToEdit);
      setHotels(hotels.filter((item) => item.id !== hotelIdToEdit));
    } catch (error) {
      setHotelAddAlertMessage(error);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  return (
    <EditHotelsPageUI
      hotelToAdd={hotelToAdd}
      setHotelToAdd={setHotelToAdd}
      addHotel={addHotel}
      editHotel={editHotel}
      deleteHotel={deleteHotel}
      hotelAddAlertMessage={hotelAddAlertMessage}
      hotels={hotels}
      cities={cities}
      hotelToEdit={hotelToEdit}
      setHotelToEdit={setHotelToEdit}
      setHotelIdToEdit={setHotelIdToEdit}
    />
  );
}

export default EditHotelsPage;
