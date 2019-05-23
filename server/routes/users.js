import express from 'express';
import UsersControllers from '../controllers/usersControllers';

const router = express.Router();

router.patch('/:userEmail/verify', UsersControllers.verifyUser);

export default router;
