import mongoose from "mongoose"

const listingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    regularPrice: {
      type: Number,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    parking: {
      type: Boolean,
      required: true
    },
    furnished: {
      type: Boolean,
      required: true
    },
    offer: {
      type: Boolean,
      required: true
    },
    userRef: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }

  }, { timestamp: true })

const Listing = mongoose.model('Listing', listingSchema)
export default Listing