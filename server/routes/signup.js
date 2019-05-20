import express from 'express';
import signupControllers from '../controllers/signup';

const router = express.Router();

router.post('/', signupControllers.register);

export default router;
