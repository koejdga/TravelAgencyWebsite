import React, { useEffect, useState } from "react";
import AddCountry from "../components/forms/AddCountry";
import EditCountry from "../components/forms/EditCountry";
import Button from "react-bootstrap/Button";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import ComponentList from "../components/ComponentList";

// #region graphql queries
const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      country_name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($input: CountryInput) {
    addCountry(input: $input) {
      affectedRows
    }
  }
`;

const EDIT_COUNTRY = gql`
  mutation EditCountry($updateCountryId: ID!, $input: CountryInput) {
    updateCountry(id: $updateCountryId, input: $input) {
      affectedRows
    }
  }
`;

const DELETE_COUNTRY = gql`
  mutation DeleteCountry($deleteCountryId: ID!) {
    deleteCountry(id: $deleteCountryId) {
      affectedRows
    }
  }
`;

const COUNTRY_ADDED_SUB = gql`
  subscription CountryAdded {
    countryAdded {
      id
      country_name
    }
  }
`;

const COUNTRY_EDITED_SUB = gql`
  subscription CountryEdited {
    countryEdited {
      id
      country_name
    }
  }
`;

const COUNTRY_DELETED_SUB = gql`
  subscription CountryDeleted {
    countryDeleted
  }
`;
// #endregion

function EditCountriesPage() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState([]);

  const [countryToAdd, setCountryToAdd] = useState({});
  const [countryToEdit, setCountryToEdit] = useState({});
  const [countryIdToEdit, setCountryIdToEdit] = useState("");

  const addCountrySub = useSubscription(COUNTRY_ADDED_SUB);
  const editCountrySub = useSubscription(COUNTRY_EDITED_SUB);
  const deleteCountrySub = useSubscription(COUNTRY_DELETED_SUB);
  // data = {countryAdded: {id: 62, country_name: "sub6", __typename: "Country"}}

  const objectForEditting = () => {
    const { __typename, id, ...input } = countryToEdit;
    return input;
  };

  const [addCountry] = useMutation(ADD_COUNTRY, {
    variables: {
      input: countryToAdd,
    },
    onCompleted: () => {
      console.log("added");
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
    },
  });

  const [editCountry] = useMutation(EDIT_COUNTRY, {
    variables: {
      updateCountryId: countryIdToEdit,
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

  const [deleteCountry] = useMutation(DELETE_COUNTRY, {
    variables: {
      deleteCountryId: countryIdToEdit,
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
    if (addCountrySub.data !== undefined) {
      console.log("it worked! (adding)");
      setCountries([...countries, addCountrySub.data.countryAdded]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCountrySub.data]);

  useEffect(() => {
    if (editCountrySub.data !== undefined) {
      console.log("it worked (editting)!");
      const result = countries.map((country) => {
        if (country.id === parseInt(editCountrySub.data.countryEdited.id)) {
          return editCountrySub.data.countryEdited;
        } else {
          return country;
        }
      });

      setCountries(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCountrySub.data]);

  useEffect(() => {
    if (deleteCountrySub.data !== undefined) {
      console.log("it worked (deleting)!");
      const result = countries.filter(
        (country) => country.id !== deleteCountrySub.data.countryDeleted
      );
      setCountries(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCountrySub.data]);

  useEffect(() => {
    if (data !== undefined) {
      setCountries(data.countries);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setCountryIdToEdit(selectedItem.id);
    setCountryToEdit(countries.find((x) => x.id === selectedItem.id));
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10vw",
        marginInline: "2rem",
        marginTop: "1rem",
      }}
    >
      <AddCountry
        country={countryToAdd}
        setCountry={setCountryToAdd}
        add={addCountry}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <ComponentList
          items={countries.map((x) => ({ name: x.country_name, id: x.id }))}
          onSelect={handleSelect}
          title="Країни"
        />
        <EditCountry
          country={countryToEdit}
          setCountry={setCountryToEdit}
          edit={editCountry}
        />
        <Button
          variant="danger"
          type="button"
          className="form-button"
          onClick={deleteCountry}
        >
          Видалити
        </Button>
      </div>
    </div>
  );
}

export default EditCountriesPage;
