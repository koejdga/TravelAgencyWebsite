import CardCollection from "../components/CardCollection";
import React, { useState, useEffect } from "react";
import Error from "../loading_and_error/Error";
import Loading from "../loading_and_error/Loading";
import { axiosClient } from "./config";

const Trips = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trips = await axiosClient.get("/trips");
        const cities = await axiosClient.get("/cities");
        const countries = await axiosClient.get("/countries");
        if (trips.data.success === "false") {
          setError(trips.data.error);
          setLoading(false);
          return;
        }

        if (cities.data.success === "false") {
          setError(cities.data.error);
          setLoading(false);
          return;
        }

        if (countries.data.success === "false") {
          setError(countries.data.error);
          setLoading(false);
          return;
        }

        setData({
          trips: trips.data.results,
          cities: cities.data.results,
          countries: countries.data.results,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const updatedTrips = data.trips.map((trip) => {
    const city = data.cities.find((x) => x.id === trip.city);
    const country = data.countries.find((x) => x.id === city.country);
    return {
      ...trip,
      city: city ? city.city_name : null,
      country: country ? country.country_name : null,
    };
  });

  return <CardCollection trips={updatedTrips} />;
};

export default Trips;
