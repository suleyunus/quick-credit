import express from 'express';
import loansControllers from '../controllers/loans';

const router = express.Router();

router.get('/', loansControllers.getLoans);

router.get('/:loanID', loansControllers.getByID);

router.post('/', loansControllers.createLoan);

router.patch('/:loanID', loansControllers.updateLoanStatus);

router.post('/:loanID/repayment', loansControllers.createRepayment);

export default router;
