import express from 'express';
import usersControllers from '../controllers/users';

const router = express.Router();

router.patch('/:userEmail', usersControllers.verifyStatus);

export default router;
