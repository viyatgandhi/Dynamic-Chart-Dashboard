var filterrows = [];
class FilterRows extends Filter {

  getFilter() {
    if (filterrows.length == 0) {
      filterrows = dataobj.getfilterrowsdata();
      for (var i = 0; i < filterrows.length; i++) {
        var theDiv = document.getElementById('filterrows');
        theDiv.innerHTML += '<option href="#" value=' + col.indexOf(filterrows[i]) + '>' + filterrows[i] + '</option>';
      }
    }
  }
}
