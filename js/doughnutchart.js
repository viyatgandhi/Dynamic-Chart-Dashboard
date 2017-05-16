class DoughnutChart extends SuperChart {

  display(labels, clv, cdata, sumdata, colv, rowv) {
    var ctx = document.getElementById(mchartdiv);
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      responsive: true,
      data: {
        labels: labels,
        datasets: [{
          label: colv,
          data: cdata,
          backgroundColor: poolColors(cdata.length),
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: colv + ' vs. ' + rowv + ' ' + charttype
        }
      }
    });
    document.getElementById(mchartdiv).scrollIntoView();
  }
}
