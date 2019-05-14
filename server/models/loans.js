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
    this.users.push(newLoan);
    return newLoan;
  }

  getAllLoans() {
    return this.users;
  }

  getLoanByID(id) {
    return this.users.find(user => user.id === id);
  }
}

export default new Loans();
