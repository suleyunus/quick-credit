import moment from 'moment';

class Repayments {
  constructor() {
    this.repayments = [];
  }

  createRepayment(loan, paidAmount) {
    console.log('I am creating a new repayment');
    const newBalance = parseFloat(loan.amount) - parseFloat(paidAmount);
    const newRepayment = {
      id: loan.id,
      loanID: loan.loanID,
      firstName: loan.firstName,
      lastName: loan.lastName,
      dateCreated: loan.dateCreated,
      amount: loan.amount,
      paidAmount,
      balance: newBalance,
    };
    this.repayments.push(newRepayment);
    return newRepayment;
  }

  postRepayment(loan, paidAmount) {
    console.log('I am updating a repayment');
    const newBalance = parseFloat(loan.balance) - parseFloat(paidAmount);
    const index = this.repayments.findIndex(repayment => repayment.loanID === loan.loanID);
    const updatedRepayment = {
      id: loan.id,
      loanID: loan.loanID,
      dateCreated: loan.dateCreated,
      amount: loan.amount,
      paidAmount,
      balance: newBalance,
    };
    this.repayments.splice(index, 1, updatedRepayment);
    return updatedRepayment;
  }

  getRepaymentByID(id) {
    return this.repayments.find(repayment => repayment.loanID === id);
  }
}

export default new Repayments();