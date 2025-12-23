import express from 'express'
import verifyJwt from '../middleware/auth.middleware.js'
import { addMovies, deleteMovie, getAllMovies, updateMovie } from '../controllers/movie.controller.js'

const router = express.Router()

router.post('/add-movies',verifyJwt, addMovies)
router.delete('/delete-movie', verifyJwt, deleteMovie)
router.get('/all-movies', getAllMovies)
router.put('/update-movies', verifyJwt, updateMovie)

export default router