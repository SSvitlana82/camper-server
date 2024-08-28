import { isValidObjectId } from 'mongoose';

import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { camperId } = req.params;
  if (!isValidObjectId(camperId)) {
    next(createHttpError(404, 'Invalid camper ID format!'));
  }

  next();
};
