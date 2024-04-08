import { connectToDatabase } from "../db_connection";
import { Router } from "express";
import { getFailureResponse, getSuccessResponse } from "../responses";
import {
  addCity,
  updateCity,
  deleteCity,
  getCities,
} from "../database_queries";
import { authentication } from "../middleware/authentication";
import { getInsertId } from "../utils";

export const citiesRouter = Router();

citiesRouter.get("/", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await getCities(connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

citiesRouter.post("/", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await addCity(req.body, connection);
    const insertId = getInsertId(results);

    res.json(
      getSuccessResponse(results, {
        ...req.body,
        id: insertId,
      })
    );
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

citiesRouter.put("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await updateCity(
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

citiesRouter.delete("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await deleteCity(parseInt(req.params.id), connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});
