import { connectToDatabase } from "../db_connection";
import { Router } from "express";
import { getFailureResponse, getSuccessResponse } from "../responses";
import { addTrip, updateTrip, deleteTrip, getTrips } from "../database_queries";
import { authentication } from "../middleware/authentication";
import { getInsertId } from "../utils";

export const tripsRouter = Router();

tripsRouter.get("/", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await getTrips(connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

tripsRouter.post("/", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await addTrip(req.body, connection);
    const insertId = getInsertId(results);

    res.json(getSuccessResponse(results, { ...req.body, id: insertId }));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

tripsRouter.put("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();

    const results = await updateTrip(
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

tripsRouter.delete("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();

    const results = await deleteTrip(parseInt(req.params.id), connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});
