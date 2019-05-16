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

  updateLoanStatus(newStatus, loanObject) {
    const updatedLoan = {
      loanID: loanObject.loanID,
      firstName: loanObject.firstName,
      lastName: loanObject.lastName,
      email: loanObject.email,
      tenor: loanObject.tenor,
      amount: loanObject.amount,
      paymentInstallment: loanObject.paymentInstallment,
      status: newStatus,
      balance: loanObject.balance,
      interest: loanObject.interest,
      dateCreated: loanObject.dateCreated,
      dateModified: moment.now(),
    };
    this.loans.splice(loanObject.loanID - 1, 1, updatedLoan);
    return updatedLoan;
  }
}

export default new Loans();
