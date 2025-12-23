import { uploadOnCloudinary } from "../config/cloudinary";
import Movie from "../models/movies.model";

export const addMovies = async (req, res) => {
  try {
    const { title, description, duration, ageRating, releaseYear } = req.body;
    if (!title || !description || !duration || !ageRating || !releaseYear) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const posterLocalPath = req.files?.avatar?.[0]?.path;
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

export const getAllMovies = async (res) => {
  try {
    const movies = await Movie.find();
    if (!movies) {
      return res.json({
        success: false,
        message: "Movies not found",
      });
    }

    return res.json({
      succes: true,
      message: "Fetching all movies successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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

    const movie = await Movie.findByIdAndUpdate(movieId, {
      title,
      description,
      duration,
      poster: poster.url,
    });

    return res.json({
      success: true,
      message: "Movie updated successfully",
      movie,
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
    const {movieId} = req.body;
    if(!movieId){
        return res.json({
            success: false,
            message: 'Movie Id no found'
        })
    }

    const movie = await Movie.findByIdAndDelete(movieId, {})
    if(!movie){
        return res.json({
            success: false,
            message: 'movie not found'
        })
    }
    
    return res.json({
        success: false,
        message: 'delete movie successfully',
        movie
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
