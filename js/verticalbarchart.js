class VerticalBarChart extends BarChart {

  display(labels, clv, cdata, sumdata, colv, rowv) {
    var ctx = document.getElementById(mchartdiv);
    var myChart = new Chart(ctx, {
      type: 'bar',
      responsive: true,
      data: {
        labels: labels,
        datasets: [{
          label: clv,
          data: cdata,
          backgroundColor: poolColors(cdata.length),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
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
