var DataFrame = dfjs.DataFrame;
var showNext = true;
var dataset;
var col;
var rowdata;
var gdf;
var dataobj;

function showLoadingImage(idname) {
  var theDiv = document.getElementById(idname);
  theDiv.innerHTML += '<div id="loading-msg"><p class="small">Please wait, Loading...</p></div>';
}

function hideLoadingImage() {
  if (document.getElementById('loading-msg') != null) {
    document.getElementById('loading-msg').remove();
  }
}

function getDataSetVal() {
  return document.getElementById("dataSetDropdownMenu").value;
}

function import_data() {
  if ($.fn.dataTable.isDataTable('#table')) {
    alert("To select another dataset please refresh page...!") ? "" : location.reload(true);
    showNext = false;
  } else {
    showLoadingImage('showDataset');
  }

  dataset = document.getElementById("dataSetDropdownMenu").value;
  dataobj = LoadDataSetFactory.loadData(dataset);
  dataobj.getData();
  setTimeout(showdata, 4000, dataobj);
}

function showdata(data) {
  var df = data.getdf();
  gdf = df;
  col = df.listColumns();
  var dtcol = [];
  rowdata = df.toArray()

  for (var i = 0; i < col.length; i++) {
    dtcol[i] = {
      title: col[i]
    }
  }

  // DataTable only supports jQuery - so we have used jQuery for showdata function
  // https://datatables.net/ you can verify this on website also
  // we have not use jQuery anywhere else in the project

  if (showNext) {
    $('#table').DataTable({
      data: rowdata,
      columns: dtcol,
      searching: false
    });


    hideLoadingImage();
    document.getElementById("chartTypeDropdownMenu").style.display = "inline-block";
  }
}
