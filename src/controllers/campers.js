import createHttpError from 'http-errors';

import { getAllCampers, getCamperById } from '../services/campers.js';

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

export const getCampersByIdController = async (req, res) => {
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
