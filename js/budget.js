instance=null;
class Budget extends Data {
  constructor() {
    super("data/budget.csv");
  }
  
   static getInstance(){
	  if(instance==null){
		  instance=new Budget();
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
    return ["FUND TYPE", "DEPARTMENT CODE", "DEPARTMENT DESCRIPTION", "ORGANIZATION CODE", "ORGANIZATION DESCRIPTION", "DIVISION CODE", "DIVISION DESCRIPTION", "SECTION CODE", "SECTION DESCRIPTION", "TITLE CODE", "TITLE DESCRIPTION", "BUDGETED UNIT"]

  }

  getfilterrowsdata() {
    return ["BUDGETED PAY RATE", "TOTAL BUDGETED AMOUNT"]
  }

  isdatetypecol(cname) {
    return false
  }

  iscoltypestack(cname) {
    return true
  }

  getstackcol() {
    return ["BUDGETED UNIT"]
  }

  isstacksupport() {
    return true
  }

}
