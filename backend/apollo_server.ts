import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { connectToDatabase } from "./db_connection";
import {
  addCity,
  addCountry,
  addHotel,
  addRestaurant,
  addTrip,
  deleteCity,
  deleteCountry,
  deleteHotel,
  deleteRestaurant,
  deleteTrip,
  getCities,
  getCountries,
  getHotels,
  getRestaurants,
  getTrips,
  login,
  updateCity,
  updateCountry,
  updateHotel,
  updateRestaurant,
  updateTrip,
} from "./database_queries";
import { auth, generateToken, getInsertId } from "./utils";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

const SubNames = {
  COUNTRY_ADDED: "COUNTRY_ADDED",
  COUNTRY_EDITED: "COUNTRY_EDITED",
  COUNTRY_DELETED: "COUNTRY_DELETED",

  CITY_ADDED: "CITY_ADDED",
  CITY_EDITED: "CITY_EDITED",
  CITY_DELETED: "CITY_DELETED",

  HOTEL_ADDED: "HOTEL_ADDED",
  HOTEL_EDITED: "HOTEL_EDITED",
  HOTEL_DELETED: "HOTEL_DELETED",

  RESTAURANT_ADDED: "RESTAURANT_ADDED",
  RESTAURANT_EDITED: "RESTAURANT_EDITED",
  RESTAURANT_DELETED: "RESTAURANT_DELETED",

  TRIP_ADDED: "TRIP_ADDED",
  TRIP_EDITED: "TRIP_EDITED",
  TRIP_DELETED: "TRIP_DELETED",
};

async function main() {
  const pubsub = new PubSub();

  const connection = await connectToDatabase();
  const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./graphql_schema.graphql"), {
      encoding: "utf-8",
    })
  );
  const resolvers = {
    Query: {
      async countries() {
        const results = await getCountries(connection);
        return results;
      },
      async cities() {
        const results = await getCities(connection);
        return results;
      },
      async hotels() {
        const results = await getHotels(connection);
        return results;
      },
      async restaurants() {
        const results = await getRestaurants(connection);
        return results;
      },
      async trips() {
        const results = await getTrips(connection);
        return results;
      },
    },
    Mutation: {
      // #region country endpoints
      async addCountry(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await addCountry(args.input, connection);
        const insertId = getInsertId(res);

        pubsub.publish(SubNames.COUNTRY_ADDED, {
          countryAdded: { ...args.input, id: insertId },
        });
        return res;
      },
      async updateCountry(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;

        const res = await updateCountry(args.id, args.input, connection);

        const [results] = await connection.execute(
          "SELECT * FROM countries where id = ?",
          [args.id]
        );

        pubsub.publish(SubNames.COUNTRY_EDITED, {
          countryEdited: Object.values(results)[0],
        });
        return res;
      },
      async deleteCountry(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await deleteCountry(args.id, connection);

        pubsub.publish(SubNames.COUNTRY_DELETED, {
          countryDeleted: parseInt(args.id),
        });
        return res;
      },
      // #endregion

      // #region city endpoints
      async addCity(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await addCity(args.input, connection);
        const insertId = getInsertId(res);

        pubsub.publish(SubNames.CITY_ADDED, {
          cityAdded: { ...args.input, id: insertId },
        });
        return res;
      },
      async updateCity(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await updateCity(args.id, args.input, connection);

        const [results] = await connection.execute(
          "SELECT * FROM cities where id = ?",
          [args.id]
        );

        pubsub.publish(SubNames.CITY_EDITED, {
          cityEdited: Object.values(results)[0],
        });
        return res;
      },
      async deleteCity(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await deleteCity(args.id, connection);

        pubsub.publish(SubNames.CITY_DELETED, {
          cityDeleted: parseInt(args.id),
        });
        return res;
      },
      // #endregion

      // #region hotel endpoints
      async addHotel(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await addHotel(args.input, connection);
        const insertId = getInsertId(res);

        pubsub.publish(SubNames.HOTEL_ADDED, {
          hotelAdded: { ...args.input, id: insertId },
        });
        return res;
      },
      async updateHotel(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await updateHotel(args.id, args.input, connection);

        const [results] = await connection.execute(
          "SELECT * FROM hotels where id = ?",
          [args.id]
        );

        pubsub.publish(SubNames.HOTEL_EDITED, {
          hotelEdited: Object.values(results)[0],
        });
        return res;
      },
      async deleteHotel(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await deleteHotel(args.id, connection);

        pubsub.publish(SubNames.HOTEL_DELETED, {
          hotelDeleted: parseInt(args.id),
        });
        return res;
      },
      // #endregion

      // #region restaurant endpoints
      async addRestaurant(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await addRestaurant(args.input, connection);
        const insertId = getInsertId(res);

        pubsub.publish(SubNames.RESTAURANT_ADDED, {
          restaurantAdded: { ...args.input, id: insertId },
        });
        return res;
      },
      async updateRestaurant(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await updateRestaurant(args.id, args.input, connection);

        const [results] = await connection.execute(
          "SELECT * FROM restaurants where id = ?",
          [args.id]
        );

        pubsub.publish(SubNames.RESTAURANT_EDITED, {
          restaurantEdited: Object.values(results)[0],
        });
        return res;
      },
      async deleteRestaurant(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await deleteRestaurant(args.id, connection);

        pubsub.publish(SubNames.RESTAURANT_DELETED, {
          restaurantDeleted: parseInt(args.id),
        });
        return res;
      },
      // #endregion

      // #region trip endpoints
      async addTrip(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await addTrip(args.input, connection);
        const insertId = getInsertId(res);

        pubsub.publish(SubNames.TRIP_ADDED, {
          tripAdded: { ...args.input, id: insertId },
        });
        return res;
      },
      async updateTrip(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await updateTrip(args.id, args.input, connection);

        const [results] = await connection.execute(
          "SELECT * FROM trips where id = ?",
          [args.id]
        );

        pubsub.publish(SubNames.TRIP_EDITED, {
          tripEdited: Object.values(results)[0],
        });
        return res;
      },
      async deleteTrip(_: any, args: any, contextValue: any) {
        if (!contextValue.loggedIn) return null;
        const res = await deleteTrip(args.id, connection);

        pubsub.publish(SubNames.TRIP_DELETED, {
          tripDeleted: parseInt(args.id),
        });
        return res;
      },
      // #endregion

      // #region user endpoint
      async login(_: any, args: any, context: any) {
        const password = process.env.ACCESS_PASSWORD || "";
        console.log("password = " + args.password);
        const valid = await bcrypt.compare(args.password, password);
        if (!valid) {
          throw new Error("Invalid password");
        }
        return generateToken();
      },
      // #endregion
    },
    Subscription: {
      // #region country subscriptions
      countryAdded: {
        subscribe: () => pubsub.asyncIterator([SubNames.COUNTRY_ADDED]),
      },
      countryEdited: {
        subscribe: () => pubsub.asyncIterator([SubNames.COUNTRY_EDITED]),
      },
      countryDeleted: {
        subscribe: () => pubsub.asyncIterator([SubNames.COUNTRY_DELETED]),
      },
      // #endregion

      // #region city subscriptions
      cityAdded: {
        subscribe: () => pubsub.asyncIterator([SubNames.CITY_ADDED]),
      },
      cityEdited: {
        subscribe: () => pubsub.asyncIterator([SubNames.CITY_EDITED]),
      },
      cityDeleted: {
        subscribe: () => pubsub.asyncIterator([SubNames.CITY_DELETED]),
      },
      // #endregion

      // #region hotel subscriptions
      hotelAdded: {
        subscribe: () => pubsub.asyncIterator([SubNames.HOTEL_ADDED]),
      },
      hotelEdited: {
        subscribe: () => pubsub.asyncIterator([SubNames.HOTEL_EDITED]),
      },
      hotelDeleted: {
        subscribe: () => pubsub.asyncIterator([SubNames.HOTEL_DELETED]),
      },
      // #endregion

      // #region restaurant subscriptions
      restaurantAdded: {
        subscribe: () => pubsub.asyncIterator([SubNames.RESTAURANT_ADDED]),
      },
      restaurantEdited: {
        subscribe: () => pubsub.asyncIterator([SubNames.RESTAURANT_EDITED]),
      },
      restaurantDeleted: {
        subscribe: () => pubsub.asyncIterator([SubNames.RESTAURANT_DELETED]),
      },
      // #endregion

      // #region trip subscriptions
      tripAdded: {
        subscribe: () => pubsub.asyncIterator([SubNames.TRIP_ADDED]),
      },
      tripEdited: {
        subscribe: () => pubsub.asyncIterator([SubNames.TRIP_EDITED]),
      },
      tripDeleted: {
        subscribe: () => pubsub.asyncIterator([SubNames.TRIP_DELETED]),
      },
      // #endregion
    },
  };
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.headers.authorization || "";
        const loggedIn = auth(token);
        return { loggedIn };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`
    🚀  Server is running!
    📭  Query at http://localhost:4000/
  `);
}

main();
