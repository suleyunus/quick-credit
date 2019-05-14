import moment from 'moment';

class Loans {
  constructor() {
    this.loans = [];
  }

  generateID() {
    return (this.loans.length + 1);
  }

  postLoan(input) {
    const interestRate = 0.05;
    const interestAmount = interestRate * input.amount;
    const newLoan = {
      loanID: this.generateID(),
      firstName: '',
      lastName: '',
      email: '',
      tenor: input.tenor,
      amount: input.amount,
      paymentInstallment: ((input.amount + interestAmount) / input.tenor),
      status: 'pending',
      balance: input.amount,
      interest: interestAmount,
      dateCreated: moment.now(),
    };
    this.loans.push(newLoan);
    return newLoan;
  }

  getAllLoans() {
    return this.loans;
  }

  getLoanByID(id) {
    return this.loans.find(loan => loan.loanID === id);
  }
}

export default new Loans();
