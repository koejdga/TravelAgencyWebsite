import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import "../components/forms/Form.css";
import ComponentList from "../components/ComponentList";
import AddHotel from "../components/forms/AddHotel";
import EditHotel from "../components/forms/EditHotel";

// #region graphql queries
const GET_HOTELS = gql`
  query GetHotels {
    hotels {
      city
      hotel_address
      hotel_name
      id
      link
    }
    cities {
      id
      city_name
      country
    }
  }
`;

const ADD_HOTEL = gql`
  mutation AddHotel($input: HotelInput) {
    addHotel(input: $input) {
      affectedRows
    }
  }
`;

const EDIT_HOTEL = gql`
  mutation EditHotel($updateHotelId: ID!, $input: HotelInput) {
    updateHotel(id: $updateHotelId, input: $input) {
      affectedRows
    }
  }
`;

const DELETE_HOTEL = gql`
  mutation DeleteHotel($deleteHotelId: ID!) {
    deleteHotel(id: $deleteHotelId) {
      affectedRows
    }
  }
`;

const HOTEL_ADDED_SUB = gql`
  subscription HotelAdded {
    hotelAdded {
      city
      hotel_address
      hotel_name
      id
      link
    }
  }
`;

const HOTEL_EDITED_SUB = gql`
  subscription HotelEdited {
    hotelEdited {
      city
      hotel_address
      hotel_name
      id
      link
    }
  }
`;

const HOTEL_DELETED_SUB = gql`
  subscription HotelDeleted {
    hotelDeleted
  }
`;
// #endregion

function EditHotelsPage() {
  const { loading, error, data } = useQuery(GET_HOTELS);
  const [hotels, setHotels] = useState([]);

  const [hotelToAdd, setHotelToAdd] = useState({});
  const [hotelToEdit, setHotelToEdit] = useState({});
  const [hotelIdToEdit, setHotelIdToEdit] = useState("");

  const addHotelSub = useSubscription(HOTEL_ADDED_SUB);
  const editHotelSub = useSubscription(HOTEL_EDITED_SUB);
  const deleteHotelSub = useSubscription(HOTEL_DELETED_SUB);
  // data = {countryAdded: {id: 62, country_name: "sub6", __typename: "Country"}}

  const [hotelAddAlertMessage, setHotelAddAlertMessage] = useState(null);

  const objectForEditting = () => {
    const { __typename, id, ...input } = hotelToEdit;
    return input;
  };

  const [addHotel] = useMutation(ADD_HOTEL, {
    variables: {
      input: hotelToAdd,
    },
    onCompleted: () => {
      console.log("added");
      setHotelAddAlertMessage(null);
    },
    onError: (error) => {
      console.log("error occured");
      console.log(error);
      if (error.message.includes("was not provided")) {
        setHotelAddAlertMessage("Введіть всі поля");
      }
    },
  });

  const [editHotel] = useMutation(EDIT_HOTEL, {
    variables: {
      updateHotelId: hotelIdToEdit,
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

  const [deleteHotel] = useMutation(DELETE_HOTEL, {
    variables: {
      deleteHotelId: hotelIdToEdit,
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
    if (addHotelSub.data !== undefined) {
      console.log("it worked! (adding)");
      setHotels([...hotels, addHotelSub.data.hotelAdded]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addHotelSub.data]);

  useEffect(() => {
    if (editHotelSub.data !== undefined) {
      console.log("it worked (editting)!");
      const result = hotels.map((hotel) => {
        if (hotel.id === parseInt(editHotelSub.data.hotelEdited.id)) {
          return editHotelSub.data.hotelEdited;
        } else {
          return hotel;
        }
      });

      setHotels(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editHotelSub.data]);

  useEffect(() => {
    if (deleteHotelSub.data !== undefined) {
      console.log("it worked (deleting)!");
      const result = hotels.filter(
        (hotel) => hotel.id !== deleteHotelSub.data.hotelDeleted
      );
      setHotels(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteHotelSub.data]);

  useEffect(() => {
    if (data !== undefined) {
      setHotels(data.hotels);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <Error error={error} />;
  }

  const handleSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setHotelIdToEdit(selectedItem.id);
    setHotelToEdit(hotels.find((x) => x.id === selectedItem.id));
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
      <AddHotel
        hotel={hotelToAdd}
        setHotel={setHotelToAdd}
        add={addHotel}
        alertMessage={hotelAddAlertMessage}
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
          items={hotels.map((obj) => ({
            name: `${obj.hotel_name}, ${obj.hotel_address}, ${
              data.cities.find((x) => x.id === obj.city).city_name
            }`,
            id: obj.id,
          }))}
          onSelect={handleSelect}
          title="Готелі"
        />
        <EditHotel
          hotel={hotelToEdit}
          setHotel={setHotelToEdit}
          edit={editHotel}
          cities={data.cities}
        />
        <Button
          variant="danger"
          type="button"
          className="form-button"
          onClick={deleteHotel}
        >
          Видалити
        </Button>
      </div>
    </div>
  );
}

export default EditHotelsPage;
