import React, { useEffect, useState } from "react";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import EditCitiesPageUI from "../components/EditCitiesPageUI";
import { axiosClient } from "./config";

function EditCitiesPage() {
  const CITIES_ROUTE = "/cities";
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cityToAdd, setCityToAdd] = useState({});
  const [cityToEdit, setCityToEdit] = useState({});
  const [cityIdToEdit, setCityIdToEdit] = useState("");

  const [cityAddAlertMessage, setCityAddAlertMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await axiosClient.get(CITIES_ROUTE);
        const countriesResponse = await axiosClient.get("/countries");
        setCities(citiesResponse.data.results);
        setCountries(countriesResponse.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addCity = async () => {
    try {
      const response = await axiosClient.post(CITIES_ROUTE, cityToAdd);
      setCities([...cities, response.data.newObject]);
    } catch (error) {
      setCityAddAlertMessage(error);
    }
  };

  const editCity = async () => {
    try {
      await axiosClient.put(CITIES_ROUTE + "/" + cityIdToEdit, cityToEdit);
      const updatedData = cities.map((item) =>
        item.id === cityIdToEdit ? cityToEdit : item
      );
      setCities(updatedData);
    } catch (error) {
      setCityAddAlertMessage(error);
    }
  };

  const deleteCity = async () => {
    try {
      await axiosClient.delete(CITIES_ROUTE + "/" + cityIdToEdit);
      setCities(cities.filter((item) => item.id !== cityIdToEdit));
    } catch (error) {
      setCityAddAlertMessage(error);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  return (
    <EditCitiesPageUI
      cityToAdd={cityToAdd}
      setCityToAdd={setCityToAdd}
      addCity={addCity}
      editCity={editCity}
      deleteCity={deleteCity}
      cityAddAlertMessage={cityAddAlertMessage}
      countries={countries}
      cities={cities}
      cityToEdit={cityToEdit}
      setCityToEdit={setCityToEdit}
      setCityIdToEdit={setCityIdToEdit}
    />
  );
}

export default EditCitiesPage;
