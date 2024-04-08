import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import ComponentList from "../components/ComponentList";
import AddRestaurant from "../components/forms/AddRestaurant";
import EditRestaurant from "../components/forms/EditRestaurant";

// #region graphql queries
const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      city
      id
      link
      restaurant_name
      restaurant_address
    }
    cities {
      id
      city_name
      country
    }
  }
`;

const ADD_RESTAURANT = gql`
  mutation AddRestaurant($input: RestaurantInput) {
    addRestaurant(input: $input) {
      affectedRows
    }
  }
`;

const EDIT_RESTAURANT = gql`
  mutation EditRestaurant($updateRestaurantId: ID!, $input: RestaurantInput) {
    updateRestaurant(id: $updateRestaurantId, input: $input) {
      affectedRows
    }
  }
`;

const DELETE_RESTAURANT = gql`
  mutation DeleteRestaurant($deleteRestaurantId: ID!) {
    deleteRestaurant(id: $deleteRestaurantId) {
      affectedRows
    }
  }
`;

const RESTAURANT_ADDED_SUB = gql`
  subscription RestaurantAdded {
    restaurantAdded {
      city
      restaurant_address
      restaurant_name
      id
      link
    }
  }
`;

const RESTAURANT_EDITED_SUB = gql`
  subscription RestaurantEdited {
    restaurantEdited {
      city
      restaurant_address
      restaurant_name
      id
      link
    }
  }
`;

const RESTAURANT_DELETED_SUB = gql`
  subscription RestaurantDeleted {
    restaurantDeleted
  }
`;
// #endregion

function EditRestaurantsPage() {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  const [restaurants, setRestaurants] = useState([]);

  const [restaurantToAdd, setRestaurantToAdd] = useState({});
  const [restaurantToEdit, setRestaurantToEdit] = useState({});
  const [restaurantIdToEdit, setRestaurantIdToEdit] = useState("");

  const addRestaurantSub = useSubscription(RESTAURANT_ADDED_SUB);
  const editRestaurantSub = useSubscription(RESTAURANT_EDITED_SUB);
  const deleteRestaurantSub = useSubscription(RESTAURANT_DELETED_SUB);
  // data = {countryAdded: {id: 62, country_name: "sub6", __typename: "Country"}}

  const [restaurantAddAlertMessage, setRestaurantAddAlertMessage] =
    useState(null);

  const objectForEditting = () => {
    const { __typename, id, ...input } = restaurantToEdit;
    return input;
  };

  const [addRestaurant] = useMutation(ADD_RESTAURANT, {
    variables: {
      input: restaurantToAdd,
    },
    onCompleted: () => {
      console.log("added");
      setRestaurantAddAlertMessage(null);
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
      if (error.message.includes("was not provided")) {
        setRestaurantAddAlertMessage("Введіть всі поля");
      }
    },
  });

  const [editRestaurant] = useMutation(EDIT_RESTAURANT, {
    variables: {
      updateRestaurantId: restaurantIdToEdit,
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

  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT, {
    variables: {
      deleteRestaurantId: restaurantIdToEdit,
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
    if (addRestaurantSub.data !== undefined) {
      console.log("it worked! (adding)");
      setRestaurants([...restaurants, addRestaurantSub.data.restaurantAdded]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRestaurantSub.data]);

  useEffect(() => {
    if (editRestaurantSub.data !== undefined) {
      console.log("it worked (editting)!");
      const result = restaurants.map((restaurant) => {
        if (
          restaurant.id === parseInt(editRestaurantSub.data.restaurantEdited.id)
        ) {
          return editRestaurantSub.data.restaurantEdited;
        } else {
          return restaurant;
        }
      });

      setRestaurants(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRestaurantSub.data]);

  useEffect(() => {
    if (deleteRestaurantSub.data !== undefined) {
      console.log("it worked (deleting)!");
      const result = restaurants.filter(
        (restaurant) =>
          restaurant.id !== deleteRestaurantSub.data.restaurantDeleted
      );
      setRestaurants(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteRestaurantSub.data]);

  useEffect(() => {
    if (data !== undefined) {
      setRestaurants(data.restaurants);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setRestaurantIdToEdit(selectedItem.id);
    setRestaurantToEdit(restaurants.find((x) => x.id === selectedItem.id));
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
      <AddRestaurant
        restaurant={restaurantToAdd}
        setRestaurant={setRestaurantToAdd}
        add={addRestaurant}
        alertMessage={restaurantAddAlertMessage}
        cities={data.cities}
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
          items={restaurants.map((obj) => ({
            name: `${obj.restaurant_name}, ${obj.restaurant_address}, ${
              data.cities.find((x) => x.id === obj.city).city_name
            }`,
            id: obj.id,
          }))}
          onSelect={handleSelect}
          title="Ресторани"
        />
        <EditRestaurant
          restaurant={restaurantToEdit}
          setRestaurant={setRestaurantToEdit}
          edit={editRestaurant}
          cities={data.cities}
        />
        <Button
          variant="danger"
          type="button"
          className="form-button"
          onClick={deleteRestaurant}
        >
          Видалити
        </Button>
      </div>
    </div>
  );
}

export default EditRestaurantsPage;
