import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import EditCitiesPageUI from "../components/EditCitiesPageUI";

// #region graphql queries
const GET_CITIES = gql`
  query GetCities {
    cities {
      id
      city_name
      country
    }
    countries {
      id
      country_name
    }
  }
`;

const ADD_CITY = gql`
  mutation AddCity($input: CityInput) {
    addCity(input: $input) {
      affectedRows
    }
  }
`;

const EDIT_CITY = gql`
  mutation EditCity($updateCityId: ID!, $input: CityInput) {
    updateCity(id: $updateCityId, input: $input) {
      affectedRows
    }
  }
`;

const DELETE_CITY = gql`
  mutation DeleteCity($deleteCityId: ID!) {
    deleteCity(id: $deleteCityId) {
      affectedRows
    }
  }
`;

const CITY_ADDED_SUB = gql`
  subscription CityAdded {
    cityAdded {
      id
      city_name
      country
    }
  }
`;

const CITY_EDITED_SUB = gql`
  subscription CityEdited {
    cityEdited {
      id
      city_name
      country
    }
  }
`;

const CITY_DELETED_SUB = gql`
  subscription CityDeleted {
    cityDeleted
  }
`;
// #endregion

function EditCitiesPage() {
  const { loading, error, data } = useQuery(GET_CITIES);
  const [cities, setCities] = useState([]);

  const [cityToAdd, setCityToAdd] = useState({});
  const [cityToEdit, setCityToEdit] = useState({});
  const [cityIdToEdit, setCityIdToEdit] = useState("");

  const addCitySub = useSubscription(CITY_ADDED_SUB);
  const editCitySub = useSubscription(CITY_EDITED_SUB);
  const deleteCitySub = useSubscription(CITY_DELETED_SUB);
  // data = {countryAdded: {id: 62, country_name: "sub6", __typename: "Country"}}

  const [cityAddAlertMessage, setCityAddAlertMessage] = useState(null);

  const objectForEditting = () => {
    const { __typename, id, ...input } = cityToEdit;
    return input;
  };

  const [addCity] = useMutation(ADD_CITY, {
    variables: {
      input: cityToAdd,
    },
    onCompleted: () => {
      console.log("added");
      setCityAddAlertMessage(null);
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
      if (error.message.includes("was not provided")) {
        setCityAddAlertMessage("Введіть всі поля");
      }
    },
  });

  const [editCity] = useMutation(EDIT_CITY, {
    variables: {
      updateCityId: cityIdToEdit,
      input: objectForEditting(),
    },
    onCompleted: () => {
      console.log("edited");
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
    },
  });

  const [deleteCity] = useMutation(DELETE_CITY, {
    variables: {
      deleteCityId: cityIdToEdit,
    },
    onCompleted: () => {
      console.log("deleted");
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
    },
  });

  useEffect(() => {
    if (addCitySub.data !== undefined) {
      console.log("it worked! (adding)");
      setCities([...cities, addCitySub.data.cityAdded]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCitySub.data]);

  useEffect(() => {
    if (editCitySub.data !== undefined) {
      console.log("it worked (editting)!");
      const result = cities.map((city) => {
        if (city.id === parseInt(editCitySub.data.cityEdited.id)) {
          return editCitySub.data.cityEdited;
        } else {
          return city;
        }
      });

      setCities(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCitySub.data]);

  useEffect(() => {
    if (deleteCitySub.data !== undefined) {
      console.log("it worked (deleting)!");
      const result = cities.filter(
        (city) => city.id !== deleteCitySub.data.cityDeleted
      );
      setCities(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCitySub.data]);

  useEffect(() => {
    if (data !== undefined) {
      setCities(data.cities);
    }
  }, [data]);

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
      countries={data.countries}
      cities={cities}
      cityToEdit={cityToEdit}
      setCityToEdit={setCityToEdit}
      setCityIdToEdit={setCityIdToEdit}
    />
  );
}

export default EditCitiesPage;
