import express from 'express'
import verifyJwt, { authorizeRoles } from '../middlewares/authMiddleware.js'
import { addMovies, deleteMovie, getAllMovies, updateMovie, updatePoster } from '../controllers/movieController.js'
import {upload} from '../middlewares/multer.js'
import { updateUserRole } from '../controllers/userController.js'

const router = express.Router()

router.post('/add-movies',verifyJwt, authorizeRoles('admin'), upload.fields([{ name: "poster", maxCount: 1 }]), addMovies)
router.delete('/movie/:id', verifyJwt, authorizeRoles('admin'), deleteMovie)
router.get('/get-movies', verifyJwt, getAllMovies)
router.put('/movie/:id', verifyJwt, authorizeRoles('admin'), updateMovie)
router.post('/update-poster', verifyJwt, authorizeRoles('admin'), upload.single('poster'), updatePoster)
router.post('/update-role', verifyJwt, authorizeRoles('admin'), updateUserRole)

export default router