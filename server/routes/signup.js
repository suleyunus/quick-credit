import express from 'express';
import usersControllers from '../controllers/usersControllers';

const router = express.Router();

router.post('/', usersControllers.signup);

export default router;
