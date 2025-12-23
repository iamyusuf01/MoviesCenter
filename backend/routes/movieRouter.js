import express from "express";
import {
  getAllMovies,
  getSortedMovies,
  searchMovies,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/sorted", getSortedMovies);

router.get("/search", searchMovies);

export default router;
