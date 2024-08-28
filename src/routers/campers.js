import { Router } from 'express';
import {
  getCampersController,
  getCampercByIdController,
  createCamperController,
  patchCamperController,
  deleteCamperController,
} from '../controllers/campers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createCamperSchema,
  upDateCamperSchema,
} from '../validation/campers.js';

import { isValidId } from '../middleware/isValidId.js';
const router = Router();

router.get('/campers', ctrlWrapper(getCampersController));
router.get(
  '/campers/:camperId',
  isValidId,
  ctrlWrapper(getCampercByIdController),
);
router.post(
  '/campers',
  validateBody(createCamperSchema),
  ctrlWrapper(createCamperController),
);
router.patch(
  '/campers/:camperId',
  validateBody(upDateCamperSchema),
  ctrlWrapper(patchCamperController),
);
router.delete(
  '/campers/:camperId',
  isValidId,
  ctrlWrapper(deleteCamperController),
);
export default router;
