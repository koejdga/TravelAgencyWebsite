// import express from "express";
// import { createHandler } from "graphql-http/lib/use/express";
// import { buildASTSchema } from "graphql";
// import { GraphQLDirective, GraphQLNonNull } from "graphql";
// // @ts-ignore
// import { ruruHTML } from "ruru/server";
// import { connectToDatabase } from "./db_connection";
// import "graphql-import-node";
// import * as mySchema from "./graphql_schema.graphql";
// import {
//   addCity,
//   addCountry,
//   addHotel,
//   addRestaurant,
//   addTrip,
//   deleteCity,
//   deleteCountry,
//   deleteHotel,
//   deleteRestaurant,
//   deleteTrip,
//   updateCity,
//   updateCountry,
//   updateHotel,
//   updateRestaurant,
//   updateTrip,
// } from "./database_queries";
// import cors from "cors";
// import { Country, City, Hotel, Restaurant, Trip } from "./interfaces";

// var schema = buildASTSchema(mySchema);

// async function main() {
//   try {
//     const connection = await connectToDatabase();
//     var root = {
//       async countries() {
//         const [results] = await connection.execute("SELECT * FROM countries");
//         return results;
//       },
//       async cities() {
//         const [results] = await connection.execute("SELECT * FROM cities");
//         return results;
//       },
//       async hotels() {
//         const [results] = await connection.execute("SELECT * FROM hotels");
//         return results;
//       },
//       async restaurants() {
//         const [results] = await connection.execute("SELECT * FROM restaurants");
//         return results;
//       },
//       async trips() {
//         const [results] = await connection.execute("SELECT * FROM trips");
//         return results;
//       },

//       // #region country endpoints
//       async addCountry({ input }: { input: Country }) {
//         return await addCountry(input, connection);
//       },
//       async updateCountry({ id, input }: { id: Number; input: Country }) {
//         return await updateCountry(id, input, connection);
//       },
//       async deleteCountry({ id }: { id: Number }) {
//         return await deleteCountry(id, connection);
//       },
//       // #endregion

//       // #region city endpoints
//       async addCity({ input }: { input: City }) {
//         return await addCity(input, connection);
//       },
//       async updateCity({ id, input }: { id: Number; input: City }) {
//         return await updateCity(id, input, connection);
//       },
//       async deleteCity({ id }: { id: Number }) {
//         return await deleteCity(id, connection);
//       },
//       // #endregion

//       // #region hotel endpoints
//       async addHotel({ input }: { input: Hotel }) {
//         return await addHotel(input, connection);
//       },
//       async updateHotel({ id, input }: { id: Number; input: Hotel }) {
//         return await updateHotel(id, input, connection);
//       },
//       async deleteHotel({ id }: { id: Number }) {
//         return await deleteHotel(id, connection);
//       },
//       // #endregion

//       // #region restaurant endpoints
//       async addRestaurant({ input }: { input: Restaurant }) {
//         return await addRestaurant(input, connection);
//       },
//       async updateRestaurant({ id, input }: { id: Number; input: Restaurant }) {
//         return await updateRestaurant(id, input, connection);
//       },
//       async deleteRestaurant({ id }: { id: Number }) {
//         return await deleteRestaurant(id, connection);
//       },
//       // #endregion

//       // #region trip endpoints
//       async addTrip({ input }: { input: Trip }) {
//         return await addTrip(input, connection);
//       },
//       async updateTrip({ id, input }: { id: Number; input: Trip }) {
//         return await updateTrip(id, input, connection);
//       },
//       async deleteTrip({ id }: { id: Number }) {
//         return await deleteTrip(id, connection);
//       },
//       // #endregion
//     };

//     const app = express();
//     app.use(cors());

//     app.all(
//       "/graphql",
//       createHandler({
//         schema: schema,
//         rootValue: root,
//       })
//     );

//     app.get("/", (_req, res) => {
//       res.type("html");
//       res.end(ruruHTML({ endpoint: "/graphql" }));
//     });

//     app.listen(4000);
//     console.log("Running a GraphQL API server at http://localhost:4000");
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//   }
// }

// main();
