instance=null;
class Payment extends Data {

  constructor() {
    super("data/payment.csv");
  }
  
  static getInstance(){
	  if(instance==null){
		  instance=new Payment();
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
    return ["Check Date", "DEPARTMENT NAME", "CONTRACT NUMBER", "VENDOR NAME"]

  }

  getfilterrowsdata() {
    return ["AMOUNT"]
  }

  isdatetypecol(cname) {
    if (cname == "Check Date") {
      return true
    } else {
      return false
    }
  }

  getdatetypestr() {
    return "MM-DD-YYYY"
  }

  iscoltypestack(cname) {
    return true
  }

  getstackcol() {
    return ["DEPARTMENT NAME"]
  }

  isstacksupport() {
    return true
  }

}
