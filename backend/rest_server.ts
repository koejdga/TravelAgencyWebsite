import express from "express";
import cors from "cors";
import { citiesRouter } from "./routers/cities_router";
import { countriesRouter } from "./routers/countries_router";
import { hotelsRouter } from "./routers/hotels_router";
import { restaurantsRouter } from "./routers/restaurants_router";
import { tripsRouter } from "./routers/trips_router";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateToken } from "./utils";
dotenv.config();

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.use("/cities", citiesRouter);
app.use("/countries", countriesRouter);
app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/trips", tripsRouter);

app.post("/login", async (req, res) => {
  const { password } = req.body;
  const real_password = process.env.ACCESS_PASSWORD || "";

  const valid = await bcrypt.compare(password, real_password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  res.send(generateToken());
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
