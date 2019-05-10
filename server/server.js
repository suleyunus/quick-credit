import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/users';
import loanRoutes from './routes/loans';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use('/api/v1/loans', loanRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
