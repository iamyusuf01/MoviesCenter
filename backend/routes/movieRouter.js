import express from 'express'
import verifyJwt from '../middlewares/authMiddleware.js'
import { addMovies, deleteMovie, getAllMovies, updateMovie } from '../controllers/movieController.js'

const router = express.Router()

router.post('/add-movies',verifyJwt, addMovies)
router.delete('/delete-movie', verifyJwt, deleteMovie)
router.get('/all-movies', getAllMovies)
router.put('/update-movies', verifyJwt, updateMovie)

export default router