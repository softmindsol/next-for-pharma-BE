import express from "express";
import { getPage, updatePage } from "../controllers/pageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:slug", getPage);
router.put("/:slug", protect, updatePage);

export default router;
