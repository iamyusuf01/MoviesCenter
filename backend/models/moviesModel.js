import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      max: 10,
      min: 0
    },
    ageRating: {
      type: Number,
      required: true
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    poster: {
      type: String, // Cloudinary URL
      required: true,
    },
     description: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);



const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;