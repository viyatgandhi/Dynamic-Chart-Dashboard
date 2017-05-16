class LoadDataSetFactory {
  static loadData(data) {
    if (data == "employeesalary.csv") {
      return EmployeeSalary.getInstance();
    } else if (data == "payment.csv") {
      return Payment.getInstance();
    } else if (data == "budget.csv") {
      return Budget.getInstance();
    } else if (data == "contract.csv") {
      return Contract.getInstance();
    } else if (data == "ordinance.csv") {
      return Ordinance.getInstance();
    }
  }

}
