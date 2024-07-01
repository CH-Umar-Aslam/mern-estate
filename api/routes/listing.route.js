import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import { createListing } from '../controllers/listing.controller.js';
const listingRouter = express.Router();

listingRouter.post('/create', VerifyUser, createListing);
export default listingRouter