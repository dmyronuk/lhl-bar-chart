let optionsA = {
  width:600,
  height:400,
  title:"Graph A",
  titleFontSize:30,
  titleColor:"red",
  barSpacing:10,
  barColor:"blue",
  displayBarOutlines:true,
  barValPosition:"center",
  barValColor:"white",
};
let dataA = [300, 90, 1005, 450, 627];
drawBarChart(dataA, optionsA, "main-container" );

let optionsB = {
  width:400,
  height:600,
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
};
let dataB = [[2,6,4,2], [3,1,2,2], [5,3,2,5], [4,4,7,3]];
drawBarChart(dataB, optionsB, "main-container" );

let optionsC = {
  width:500,
  height:500,
  title:"Graph C",
  titleFontSize:35,
  titleColor:"darkblue",
  barSpacing:15,
  barValColor:"red",
  barValPosition:"top",
  barLabelColor:"blue",
};
let dataC = [
  {value:10, color:"red", label:"Bar A"},
  {value:7, color:"orange", label:"Bar B"},
  {value:8, color:"yellow", label:"Bar C"},
  {value:4, color:"green", label:"Bar D"},
  {value:9, color:"blue", label:"Bar E"},
];
drawBarChart(dataC, optionsC, "main-container" );

let optionsD = {
  width:400,
  height:600,
  title:"Graph D",
  titleFontSize:35,
  titleColor:"darkblue",
  barSpacing:15,
  barColor:"blue",
  barValPosition:"center",
  barValColor:"white",
  stackedBarLegend:["Legend A", "Legend B", "Legend C", "Legend D"],
  stackedBarColors:["#3b4274", "#62678f", "#b0b3c7", "#c4c6d5"],
  displayGrid:false,
};
let dataD = [
  {value:[2,6,4,2], color:"red", label:"Stack A"},
  {value:[3,1,2,2], color:"orange", label:"Stack B"},
  {value:[5,3,2,5], color:"yellow", label:"Stack C"},
  {value:[4,4,7,3], color:"green", label:"Stack D"},
];
drawBarChart(dataD, optionsD, "main-container" );

let optionsE = {};
let dataE = [100, 45, 23, 87, 92];
drawBarChart(dataE, "main-container");