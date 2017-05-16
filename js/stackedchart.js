class StackedChart extends SuperChart {

  display(labels, clv, cdata, sumdata, colv, rowv) {
    var ctx = document.getElementById(mchartdiv);
    var myChart = new Chart(ctx, {
      type: 'bar',
      responsive: true,
      data: {
        labels: labels,
        datasets: cdata
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                if (sumdata) {
                  return value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                  });
                } else {
                  return value
                }
              }
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: colv + ' vs. ' + rowv + ' ' + charttype
        }
      }
    });
    document.getElementById(mchartdiv).scrollIntoView();
  }
}
