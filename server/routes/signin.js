import express from 'express';
import signinControllers from '../controllers/signin';

const router = express.Router();

router.post('/', signinControllers.login);

export default router;
