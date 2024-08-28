import { model, Schema } from 'mongoose';
const camperSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    form: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    tank: {
      type: String,
      required: true,
    },
    consumption: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    AC: {
      type: Boolean,
      required: true,
    },
    bathroom: {
      type: Boolean,
      required: true,
    },
    kitchen: {
      type: Boolean,
      required: true,
    },
    TV: {
      type: Boolean,
      required: true,
    },
    radio: {
      type: Boolean,
      required: true,
    },
    refrigerator: {
      type: Boolean,
      required: true,
    },
    microwave: {
      type: Boolean,
      required: true,
    },
    AC: {
      type: Boolean,
      required: true,
    },
    gas: {
      type: Boolean,
      required: true,
    },
    water: {
      type: Boolean,
      required: true,
    },
    gallery: {
      type: Array,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const campersCollection = model('campers', camperSchema);
