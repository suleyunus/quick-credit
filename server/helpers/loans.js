class LoansHelper {
  static paymentInstallment(amount, tenor) {
    return ((amount + (0.05 * amount)) / tenor);
  }

  static balance(amount) {
    return (amount + (0.05 * amount));
  }

  static interest(amount) {
    return (amount * 0.05);
  }
}

export default LoansHelper;
