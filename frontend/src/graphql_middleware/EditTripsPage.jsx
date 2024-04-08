import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import ComponentList from "../components/ComponentList";
import AddTrip from "../components/forms/AddTrip";
import EditTrip from "../components/forms/EditTrip";

// #region graphql queries
const GET_TRIPS = gql`
  query GetTrips {
    trips {
      id
      trip_name
      trip_description
      price
      sale
      restaurant
      hotel
      city
    }

    hotels {
      id
      hotel_name
      hotel_address
      city
    }

    restaurants {
      id
      restaurant_name
      restaurant_address
      city
    }

    cities {
      id
      city_name
    }
  }
`;

const ADD_TRIP = gql`
  mutation AddTrip($input: TripInput) {
    addTrip(input: $input) {
      affectedRows
    }
  }
`;

const EDIT_TRIP = gql`
  mutation EditTrip($updateTripId: ID!, $input: TripInput) {
    updateTrip(id: $updateTripId, input: $input) {
      affectedRows
    }
  }
`;

const DELETE_TRIP = gql`
  mutation DeleteTrip($deleteTripId: ID!) {
    deleteTrip(id: $deleteTripId) {
      affectedRows
    }
  }
`;

const TRIP_ADDED_SUB = gql`
  subscription TripAdded {
    tripAdded {
      id
      trip_name
      trip_description
      price
      sale
      restaurant
      hotel
      city
    }
  }
`;

const TRIP_EDITED_SUB = gql`
  subscription TripEdited {
    tripEdited {
      id
      trip_name
      trip_description
      price
      sale
      restaurant
      hotel
      city
    }
  }
`;

const TRIP_DELETED_SUB = gql`
  subscription TripDeleted {
    tripDeleted
  }
`;
// #endregion

function EditTripsPage() {
  const { loading, error, data } = useQuery(GET_TRIPS);
  const [trips, setTrips] = useState([]);

  const [tripToAdd, setTripToAdd] = useState({});
  const [tripToEdit, setTripToEdit] = useState({});
  const [tripIdToEdit, setTripIdToEdit] = useState("");

  const addTripSub = useSubscription(TRIP_ADDED_SUB);
  const editTripSub = useSubscription(TRIP_EDITED_SUB);
  const deleteTripSub = useSubscription(TRIP_DELETED_SUB);
  // data = {countryAdded: {id: 62, country_name: "sub6", __typename: "Country"}}

  const [tripAddAlertMessage, setTripAddAlertMessage] = useState(null);

  const objectForEditting = () => {
    const { __typename, id, ...input } = tripToEdit;
    return input;
  };

  const [addTrip] = useMutation(ADD_TRIP, {
    variables: {
      input: tripToAdd,
    },
    onCompleted: () => {
      console.log("added");
      setTripAddAlertMessage(null);
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
      if (error.message.includes("was not provided")) {
        setTripAddAlertMessage("Введіть всі поля");
      }
    },
  });

  const [editTrip] = useMutation(EDIT_TRIP, {
    variables: {
      updateTripId: tripIdToEdit,
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

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    variables: {
      deleteTripId: tripIdToEdit,
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
    if (addTripSub.data !== undefined) {
      console.log("it worked! (adding)");
      setTrips([...trips, addTripSub.data.tripAdded]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTripSub.data]);

  useEffect(() => {
    if (editTripSub.data !== undefined) {
      console.log("it worked (editting)!");
      const result = trips.map((trip) => {
        if (trip.id === parseInt(editTripSub.data.tripEdited.id)) {
          return editTripSub.data.tripEdited;
        } else {
          return trip;
        }
      });

      setTrips(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTripSub.data]);

  useEffect(() => {
    if (deleteTripSub.data !== undefined) {
      console.log("it worked (deleting)!");
      const result = trips.filter(
        (trip) => trip.id !== deleteTripSub.data.tripDeleted
      );
      setTrips(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTripSub.data]);

  useEffect(() => {
    if (data !== undefined) {
      setTrips(data.trips);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setTripIdToEdit(selectedItem.id);
    setTripToEdit(trips.find((x) => x.id === selectedItem.id));
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
      <AddTrip
        trip={tripToAdd}
        setTrip={setTripToAdd}
        add={addTrip}
        alertMessage={tripAddAlertMessage}
        restaurants={data.restaurants}
        hotels={data.hotels}
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
          items={trips.map((obj) => ({
            name: obj.trip_name,
            id: obj.id,
          }))}
          onSelect={handleSelect}
          title="Поїздки"
        />
        <EditTrip
          trip={tripToEdit}
          setTrip={setTripToEdit}
          edit={editTrip}
          alertMessage={tripAddAlertMessage}
          restaurants={data.restaurants}
          hotels={data.hotels}
          cities={data.cities}
        />
        <Button
          variant="danger"
          type="button"
          className="form-button"
          onClick={deleteTrip}
        >
          Видалити
        </Button>
      </div>
    </div>
  );
}

export default EditTripsPage;
