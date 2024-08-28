import { Router } from 'express';
import {
  getCampersController,
  getCampersByIdController,
} from '../controllers/campers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { isValidId } from '../middleware/isValidId.js';
const router = Router();

router.get('/campers', ctrlWrapper(getCampersController));
router.get(
  '/campers/:camperId',
  isValidId,
  ctrlWrapper(getCampersByIdController),
);

export default router;
