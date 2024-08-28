import createHttpError from 'http-errors';

import {
  getAllCampers,
  getCamperById,
  createCamper,
  updateCamper,
  deleteCamper,
} from '../services/campers.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getCampersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const campers = await getAllCampers({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found campers!',
    data: campers,
  });
};

export const getCampercByIdController = async (req, res) => {
  const camperId = req.params.camperId;

  const camper = await getCamperById(camperId);

  if (camper) {
    res.json({
      status: 200,
      data: camper,
      message: `Successfully found camper with id ${camperId}!`,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Not found',
      data: { message: 'Camper not found' },
    });
  }
};

export const createCamperController = async (req, res) => {
  const camper = await createCamper(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a camper!',
    data: camper,
  });
};
export const patchCamperController = async (req, res, next) => {
  const camperId = req.params.camperId;

  const result = await updateCamper(camperId, req.body);

  if (!result) {
    next(createHttpError(404, 'Camper not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a camper!',
    data: result.camper,
  });
};

export const deleteCamperController = async (req, res, next) => {
  const { camperId } = req.params;
  const camper = await deleteCamper(camperId);
  if (!camper) {
    next(createHttpError(404, 'Camper not found'));
    return;
  }

  res.status(204).send();
};
