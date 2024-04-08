import { connectToDatabase } from "../db_connection";
import { Router } from "express";
import { getFailureResponse, getSuccessResponse } from "../responses";
import {
  addCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from "../database_queries";
import { authentication } from "../middleware/authentication";
import { getInsertId } from "../utils";

export const countriesRouter = Router();

countriesRouter.get("/", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await getCountries(connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

countriesRouter.post("/", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await addCountry(req.body, connection);
    const insertId = getInsertId(results);

    res.json(getSuccessResponse(results, { ...req.body, id: insertId }));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

countriesRouter.put("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await updateCountry(
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

countriesRouter.delete("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await deleteCountry(parseInt(req.params.id), connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});
