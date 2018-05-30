$(document).ready(() => {
  let options1 = {
    width:275,
    height:350,
    backgroundColor:"#e7e8ee",
    barSpacing:8,
    barColor:"#ff6f69",
  };
  let data1 = [4, 7, 8, 12, 9, 6, 5, 2, 1];

  let options2 = {
    width:425,
    height:350,
    backgroundColor:"#feffc2",
    barSpacing:7,
    displayGrid:false,
    displayBarOutlines:true,
    barColor:"#ffbf00",
    barValPosition:"bottom",
    barValColor:"white",
  };
  let data2 = [5000, 2500, 4400, 5650, 3100, 2100];

  let options3 = {
    width:325,
    height:350,
    backgroundColor:"#e7e8ee",
    barColor:"yellow",
    barValPosition:"top",
  };
  let data3 = [
    {value:125, color:"#3b4274"},
    {value:235, color:"#62678f"},
    {value:310, color:"#b0b3c7"},
    {value:420, color:"#c4c6d5"}
  ];

  let options4 = {
    width:600,
    height:400,
    backgroundColor:"white",
    title:"Toronto Average Daily High",
    titleFontSize:28,
    titleColor:"black",
    yAxisLabel:"Temperature",
    yAxisUnits:"\xB0C",
    barSpacing:10,
    barValColor:"white",
    barLabelColor:"blue",
    displayBarOutlines:true,
  };
  let data4 = [
    {value:0, color:"darkblue", label:"Jan"},
    {value:0, color:"darkblue", label:"Feb"},
    {value:5, color:"blue", label:"Mar"},
    {value:12, color:"lightblue", label:"Apr"},
    {value:19, color:"yellow", label:"May"},
    {value:24, color:"orange", label:"June"},
    {value:27, color:"red", label:"July"},
    {value:26, color:"red", label:"Aug"},
    {value:23, color:"orange", label:"Sept"},
    {value:15, color:"yellow", label:"Oct"},
    {value:9, color:"lightblue", label:"Nov"},
    {value:3, color:"blue", label:"Dec"},
  ];

  let options5 = {
    width:450,
    height:400,
    backgroundColor:"white",
    titleFontSize:26,
    title:"Sedan Price Comparison",
    barSpacing:18,
    barValPosition:"center",
    displayValCommas:true,
    baseFontColor:"#223333",
    barValColor:"white",
    yAxisLabel:"Base Price",
    yAxisUnits:"$ CAD",
    displayBarOutlines:true,
  };
  let data5 = [
    {value:51500, label:"BMW 3 Series", color:"#52bf90"},
    {value:32800, label:"Audi A3", color:"#49ab81"},
    {value:43950, label:"Lexus ES", color:"#419873"},
    {value:32800, label:"Mercedes E-Class", color:"#398564"},
  ];

  let options6 = {
    width:525,
    height:475,
    title:"Toronto Raptors Stats",
    titleFontSize:30,
    titleColor:"black",
    yAxisLabel:"Average Per Game 2017-2018",
    barSpacing:20,
    stackedBarColors:["#BE0F34", "#A1A1A4", "#B4975A"],
    stackedBarLegend:["points", "assists", "rebounds"],
  };
  let data6 = [
    {value:[7.9, 0.7, 3.3], label:"Anunoby"},
    {value:[22.7, 4, 6.6], label:"DeRozan"},
    {value:[8.7, 1.1, 10.5], label:"Ibaka"},
    {value:[17.4, 8.5, 8.4], label:"Lowry"},
    {value:[9.6, 0.8, 4.2], label:"Miles"},
    {value:[8.6, 2.3, 4.1], label:"Wright"},
    {value:[14.6, 1.2, 18], label:"Valanciunas"},
  ];

  let options7 = {
    width:525,
    height:475,
    title:"Weekly Bar Sales",
    titleFontSize:35,
    barSpacing:15,
    barColor:"blue",
    barValPosition:"center",
    barValColor:"black",
    stackedBarColors:["yellow", "#8e585e", "lightblue", "#77B300"],
    stackedBarLegend:["Beer", "Wine", "Spirits", "Apple Juice"],
    displayGrid:false,
    yAxisLabel:"Total Sales",
    yAxisUnits:"$ thousands",
    displayBarOutlines:true,
  };
  let data7 = [
    {value:[2.2, 2.0, 0.8, 0.9], label:"Mon"},
    {value:[2.8, 3.9, 1.2, 0.8], label:"Tues"},
    {value:[3.7, 4.1, 1.1, 0.7], label:"Wed"},
    {value:[4.1, 3.4, 3.2, 1.1], label:"Thurs"},
    {value:[3.7, 1.8, 6.9, 0.7], label:"Fri"},
    {value:[3.1, 2.2, 7.3, 0.9], label:"Sat"},
    {value:[1.5, 1.1, 0.7, 6.5], label:"Sun"},
  ];

  drawBarChart(data1, options1, "C1" );
  drawBarChart(data2, options2, "C2" );
  drawBarChart(data3, options3, "C3" );
  drawBarChart(data4, options4, "C4" );
  drawBarChart(data5, options5, "C5" );
  drawBarChart(data6, options6, "C6" );
  drawBarChart(data7, options7, "C7" );
});


