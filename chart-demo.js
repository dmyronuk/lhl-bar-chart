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
  barLabelColor:"green",
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
  width:525,
  height:450,
  title:"Daily Power Consumption",
  titleFontSize:27,
  titleColor:"black",
  barSpacing:20,
  displayBarOutlines:true,
  barValPosition:"center",
  barValColor:"black",
  stackedBarLegend:["Air Conditioning", "Lighting", "Appliances", "Misc", ],
  stackedBarColors:["blue", "#e6e600", "orange",  "red"],
  displayGrid:false,
  yAxisLabel:"Power",
  yAxisUnits:"kWh"
};
let data3 = [
  {value:[8,3,2,2], label:"Mon"},
  {value:[7,2,4,1], label:"Tues"},
  {value:[6,3,5,2], label:"Wed"},
  {value:[6,2,3,1], label:"Thurs"},
  {value:[4,4,4,3], label:"Fri"},
  ];
drawBarChart(data3, options3, "C3" );


let options4 = {
  width:525,
  height:450,
  title:"Sales By Product Category",
  titleFontSize:27,
  titleColor:"black",
  displayGrid:true,
  barSpacing:15,
  barColor:"blue",
  barValColor:"white",
  stackedBarLegend:["Category A", "Category B", "Category C", "Category D"],
  stackedBarColors:["#3b4274", "#62678f", "#b0b3c7", "#c4c6d5"],
  yAxisLabel:"Units Sold",
};
let data4 = [
  {value:[22,43,35,29], label:"Jan"},
  {value:[31,18,67,46], label:"Feb"},
  {value:[51,35,44,52], label:"Mar"},
  {value:[25, 42, 38, 82], label:"Apr"},
  {value:[47,42, 45,31], label:"May"},
  {value:[27,32,65,21], label:"June"},
  {value:[37,22,45,11], label:"July"},
  {value:[46,27,50,13], label:"Aug"},
  ];
drawBarChart(data4, options4, "C4" );

let options5 = {};
let data5 = [{value:[10, 15, 18], label:"barA"}, {value:[8, 5, 13], label:"barB"}];
drawBarChart(data5, "C5");