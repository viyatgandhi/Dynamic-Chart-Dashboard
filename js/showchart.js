function showChart() {
  makeChart = new MakeChart();
  makeChart.computeData();

}

var poolColors = function(a) {
  var pool = [];
  for (i = 0; i < a; i++) {
    pool.push(dynamicColors());
  }
  return pool;
}

var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.5)";
}

function showFilterRows() {
  var filtercolumn = new FilterColumns();
  filtercolumn.getfiltercolumsdata('nostack');
  var theDiv = document.getElementById("filtercolumnsSelected");
  if (theDiv != null) {
      theDiv.innerHTML += 'Chart Type Selected: ' + charttype;
  }
  document.getElementById("filterrows").style.display = "inline-block";
  //document.getElementById("chartTypeDropdownMenu").disabled=true;s
}

function showstackrows() {
  var filtercolumn = new FilterColumns();
  filtercolumn.getfiltercolumsdata('stack');
}



function showRowRange() {
  document.getElementById("rowfiltertype").style.display = "inline-block";
  document.getElementById("rowfilterval").style.display = "inline-block";
  document.getElementById("graphshowbutton").style.display = "inline-block";
  showStats();
}

function checksumsel() {
  if (document.getElementById('rowfiltertype').value == "sum") {
    document.getElementById("rowfilterval").value = "";
    document.getElementById('rowfilterval').placeholder = "N/A for Sum";
    document.getElementById('rowfilterval').disabled = true;
  } else {
    document.getElementById('rowfilterval').disabled = false;
    document.getElementById('rowfilterval').placeholder = "enter value to filter";
  }
}
