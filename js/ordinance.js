instance=null;
class Ordinance extends Data {
  constructor() {
    super("data/ordinance.csv");
  }
  
  static getInstance(){
	  if(instance==null){
		  instance=new Ordinance();
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
    return ["ADDRESS", "STREET NUMBER", "STREET DIRECTION", "STREET NAME", "STREET TYPE", "WARD", "ISSUING DEPARTMENT", "HEARING DATE", "CASE DISPOSITION", "VIOLATION CODE"]
  }

  getfilterrowsdata() {
    return ["ADMIN COSTS", "IMPOSED FINE"]
  }

  isdatetypecol(cname) {
    if (cname == "HEARING DATE") {
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
    return ["STREET DIRECTION", "STREET TYPE", "WARD", "CASE DISPOSITION"]
  }

  isstacksupport() {
    return true
  }

}
