import express from "express";
import {
  analyzeContract,
  detectAndConfirmContractType,
  uploadMiddleware,
} from "../controllers/contract.controller";
import { isAuthenticated } from "../middleware/auth";
import { handleErrors } from "../middleware/errors";

const router = express.Router();

router.post(
  "/detect-type",
  isAuthenticated,
  uploadMiddleware,
  handleErrors(detectAndConfirmContractType)
);

router.post(
  "/analyze",
  isAuthenticated,
  uploadMiddleware,
  handleErrors(analyzeContract)
);

export default router;
