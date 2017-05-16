var charttype = "";

function setChartType() {
  if (document.getElementById("filtercolumns").style.display == "none") {
    charttype = document.getElementById("chartTypeDropdownMenu").value;
    var theDiv = document.getElementById("chartTypeSelected");
    if (theDiv != null) {
      theDiv.innerHTML += 'Chart Type Selected: ' + charttype;
    }
    document.getElementById("filtercolumns").style.display = "inline-block";
  } else {
    charttype = document.getElementById("chartTypeDropdownMenu").value;
    if (document.getElementById('chartTypeSelected') != null) {
      document.getElementById('chartTypeSelected').remove();
    }

    var theDiv = document.getElementById("showcharttype");
    if (theDiv != null) {
      theDiv.innerHTML += '<p class="h6" id="chartTypeSelected"></p>';
    }

    var theDiv = document.getElementById("chartTypeSelected");
    if (theDiv != null) {
      theDiv.innerHTML += 'Chart Type Selected: ' + charttype;
    }
  }
  var strategy = new ChartStrategy(charttype);
  var filter = new FilterColumns();
  filter.getFilter();

  if (charttype != "Stacked Chart") {
    document.getElementById("columnstackfiltertype").style.display = "none";
    document.getElementById("filtercstackolumns").style.display = "none";
  } else if (charttype == "Stacked Chart" && dataobj.isstacksupport()) {
    document.getElementById("filtercstackolumns").style.display = "inline-block";
  }

  if (stackcols.length > 0 && charttype == "Stacked Chart" && dataobj.isstacksupport()) {
    document.getElementById("columnstackfiltertype").style.display = "inline-block";
    document.getElementById("filtercstackolumns").style.display = "inline-block";
  }

}
