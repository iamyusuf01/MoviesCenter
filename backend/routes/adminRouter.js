import express from 'express'
import verifyJwt, { authorizeRoles } from '../middlewares/authMiddleware.js'
import { addMovies, deleteMovie, updateMovie, updatePoster } from '../controllers/movieController.js'
import {upload} from '../middlewares/multer.js'

const router = express.Router()

router.post('/add-movies',verifyJwt, authorizeRoles('admin'), upload.fields([{ name: "poster", maxCount: 1 }]), addMovies)
router.delete('/movie/:id', verifyJwt, authorizeRoles('admin'), deleteMovie)
router.put('/movie/:id', verifyJwt, authorizeRoles('admin'), updateMovie)
router.post('/update-poster', verifyJwt, authorizeRoles('admin'), upload.single('poster'), updatePoster)

export default router