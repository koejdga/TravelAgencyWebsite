import React, { useEffect, useState } from "react";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import EditCountriesPageUI from "../components/EditCountriesPageUI";
import { axiosClient } from "./config";

function EditCountriesPage() {
  const COUNTRIES_ROUTE = "/countries";
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [countryToAdd, setCountryToAdd] = useState({});
  const [countryToEdit, setCountryToEdit] = useState({});
  const [countryIdToEdit, setCountryIdToEdit] = useState("");

  const [countryAddAlertMessage, setCountryAddAlertMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axiosClient.get(COUNTRIES_ROUTE);
        setCountries(countriesResponse.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addCountry = async () => {
    try {
      const response = await axiosClient.post(COUNTRIES_ROUTE, countryToAdd);
      setCountries([...countries, response.data.newObject]);
    } catch (error) {
      setCountryAddAlertMessage(error);
    }
  };

  const editCountry = async () => {
    try {
      console.log("here");
      const res = await axiosClient.put(
        COUNTRIES_ROUTE + "/" + countryIdToEdit,
        countryToEdit
      );
      console.log(res);
      const updatedData = countries.map((item) =>
        item.id === countryIdToEdit ? countryToEdit : item
      );
      setCountries(updatedData);
    } catch (error) {
      setCountryAddAlertMessage(error);
    }
  };

  const deleteCountry = async () => {
    try {
      await axiosClient.delete(COUNTRIES_ROUTE + "/" + countryIdToEdit);
      setCountries(countries.filter((item) => item.id !== countryIdToEdit));
    } catch (error) {
      setCountryAddAlertMessage(error);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  return (
    <EditCountriesPageUI
      countryToAdd={countryToAdd}
      setCountryToAdd={setCountryToAdd}
      addCountry={addCountry}
      editCountry={editCountry}
      deleteCountry={deleteCountry}
      countryAddAlertMessage={countryAddAlertMessage}
      countries={countries}
      countryToEdit={countryToEdit}
      setCountryToEdit={setCountryToEdit}
      setCountryIdToEdit={setCountryIdToEdit}
    />
  );
}

export default EditCountriesPage;
