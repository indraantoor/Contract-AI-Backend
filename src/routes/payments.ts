import express from "express";
import {
  createCheckoutSession,
  getPremiumStatus,
} from "../controllers/payment.controller";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/create-checkout-session", isAuthenticated, createCheckoutSession);
router.get("/membership-status", isAuthenticated, getPremiumStatus);

export default router;
