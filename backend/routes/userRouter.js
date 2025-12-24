import express from 'express'
import { getUserData, isAuthenticate, login, logout, refreshAccessToken, registerUser, resetPassword, updateUserRole } from '../controllers/userController.js';
import verifyJwt, { authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/logout', verifyJwt, logout)
router.post('refresh-token', refreshAccessToken)
router.post('/change-password' , resetPassword)
router.get('/is-auth', verifyJwt, isAuthenticate)
router.get('/current-user', verifyJwt, getUserData)
// router.post('/update-role', verifyJwt, authorizeRoles('admin'), updateUserRole)

export default router