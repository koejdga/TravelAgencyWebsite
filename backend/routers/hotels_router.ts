import { connectToDatabase } from "../db_connection";
import { Router } from "express";
import { getFailureResponse, getSuccessResponse } from "../responses";
import {
  addHotel,
  deleteHotel,
  getHotels,
  updateHotel,
} from "../database_queries";
import { authentication } from "../middleware/authentication";
import { getInsertId } from "../utils";

export const hotelsRouter = Router();

hotelsRouter.get("/", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = await getHotels(connection);

    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

hotelsRouter.post("/", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = addHotel(req.body, connection);
    const insertId = getInsertId(results);

    res.json(getSuccessResponse(results, { ...req.body, id: insertId }));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

hotelsRouter.put("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = updateHotel(parseInt(req.params.id), req.body, connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});

hotelsRouter.delete("/:id", authentication, async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const results = deleteHotel(parseInt(req.params.id), connection);
    res.json(getSuccessResponse(results));
  } catch (err: any) {
    console.log(err);
    res.json(getFailureResponse(err));
  }
});
