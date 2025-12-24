import { uploadOnCloudinary } from "../config/cloudinary.js";
import Movie from "../models/moviesModel.js";

export const addMovies = async (req, res) => {
  try {
    const { title, description, duration, ageRating, releaseYear } = req.body;

    if (!title || !description || !duration || !ageRating || !releaseYear) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const posterLocalPath = req.files?.poster?.[0]?.path;
    if (!posterLocalPath) {
      return res.status(400).json({
        success: false,
        message: "poster file missing",
      });
    }

    const poster = await uploadOnCloudinary(posterLocalPath);
    if (!poster?.url) {
      return res.status(400).json({
        success: false,
        message: "upload poster failed, please try again",
      });
    }

    const movie = await Movie.create({
      title,
      description,
      duration,
      ageRating,
      releaseYear,
      poster: poster.url,
    });

    return res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    if (movies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No movies found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all movies successfully",
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { movieId, title, description, duration } = req.body;
    if (!title || !description || !duration) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!movieId) {
      return res.status(401).json({
        success: false,
        message: "Invalid movie Id",
      });
    }

    const movie = await Movie.findByIdAndUpdate(movieId, {
      title,
      description,
      duration,
    });

    return res.json({
      success: true,
      message: "Movie updated successfully",
      movie: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.json({
        success: false,
        message: "Movie Id no found",
      });
    }

    const movie = await Movie.findByIdAndDelete(movieId, {});
    if (!movie) {
      return res.json({
        success: false,
        message: "movie not found",
      });
    }

    return res.json({
      success: false,
      message: "delete movie successfully",
      movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePoster = async (req, res) => {
  try {
    const posterLocalPath = req.file?.path;
    if (!posterLocalPath) {
      return res.json({
        success: false,
        message: "poster file missing",
      });
    }

    const poster = await uploadOnCloudinary(posterLocalPath);
    if (!poster) {
      return res.json({
        success: false,
        message: "Failed to upload poster",
      });
    }

    const movie = await Movie.findByIdAndUpdate(req.user?._id, {
      poster: poster.url,
    });

    return res.status(201).json({
      success: true,
      message: "Poster Upload Successfully",
      movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
    
  }
};

export const getSortedMovies = async (req, res) => {
  try {
    const { sortBy = "name", order = "asc" } = req.query;

    const sortFields = {
      name: "title",
      rating: "rating",
      releaseYear: "releaseYear",
      duration: "duration",
    };

    if (!sortFields[sortBy]) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
      });
    }

    const sortOrder = order === "desc" ? -1 : 1;

    const movies = await Movie.find().sort({
      [sortFields[sortBy]]: sortOrder,
    });

    if (!movies.length) {
      return res.status(404).json({
        success: false,
        message: "No movies found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movies sorted successfully",
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    if (!movies.length) {
      return res.status(404).json({
        success: false,
        message: "No movies found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.messsage
    });
  }
};
