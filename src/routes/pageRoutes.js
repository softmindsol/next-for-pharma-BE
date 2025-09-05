import express from "express";
import { getPage, updatePage } from "../controllers/pageController.js";
import { protect } from "../middleware/auth.js";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    origin: "*", // or specify your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
router.get("/:slug", getPage);
router.put("/:slug", protect, updatePage);

export default router;
