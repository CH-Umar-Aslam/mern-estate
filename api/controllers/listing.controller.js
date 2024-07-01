import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.util.js";

export const createListing = async (req, res, next) => {
  try {

    const listing = await Listing.create(req.body);
    if (!listing) return next(errorHandler(401, "listing failed"));
    res.json(listing).status(200)
  } catch (error) {
    next(error);
  }

}