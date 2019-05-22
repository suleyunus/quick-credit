import express from 'express';
import signinControllers from '../controllers/usersControllers';

const router = express.Router();

router.post('/', signinControllers.signin);

export default router;
