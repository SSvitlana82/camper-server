import mongoose from 'mongoose';
import { campersCollection } from '../db/models/camper.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllCampers = async ({
  page = 1,
  perPage = 4,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const campersQuery = campersCollection.find();
  if (filter.location) {
    campersQuery.where('location').regex(new RegExp(filter.location, 'i'));
  }

  if (filter.details) {
    filter.details.forEach((detail) => {
      campersQuery.where(`details.${detail}`).gt(0);
    });
  }
  if (filter.form) {
    campersQuery.where(`form`).in(filter.form);
  }
  const campersCountPromise = campersCollection
    .find()
    .merge(campersQuery)
    .countDocuments();

  const campersPromise = campersQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const [campersCount, campers] = await Promise.all([
    campersCountPromise,
    campersPromise,
  ]);

  const paginationData = calculatePaginationData(campersCount, page, perPage);

  return {
    data: campers,
    ...paginationData,
  };
};

export const getCamperById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('its not correct id');
  }
  const camper = await campersCollection.findById(id);
  return camper;
};

export const createCamper = async (payload) => {
  const camper = await campersCollection.create(payload);
  return camper;
};

export const updateCamper = async (camperId, payload, options = {}) => {
  const rawResult = await campersCollection.findOneAndUpdate(
    { _id: camperId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    camper: rawResult.value,
    isnew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteCamper = async (camperId) => {
  if (!mongoose.Types.ObjectId.isValid(camperId)) {
    throw new Error('its not correct id');
  }
  const camper = await campersCollection.findOneAndDelete({ _id: camperId });
  return camper;
};
