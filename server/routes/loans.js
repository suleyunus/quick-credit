import express from 'express';
import LoansControllers from '../controllers/loansControllers';
import Auth from '../middlewares/auth';

const router = express.Router();

// router.get('/', loansControllers.getLoans);

// router.get('/:loanID', loansControllers.getByID);

router.post('/', Auth.verifyToken, LoansControllers.createLoan);

// router.patch('/:loanID', loansControllers.updateLoanStatus);

// router.post('/:loanID/repayment', loansControllers.createRepayment);

// router.get('/:loanID/repayments', loansControllers.repaymentHistory);

export default router;
