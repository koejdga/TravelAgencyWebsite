import { connectToDatabase } from "../db_connection";
import { Router } from "express";
import { getFailureResponse, getSuccessResponse } from "../responses";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../database_queries";
import { authentication } from "../middleware/authentication";
import { getInsertId } from "../utils";

export const restaurantsRouter = Router();

restaurantsRouter.get("/", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await getRestaurants(connection);

    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

restaurantsRouter.post("/", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = addRestaurant(req.body, connection);
    const insertId = getInsertId(results);

    res.json(getSuccessResponse(results, { ...req.body, id: insertId }));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

restaurantsRouter.put("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();

    const results = updateRestaurant(
      parseInt(req.params.id),
      req.body,
      connection
    );
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

restaurantsRouter.delete("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();

    const results = deleteRestaurant(parseInt(req.params.id), connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});
