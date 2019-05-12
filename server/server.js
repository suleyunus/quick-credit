import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/users';
import loanRoutes from './routes/loans';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes which should handle requests
app.use(router);
app.use('/api/v1/loans', loanRoutes);

// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// })

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   })
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

export default app;
