var chartObj;
var mchartdiv;

class ChartStrategy {
  constructor(charttype) {
    this.charttype = charttype;
    this.selectChart(this.charttype);
  }

  selectChart(charttype) {
    if (charttype == "Vertical Bar Chart") {
      chartObj = new Plot(new VerticalBarChart());
      mchartdiv = "vbarchart";
    } else if (charttype == "Horizontal Bar Chart") {
      chartObj = new Plot(new HorizontalBarChart());
      mchartdiv = "hbarChart";
    } else if (charttype == "Pie Chart") {
      chartObj = new Plot(new PieChart());
      mchartdiv = "piechart";
    } else if (charttype == "Line Chart") {
      chartObj = new Plot(new LineChart());
      mchartdiv = "linechart";
    } else if (charttype == "Polar Area Chart") {
      chartObj = new Plot(new PolarAreaChart());
      mchartdiv = "paChart";
    } else if (charttype == "Doughnut Chart") {
      chartObj = new Plot(new DoughnutChart());
      mchartdiv = "dtchart";
    } else if (charttype == "Stacked Chart" && dataobj.isstacksupport()) {
      chartObj = new Plot(new StackedChart());
      mchartdiv = "stchart";
    } else if (charttype == "Stacked Chart" && !dataobj.isstacksupport()) {
      chartObj = new Plot(new VerticalBarChart());
      mchartdiv = "stchart";
    }
  }
}
