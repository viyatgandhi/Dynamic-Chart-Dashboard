class StatisticalMetrices {


  showstatsdata(sdf) {

    var statscbs = document.getElementsByName('statsval');
    var stl = this.getCheckedBoxesStats(statscbs);

    if (stl.length == 0) {
      hidestatsdata();
    } else {
      var rowv = document.getElementById('filterrows').value;
      rowv = col[rowv];

      var dmax = sdf.stat.max(rowv);
      var dmin = sdf.stat.min(rowv);
      var davg = sdf.stat.mean(rowv)
      var dsd = sdf.stat.sd(rowv);
      var dcount = sdf.count();

      var statobj = {
        'cbsmin': 'dmin',
        'cbsmax': 'dmax',
        'cbsavg': 'davg',
        'cbssd': 'dsd',
        'cbsc': 'dcount'
      }

      var statobjval = {
        'dmin': dmin.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        }),
        'dmax': dmax.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        }),
        'davg': davg.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        }),
        'dsd': dsd.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        }),
        'dcount': dcount
      }

      var statobjff = {
        'dmin': 'Minimum',
        'dmax': 'Maximum',
        'davg': 'Average',
        'dsd': 'Standard Deviation',
        'dcount': 'Count'
      }

      for (var key of Object.keys(statobj)) {
        if (document.getElementById(key).checked) {
          if (document.getElementById(statobj[key]) != null) {
            document.getElementById(statobj[key]).innerHTML = statobjff[statobj[key]] + ': ' + statobjval[statobj[key]];
          } else {
            var theDiv = document.getElementById("showstats");
            if (theDiv != null) {
              theDiv.innerHTML += '<p class="h5" id="' + statobj[key] + '">' + statobjff[statobj[key]] + ': ' + statobjval[statobj[key]] + '</p>';
            }
          }
        } else {
          if (document.getElementById(statobj[key]) != null) {
            if (document.getElementById(statobj[key]) != null) {
              document.getElementById(statobj[key]).remove();
            }
          }
        }
      }

      document.getElementById("showstats").style.display = "inline-block";
    }
  }

  getCheckedBoxesStats(cblist) {
    var cbvals = [];
    for (var i = 0; i < cblist.length; i++) {
      if (cblist[i].type == 'checkbox' && cblist[i].checked == true) {
        cbvals.push(cblist[i].value);
      }
    }
    return cbvals
  }

}
