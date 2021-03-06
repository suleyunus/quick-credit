import express from 'express';
import LoansControllers from '../controllers/loansControllers';
import Auth from '../middlewares/auth';

const router = express.Router();

router.get('/', LoansControllers.getAllLoans);

router.get('/:loanID', LoansControllers.getLoanByID);

router.post('/', Auth.verifyToken, LoansControllers.createLoan);

router.patch('/:loanID', LoansControllers.approveReject);

router.post('/:loanID/repayment', LoansControllers.postPayment);

router.get('/:loanID/repayments', LoansControllers.getRepaymentByID);

export default router;
