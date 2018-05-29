let options1 = {
  width:600,
  height:400,
  title:"Canadian Home Prices April 2018",
  titleFontSize:24,
  barColor:"#ff6f69",
  barSpacing:20,
  barValColor:"white",
  barValPosition:"center",
  displayValCommas:true,
  yAxisLabel:"Benchmark Price",
  yAxisUnits:("$"),
};
let data1 = [
  {value:1000900, label:"Vancouver"},
  {value:430700, label:"Calgary"},
  {value:334400, label:"Edmonton"},
  {value:766300, label:"Toronto"},
  {value:382000,  label:"Ottawa"},
  {value:341300,  label:"Montreal"},
];
drawBarChart(data1, options1, "C1" );

let options2 = {
  width:450,
  height:400,
  title:"Canada CPI Inflation",
  titleFontSize:24,
  barColor:"blue",
  barValPosition:"top",
  barSpacing:15,
  barValColor:"blue",
  barLabelColor:"blue",
  displayBarOutlines:true,
  yAxisLabel:"Percent",
  yAxisUnits:("%"),
  tickDecimalPlaces:1,
  displayGrid:false,
};
let data2 = [
  {value:1.1, label:"2012"},
  {value:0.9, label:"2013"},
  {value:2.0, label:"2014"},
  {value:1.1, label:"2015"},
  {value:1.4, label:"2016"},
  {value:1.6,  label:"2017"},
];
drawBarChart(data2, options2, "C2" );

let options3 = {
  width:500,
  height:500,
  title:"Graph B",
  titleFontSize:35,
  titleColor:"darkblue",
  barSpacing:15,
  displayBarOutlines:true,
  barValPosition:"center",
  barValColor:"white",
  stackedBarLegend:["Legend A", "Legend B", "Legend C", "Legend D"],
  stackedBarColors:["red", "orange", "yellow", "blue"],
  displayGrid:false,
  yAxisLabel:"Total Daily Sales",
};
let data3 = [[2,6,4,2], [3,1,2,2], [5,3,2,5], [4,4,7,3], [3,6,1,1]];
drawBarChart(data3, options3, "C3" );


let options4 = {
  width:300,
  height:500,
  title:"Graph D",
  titleFontSize:35,
  titleColor:"darkblue",
  displayGrid:true,
  barSpacing:15,
  barColor:"blue",
  barValColor:"white",
  stackedBarColors:["#3b4274", "#62678f", "#b0b3c7", "#c4c6d5"],
  yAxisLabel:"Total Daily Sales",
};
let data4 = [[2,6,4,2], [3,1,2,2], [5,3,2,5], [4,4,7,3]];
drawBarChart(data4, options4, "C4" );

let options5 = {};
let data5 = [{value:[10, 15, 18], label:"barA"}, {value:[8, 5, 13], label:"barB"}];
drawBarChart(data5, "C5");