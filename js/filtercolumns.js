var filtercols = [];
var stackcols = [];
class FilterColumns extends Filter {

  getFilter() {
    if (filtercols.length == 0) {
      filtercols = dataobj.getfiltercolumsdata();
      for (var i = 0; i < filtercols.length; i++) {
        var theDiv = document.getElementById('filtercolumns');
        if (theDiv != null) {
          theDiv.innerHTML += '<option href="#" value=' + col.indexOf(filtercols[i]) + '>' + filtercols[i] + '</option>';
        }
      }
    }
    var filter = new FilterRows();
    filter.getFilter();
  }

  getfiltercolumsdata(type) {

    var colvi;
    var colv;

    if (type == "stack") {
      colvi = document.getElementById('filtercstackolumns').value;
      colv = col[colvi];
    } else {
      colvi = document.getElementById('filtercolumns').value;
      colv = col[colvi];
    }

    if (dataobj.isdatetypecol(colv) && type != "stack") {
      if (document.getElementById('colcbsdiv') != null) {
        document.getElementById('colcbsdiv').remove();
      }

      if (document.getElementById('colcbsdivyear') != null) {
        document.getElementById('colcbsdivyear').remove();
      }

      if (document.getElementById('colcbsdivmonth') != null) {
        document.getElementById('colcbsdivmonth').remove();
      }

      var theDiv = document.getElementById('columnfiltertype');
      if (theDiv != null) {
        theDiv.innerHTML += '<div class="checkbox" id="colcbsdivyear">Years: </div>';
      }
      var theDiv = document.getElementById('columnfiltertype');
      if (theDiv != null) {
        theDiv.innerHTML += '<div class="checkbox" id="colcbsdivmonth">Months: </div>';
      }


      var dtstr = dataobj.getdatetypestr();

      var yearset = new Set();
      var monthset = new Set();
      var dtobj = {};

      for (var i = 0; i < rowdata.length; i++) {
        dtobj[i] = moment(rowdata[i][colvi], dtstr);
        yearset.add(dtobj[i].get('year'));
        monthset.add(dtobj[i].format('MMMM'));
      }

      var years = Array.from(yearset);
      var months = Array.from(monthset);

      for (var i = 0; i < years.length; i++) {
        var theDiv = document.getElementById('colcbsdivyear');
        if (theDiv != null) {
          theDiv.innerHTML += '<label><input type="checkbox" name="yearchcolval" value="' + years[i] + '" id=ucol' + i + '>' + years[i] + '</label><label></label>';
        }
      }

      for (var i = 0; i < months.length; i++) {
        var theDiv = document.getElementById('colcbsdivmonth');
        if (theDiv != null) {
          theDiv.innerHTML += '<label><input type="checkbox" name="monthchcolval" value="' + months[i] + '" id=ucol' + i + '>' + months[i] + '</label><label></label>';
        }
      }

      document.getElementById("columnfiltertype").style.display = "inline-block";

    } else {
      if (type == "stack" && charttype == "Stacked Chart") {

        if (document.getElementById('colcbsdivstack') != null) {
          document.getElementById('colcbsdivstack').remove();
        }

        var theDiv = document.getElementById('columnstackfiltertype');
        if (theDiv != null) {
          theDiv.innerHTML += '<div class="checkbox" id="colcbsdivstack"></div>';
        }

        var allucolsval = gdf.distinct(colv).toArray();
        var ucolsval = [].concat.apply([], allucolsval);
        for (var i = 0; i < ucolsval.length; i++) {
          var theDiv = document.getElementById('colcbsdivstack');
          if (theDiv != null) {
            theDiv.innerHTML += '<label><input type="checkbox" name="chcolvals" value="' + ucolsval[i] + '" id=ucol' + i + '>' + ucolsval[i] + '</label><label></label>';
          }
        }
        document.getElementById("filtercstackolumns").style.display = "inline-block";
        document.getElementById("columnstackfiltertype").style.display = "inline-block";
      } else {
        document.getElementById("columnstackfiltertype").style.display = "none";
        document.getElementById("filtercstackolumns").style.display = "none";

        if (document.getElementById('colcbsdiv') != null) {
          document.getElementById('colcbsdiv').remove();
        }

        if (document.getElementById('colcbsdivyear') != null) {
          document.getElementById('colcbsdivyear').remove();
        }

        if (document.getElementById('colcbsdivmonth') != null) {
          document.getElementById('colcbsdivmonth').remove();
        }

        var theDiv = document.getElementById('columnfiltertype');
        if (theDiv != null) {
          theDiv.innerHTML += '<div class="checkbox" id="colcbsdiv"></div>';
        }



        var allucolsval = gdf.distinct(colv).toArray();
        var ucolsval = [].concat.apply([], allucolsval);
        for (var i = 0; i < ucolsval.length; i++) {
          var theDiv = document.getElementById('colcbsdiv');
          if (theDiv != null) {
            theDiv.innerHTML += '<label><input type="checkbox" name="chcolval" value="' + ucolsval[i] + '" id=ucol' + i + '>' + ucolsval[i] + '</label><label></label>';
          }
        }
        document.getElementById("columnfiltertype").style.display = "inline-block";
      }
    }

    if (dataobj.iscoltypestack(colv) && type != "stack") {
      if (stackcols.length == 0 && charttype == "Stacked Chart") {
        stackcols = dataobj.getstackcol();
        for (var i = 0; i < stackcols.length; i++) {
          var theDiv = document.getElementById('filtercstackolumns');
          if (theDiv != null) {
            theDiv.innerHTML += '<option href="#" value=' + col.indexOf(stackcols[i]) + '>' + stackcols[i] + '</option>';
          }
        }
        document.getElementById("filtercstackolumns").style.display = "inline-block";
      } else if (stackcols.length > 0 && charttype == "Stacked Chart") {
        document.getElementById("filtercstackolumns").style.display = "inline-block";
        document.getElementById("columnstackfiltertype").style.display = "inline-block";
      }
    }
  }

}
