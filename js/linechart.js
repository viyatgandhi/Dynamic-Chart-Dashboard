class LineChart extends SuperChart {

  display(labels, clv, cdata, sumdata, colv, rowv) {
    var ctx = document.getElementById(mchartdiv);
    var myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: labels,
        datasets: [{
          label: colv,
          data: cdata,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: colv + ' vs. ' + rowv + ' ' + charttype
        },
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
        }
      }
    });
    document.getElementById(mchartdiv).scrollIntoView();
  }
}
