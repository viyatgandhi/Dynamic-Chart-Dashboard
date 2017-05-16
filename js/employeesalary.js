instance=null;
class EmployeeSalary extends Data {
  constructor() {
    super("data/employeesalary.csv");
  }
  
  static getInstance(){
	  if(instance==null){
		  instance=new EmployeeSalary();
	  }
	  return instance;
  }


  getData() {
    DataFrame.fromCSV(this.link).then(df => {
      cdf = {
        "dfobj": df
      };
    });
  }

  getdf() {
    return cdf["dfobj"];
  }

  getfiltercolumsdata() {
    return ['Position Title', 'Department']

  }

  getfilterrowsdata() {
    return ['Employee Annual Salary']
  }

  isdatetypecol(cname) {
    return false
  }

  iscoltypestack(cname) {
    return false
  }

  isstacksupport() {
    return false
  }

}
