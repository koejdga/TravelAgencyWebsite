import mysql from "mysql2/promise";
import { Country, City, Hotel, Restaurant, Trip } from "./interfaces";

// #region get queries
export const getCountries = async (connection: mysql.Connection) => {
  const [results] = await connection.execute("SELECT * FROM countries");
  return results;
};

export const getCities = async (connection: mysql.Connection) => {
  const [results] = await connection.execute("SELECT * FROM cities");
  return results;
};

export const getHotels = async (connection: mysql.Connection) => {
  const [results] = await connection.execute("SELECT * FROM hotels");
  return results;
};

export const getRestaurants = async (connection: mysql.Connection) => {
  const [results] = await connection.execute("SELECT * FROM restaurants");
  return results;
};

export const getTrips = async (connection: mysql.Connection) => {
  const [results] = await connection.execute("SELECT * FROM trips");
  return results;
};
// #endregion

// #region country queries
export const addCountry = async (
  input: Country,
  connection: mysql.Connection
) => {
  const { country_name } = input;

  const [results] = await connection.execute(
    "INSERT INTO countries (country_name)\
        VALUES (?)",
    [country_name]
  );

  return results;
};

export const updateCountry = async (
  id: Number,
  input: Country,
  connection: mysql.Connection
) => {
  const { country_name } = input;

  const [results] = await connection.execute(
    "UPDATE countries\
    SET country_name = ?\
    WHERE id = ?",
    [country_name, id]
  );

  return results;
};

export const deleteCountry = async (
  id: Number,
  connection: mysql.Connection
) => {
  const [results] = await connection.execute(
    "DELETE FROM countries WHERE id = ?",
    [id]
  );

  return results;
};
// #endregion

// #region city queries
export const addCity = async (input: City, connection: mysql.Connection) => {
  const { city_name, country } = input;

  const [results] = await connection.execute(
    "INSERT INTO cities (city_name, country)\
      VALUES (?, ?)",
    [city_name, country]
  );

  return results;
};

export const updateCity = async (
  id: Number,
  input: City,
  connection: mysql.Connection
) => {
  const { city_name, country } = input;

  const [results] = await connection.execute(
    "UPDATE cities\
      SET city_name = ?, country = ?\
      WHERE id = ?",
    [city_name, country, id]
  );

  return results;
};

export const deleteCity = async (id: Number, connection: mysql.Connection) => {
  const [results] = await connection.execute(
    "DELETE FROM cities WHERE id = ?",
    [id]
  );

  return results;
};
// #endregion

// #region hotel queries
export const addHotel = async (input: Hotel, connection: mysql.Connection) => {
  const { hotel_name, hotel_address, city, link } = input;

  const [results] = await connection.execute(
    "INSERT INTO hotels (hotel_name, hotel_address, city, link )\
      VALUES (?, ?, ?, ?)",
    [hotel_name, hotel_address, city, link]
  );

  return results;
};

export const updateHotel = async (
  id: Number,
  input: Hotel,
  connection: mysql.Connection
) => {
  const { hotel_name, hotel_address, city, link } = input;

  const [results] = await connection.execute(
    "UPDATE hotels\
      SET hotel_name = ?, hotel_address = ?, city = ?, link = ?\
      WHERE id = ?",
    [hotel_name, hotel_address, city, link, id]
  );

  return results;
};

export const deleteHotel = async (id: Number, connection: mysql.Connection) => {
  const [results] = await connection.execute(
    "DELETE FROM hotels WHERE id = ?",
    [id]
  );

  return results;
};
// #endregion

// #region restaurant queries
export const addRestaurant = async (
  input: Restaurant,
  connection: mysql.Connection
) => {
  const { restaurant_name, restaurant_address, city, link } = input;

  const [results] = await connection.execute(
    "INSERT INTO restaurants (restaurant_name, restaurant_address, city, link )\
      VALUES (?, ?, ?, ?)",
    [restaurant_name, restaurant_address, city, link]
  );

  return results;
};

export const updateRestaurant = async (
  id: Number,
  input: Restaurant,
  connection: mysql.Connection
) => {
  const { restaurant_name, restaurant_address, city, link } = input;

  const [results] = await connection.execute(
    "UPDATE restaurants\
      SET restaurant_name = ?, restaurant_address = ?, city = ?, link = ?\
      WHERE id = ?",
    [restaurant_name, restaurant_address, city, link, id]
  );

  return results;
};

export const deleteRestaurant = async (
  id: Number,
  connection: mysql.Connection
) => {
  const [results] = await connection.execute(
    "DELETE FROM restaurants WHERE id = ?",
    [id]
  );

  return results;
};
// #endregion

// #region trip queries
export const addTrip = async (input: Trip, connection: mysql.Connection) => {
  const { trip_name, trip_description, city, price, sale, hotel, restaurant } =
    input;

  const [results] = await connection.execute(
    "INSERT INTO trips (trip_name, trip_description, city, price, sale, hotel, restaurant )\
    VALUES (?, ?, ?, ?, ?, ?, ?)",
    [trip_name, trip_description, city, price, sale, hotel, restaurant]
  );

  return results;
};

export const updateTrip = async (
  id: Number,
  input: Trip,
  connection: mysql.Connection
) => {
  const { trip_name, trip_description, city, price, sale, hotel, restaurant } =
    input;

  const [results] = await connection.execute(
    "UPDATE trips\
    SET trip_name = ?, trip_description = ?, city = ?, price = ?, sale = ?, hotel = ?, restaurant = ?\
    WHERE id = ?",
    [trip_name, trip_description, city, price, sale, hotel, restaurant, id]
  );

  return results;
};

export const deleteTrip = async (id: Number, connection: mysql.Connection) => {
  const [results] = await connection.execute("DELETE FROM trips WHERE id = ?", [
    id,
  ]);

  return results;
};
// #endregion

export const login = async (username: string, connection: mysql.Connection) => {
  const [results] = await connection.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  return results;
};
