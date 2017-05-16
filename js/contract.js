let instance=null;
class Contract extends Data {
  constructor() {
    super("data/contract.csv");
  }

  static getInstance(){
	  if(instance==null){
		  instance=new Contract();
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
    return ["Contract Type", "Approval Date", "Department", "Vendor Name", "Vendor ID", "City", "State", "Zip"]

  }

  getfilterrowsdata() {
    return ["Award Amount"]
  }

  isdatetypecol(cname) {
    if (cname == "Approval Date") {
      return true
    } else {
      return false
    }
  }

  getdatetypestr() {
    return "MM/DD/YY"
  }

  iscoltypestack(cname) {
    return true
  }

  getstackcol() {
    return ["City", "State", "Zip", "Department"]
  }

  isstacksupport() {
    return true
  }

}
