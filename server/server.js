import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import signUpRoutes from './routes/signup';
import signInRoutes from './routes/signin';
import usersRoutes from './routes/users';
import loanRoutes from './routes/loans';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes which should handle requests
app.use('/api/v1/signup', signUpRoutes);
app.use('/api/v1/signin', signInRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/loans', loanRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`app running on port ${PORT}`);

export default app;
