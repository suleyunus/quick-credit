import express from 'express';
import signupControllers from '../controllers/signup';
import validate from '../middlewares/validator';

const router = express.Router();

router.post('/', validate.signup, signupControllers.register);

export default router;
