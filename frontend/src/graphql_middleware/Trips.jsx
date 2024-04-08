import React, { useState, useEffect } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import CardCollection from "../components/CardCollection";
import Loading from "../loading_and_error/Loading";
import Error from "../loading_and_error/Error";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const GET_TRIPS = gql`
  query GetTrips {
    trips {
      city
      trip_description
      hotel
      id
      price
      restaurant
      sale
      trip_name
    }
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

function Trips() {
  const { loading, error, data } = useQuery(GET_TRIPS);
  const [trips, setTrips] = useState([]);

  const addTripSub = useSubscription(TRIP_ADDED_SUB);
  const editTripSub = useSubscription(TRIP_EDITED_SUB);
  const deleteTripSub = useSubscription(TRIP_DELETED_SUB);

  const [selectedCityId, setSelectedCityId] = useState(-1);

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

  useEffect(() => {
    if (!data) {
      return;
    }

    if (selectedCityId === -1) {
      setTrips(data.trips || []);
    } else {
      setTrips(data.trips.filter((trip) => trip.city === selectedCityId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCityId]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const formatTrips = (trips) => {
    return trips.map((trip) => {
      const city = data.cities.find((x) => x.id === trip.city);
      const country = data.countries.find((x) => x.id === city.country);
      return {
        ...trip,
        city: city ? city.city_name : null,
        country: country ? country.country_name : null,
      };
    });
  };

  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Місто" className="mb-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setSelectedCityId(parseInt(e.target.value))}
        >
          <option value={-1}>Виберіть місто</option>
          {data.cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <CardCollection trips={formatTrips(trips)} />
    </>
  );
}

export default Trips;
