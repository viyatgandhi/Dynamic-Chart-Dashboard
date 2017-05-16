class MakeChart {

  computeData() {
    var colv = document.getElementById('filtercolumns').value;
    colv = col[colv];
    var rowv = document.getElementById('filterrows').value;
    rowv = col[rowv];

    var chartdf = gdf;

    // check if casting required
    var checkrowv = chartdf.toArray()[1][col.indexOf(rowv)];
    if (!this.isNumber(checkrowv)) {
      chartdf = chartdf.map(row => row.set(rowv, row.get(rowv).substr(1).replace(/,/g, ''))).cast(rowv, Number)
    }

    //row data filtering

    var sumdata = false;
    var clv = "Total Count";

    var rv = document.getElementById('rowfilterval').value;
    if (rv.length > 0) {
      var op = document.getElementById('rowfiltertype').value;
      if (op == "gt") {
        chartdf = chartdf.where(row => row.get(rowv) > rv);
      } else if (op == "lt") {
        chartdf = chartdf.where(row => row.get(rowv) < rv);
      } else if (op == "eq") {
        chartdf = chartdf.where(row => row.get(rowv) == rv);
      }
    } else {
      if (document.getElementById('rowfiltertype').value == "sum") {
        sumdata = true;
        clv = "Total Amount"
      }
    }

    // column data filtering

    if (dataobj.isdatetypecol(colv)) {

      var year = document.getElementsByName('yearchcolval');
      var mon = document.getElementsByName('monthchcolval');

      var smon = this.getCheckedBoxes(mon);
      var sy = this.getCheckedBoxes(year);

      if (sy.length == 0) {
        sy = this.getAllCheckedBoxes(year);
      }

      if (smon.length == 0) {
        smon = this.getAllCheckedBoxes(mon);
      }

      var dtstr = dataobj.getdatetypestr();
      var fcoldata = [];

      for (var i = 0; i < sy.length; i++) {
        var tldfi = chartdf.where(row => moment(row.get(colv), dtstr).get('year') == sy[i]);
        for (var j = 0; j < smon.length; j++) {
          var tldfj = tldfi.where(row => moment(row.get(colv), dtstr).format('MMMM') == smon[j]);
          tldfj = tldfj.map(row => row.set(colv, moment(row.get(colv), dtstr).format('MMM YYYY')));
          fcoldata = fcoldata.concat(tldfj.toArray());
        }
      }

      if (fcoldata.length > 0) {
        var tdf = new DataFrame(fcoldata, col);
        chartdf = tdf;
      }

    } else {
      var allcolvals = document.getElementsByName('chcolval');
      var ucolsvalsel = this.getCheckedBoxes(allcolvals);

      var fcoldata = [];

      for (var i = 0; i < ucolsvalsel.length; i++) {
        var tldf = chartdf.filter(row => row.get(colv) == ucolsvalsel[i]);
        fcoldata = fcoldata.concat(tldf.toArray());
      }

      if (ucolsvalsel.length > 0) {
        var tdf = new DataFrame(fcoldata, col);
        chartdf = tdf;
      }
    }

    var labels = [];
    var cdata = [];
    var d;

    //stack cols get and stack data
    var stc = false;

    if (charttype == "Stacked Chart" && dataobj.isstacksupport()) {
      stc = true;
      if (document.getElementById('warning_msg_stack') != null) {
        document.getElementById('warning_msg_stack').remove();
      }
    } else if (charttype == "Stacked Chart" && !dataobj.isstacksupport()) {
      var theDiv = document.getElementById('chartdiv');
      if (theDiv != null) {
        var ndiv = document.createElement("div");
        ndiv.setAttribute("id",'warning_msg_stack');
        ndiv.setAttribute("style","margin-top:10px");
        var pid = document.createElement("p");
        pid.setAttribute("class","h4");
        var td = document.createTextNode('Info: Selected Dataset and option does not have proper data to show for stacked chart instead it will show a Bar chart');
        pid.appendChild(td);
        ndiv.append(pid);
        theDiv.append(ndiv);
      }
    } else {
      if (document.getElementById('warning_msg_stack') != null) {
        document.getElementById('warning_msg_stack').remove();
      }
    }


    var scols = document.getElementsByName('chcolvals');
    var scolvals = [];
    if (scols.length > 0) {
      scolvals = this.getCheckedBoxes(scols);
    }

    if (stc && scolvals.length == 0) {
      scolvals = this.getAllCheckedBoxes(scols);
    }

    if (stc) {
      d = ["stack"];
      var scoli = document.getElementById('filtercstackolumns').value;
      var scolname = col[scoli];
      for (var i = 0; i < scolvals.length; i++) {
        var incd = null;
        if (sumdata) {
          incd = chartdf.filter(row => row.get(scolname) == scolvals[i]).groupBy(colv).aggregate((group) => group.stat.sum(rowv)).toArray();
        } else {
          incd = chartdf.filter(row => row.get(scolname) == scolvals[i]).groupBy(colv).aggregate((group) => group.count()).toArray();
        }
        var tincd = [];
        for (var j = 0; j < incd.length; j++) {
          tincd.push(incd[j][1]);
        }
        var cdobj = {
          label: scolvals[i],
          data: tincd,
          backgroundColor: poolColors(tincd.length),
          borderWidth: 1
        };
        cdata.push(cdobj);
      }

      var tempdf = chartdf.groupBy(colv).aggregate((group) => group.count()).toArray();
      for (var i = 0; i < tempdf.length; i++) {
        labels.push(tempdf[i][0]);
      }

    }
    // final aggregation
    if (!stc) {
      if (sumdata) {
        d = chartdf.groupBy(colv).aggregate((group) => group.stat.sum(rowv)).toArray();
      } else {
        d = chartdf.groupBy(colv).aggregate((group) => group.count()).toArray();
      }
    }

    if (d.length > 0) {

      if (document.getElementById('nochartdata') != null) {
        document.getElementById('nochartdata').remove();
      }

      if (document.getElementById(mchartdiv) != null) {
        document.getElementById(mchartdiv).remove();
      }

      // var labels = [];
      // var cdata = [];
      if (!stc) {
        for (var i = 0; i < d.length; i++) {
          labels.push(d[i][0]);
          cdata.push(d[i][1]);
        }
      }

      if (document.getElementById(mchartdiv) == null) {
        var theDiv = document.getElementById('chartdiv');
        var cid = document.createElement("canvas");
        cid.setAttribute("id",mchartdiv);
        theDiv.append(cid);
      }


      chartObj.display(labels, clv, cdata, sumdata, colv, rowv);
      var showStatObject = new StatisticalMetrices();
      showStatObject.showstatsdata(chartdf);
    } else {
      if (document.getElementById('nochartdata') != null) {
        document.getElementById('nochartdata').remove();
      }

      if (document.getElementById(mchartdiv) != null) {
        document.getElementById(mchartdiv).remove();
      }
      var theDiv = document.getElementById('chartdiv');
      var pid = document.createElement("p");
      pid.setAttribute("class","h5");
      pid.setAttribute("id",'nochartdata');
      var td1 = document.createTextNode('No Chart data to show for ' + charttype + ', please select different values')
      pid.appendChild(td1);
      if (theDiv != null) {
        theDiv.append(pid);
      }

      hidestatsdata();
      document.getElementById('nochartdata').scrollIntoView();
    }

  }

  isNumber(obj) {
    return !isNaN(parseFloat(obj))
  }

  getCheckedBoxes(cblist) {
    var cbvals = [];
    for (var i = 0; i < cblist.length; i++) {
      if (cblist[i].type == 'checkbox' && cblist[i].checked == true) {
        cbvals.push(cblist[i].value);
      }
    }
    return cbvals
  }

  getAllCheckedBoxes(cblist) {
    var cbvals = [];
    for (var i = 0; i < cblist.length; i++) {
      cbvals.push(cblist[i].value);
    }
    return cbvals
  }


}
