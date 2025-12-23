import express from 'express'
import { isAuthenticate, login, logout, refreshAccessToken, registerUser, resetPassword } from '../controllers/userController.js';
import verifyJwt from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/logout', verifyJwt, logout)
router.post('refresh-token', refreshAccessToken)
router.post('/change-password' , resetPassword)
router.post('/is-auth', verifyJwt, isAuthenticate)
export default router