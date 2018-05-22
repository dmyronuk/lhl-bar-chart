let loadOptions = (options, data, dataClass) => {
  let defaultOptions = {
    graphType:"bar",
    width:500,
    height:500,
    title:"Title",
    titleFontSize:35,
    titleColor:"black",
    barSpacing:15,
    barColor:"red",
    stackedBarColors:[],
    stackedBarLegend:null,
    barValPosition:null,
    barValColor:"black",
    barLabelColor:"black",
    displayGrid:true,
  };

  for(key in defaultOptions){
    if(options[key] === undefined){
      options[key] = defaultOptions[key];
    }
  }

  //assign random colors if graph is stacked and user does not pass enough values into stackedBarColors array
  if(options.graphType === "stacked"){
    let numStacked; //each stack is composed of how many bars?
    (dataClass === "Object") ? numStacked = data[0].value[0].length : numStacked = data[0].length;
    while(options.stackedBarColors.length < numStacked){
      let randColor = getRandomColor();
      options.stackedBarColors.push(randColor);
    }
  }
  return options;
}

let createContainer = (element, width, height) => {
  let container = $("<div></div");
  container.css("width", width);
  container.css("height", height);
  container.addClass("chart-container");

  let chartNum = $("#"+element).children(".chart-container").length;
  let containerId = `${element}-chart-${chartNum}-container`;
  container.attr("id", containerId);
  $("#" + element).append(container);
  return containerId;
}

let createTitle = (element, title, titleFontSize, titleColor) => {
  let titleDiv = $(`<div>${title}</div>`);
  titleDiv.css("fontSize", titleFontSize+"px");
  titleDiv.css("color", titleColor);
  titleDiv.addClass("chart-title");
  $("#"+element).append(titleDiv);
}

let createChartInner = (element) => {
  let container = $("#" + element);
  let titleDiv = container.children(".chart-title")[0];

  //calculate height remaining in parent container after title is rendered
  let height = container[0].clientHeight - titleDiv.clientHeight;
  let width = container[0].clientWidth;

  //create container for axes below title
  let chartInner = $("<div/>").addClass("chart-inner");
  chartInner.css("height", height);
  chartInner.css("width", width);
  container.append(chartInner);

  //create axes
  let axes = $("<div></div>").addClass("axes");
  chartInner.append(axes)
}

let getTickInterval = (maxVal) => {
  let exp = Math.floor(Math.log10(maxVal));
  let tickInterval = 10 ** exp; // largest power of 10 that's less than our max Val

  let multiple = maxVal / tickInterval; // number of ticks we get at the current Interval
  if(multiple <= 2){tickInterval /= 5}
  else if(multiple <= 5){tickInterval /= 2};

  return tickInterval;
}

let createTicks = (containerId, maxVal, tickInterval, displayGrid) => {
  let axes = $("#" + containerId).find(".axes");
  let axisHeight = axes.innerHeight();
  let axisWidth = axes.innerWidth();
  let maxHeight = axes.innerHeight() * 0.8; //Bars are scaled to 80% axis height so ticks should be scaled by same ratio
  let curTickVal = tickInterval;
  let tickHeight = maxHeight * tickInterval / maxVal;
  let curHeight = tickHeight;

  while(curHeight < axisHeight){
    let tickLabel = $("<div/>").addClass("tick-label");
    tickLabel.css("bottom", curHeight);
    tickLabel.text(`${curTickVal}`);
    axes.append(tickLabel);

    let tick = $("<div/>").addClass("tick");
    tick.css("bottom", curHeight);
    axes.append(tick);

    if(displayGrid){
      let gridLine = $("<div/>").addClass("grid-line");
      gridLine.css("bottom", curHeight);
      gridLine.css("width", axisWidth);
      gridLine.css("background", "#dddddd");
      axes.append(gridLine);
    }

    curTickVal += tickInterval;
    curHeight += tickHeight;
  }
}

/* data arg can be either an array of objects (labelled values), an array of subarrays (stacked graph) or an array of ints
Fn checks that all values in the data array are of the same class and returns a string representing the class ie "Array"
obj.constructor.name is only available in ES6 */
let getDataClass = (data) => {
  firstElemClass = data[0].constructor.name;
  for(let i=1; i<data.length; i++){
    if(data[i].constructor.name !== firstElemClass){
      throw "Exception: data values must be instances of the same class"
    }
  }
  return firstElemClass;
}

let getMaxVal = (data, dataClass, graphType) => {
  if(dataClass === "Object"){
    data = data.map((elem) => elem.value);
  }

  if(graphType === "bar"){
    return data.reduce((a,b) => a > b ? a:b);

  }else if(graphType === "stacked"){
    //To find the max y-Val we need to sum the values in each stacked array and then compute the max sum
    let maxVal = data.reduce((a,b) => {
      let sumB = b.reduce((total, cur) => total + cur);
      if(a > sumB) return a;
      else return sumB;
      }, 0);
    return maxVal;
  }
}

let getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
}

//barWidth is fn of data.length, barHeight is fn of max(data)
let renderData = (data, options, element, dataClass, maxVal) => {
  let axes = $("#" + element).find(".axes");

  //We don't want the tallest bar going all the way to the top of the y axis so scale y-vals down to 80% of container
  let height = axes.innerHeight() * 0.8;
  let width = axes.innerWidth();
  let totalSpacerWidth = options.barSpacing * (data.length + 1);
  let barWidth = (width - totalSpacerWidth) / data.length;

  for(let i=0; i < data.length; i++){
    //curData will be an array if graph has stacked bars, else curData will be a single value for regular bars
    let curData = data[i];
    let curBar;
    let barLabel;
    let barColor = options.barColor; //need local var that may be overridden later by bar obj.color property
    (dataClass === "Object" && curData.label) ? barLabel = curData.label : barLabel = null;

    if(options.graphType === "bar"){
      let yVal; // curData should be either a Number or an Object
      if(dataClass === "Object"){
        yVal = curData.value;
        if(curData.color) barColor = curData.color;
      }else{
        yVal = curData;
      }
      curBar = createBar(height, width, yVal, maxVal, barWidth, options.barSpacing, barColor);
      if(options.barValPosition) appendBarValueLabel(options.barValPosition, options.barValColor, yVal, curBar);

    }else if(options.graphType === "stacked"){
      //container for stacked values
      curBar = $("<div/>").addClass("stacked-bar");

      for(let j = 0; j < data.length; j++){
        let yVal;  // curData is either an Array or an Object - if Object, it's 'value' property is an array of values
        (dataClass === "Object") ? yVal = curData.value[j] : yVal = curData[j];

        let color = options.stackedBarColors[j];
        curStackedBar = createBar(height, width, yVal, maxVal, barWidth, options.barSpacing, color);
        if(options.barValPosition) appendBarValueLabel(options.barValPosition, options.barValColor, yVal, curStackedBar);
        curBar.prepend(curStackedBar);
      }
    }

    //since createBar fn doesn't know whether bars are stacked or not, we need to set this css value outside the fn body
    curBar.css("display", "inline-block");
    if(barLabel){
      //If it's a stacked chart, the label's parent should be the bottom block of the stack
      let labelParent = (options.graphType === "stacked") ? $(curBar.children().last()[0]) : curBar;
      appendBarLabel(barLabel, labelParent, options.barLabelColor, options.graphType);
    }
    axes.append(curBar);
  }
}

//height and width args refer to the axes - height is the max height of a bar
let createBar = (height, width, value, maxVal, barWidth, barSpacing, barColor, barLabel) => {
  let bar = $("<div/>").addClass("bar");
  let barHeight = height * value / maxVal;
  bar.css("margin-left", barSpacing);
  bar.css("width", barWidth);
  bar.css("height", barHeight);
  bar.css("background", barColor);
  return bar;
}

let appendBarValueLabel = (barValPosition, barValColor, barValue, parentBar) => {
  let barLabelDiv = $("<div/>").addClass("bar-value-label");
  barLabelDiv.text(barValue);
  barLabelDiv.css("color", barValColor);
  if(barValPosition === "top") barLabelDiv.css("top", "-20px");
  else if(barValPosition === "center") barLabelDiv.css("bottom", "calc(-50% + 7px)"); //compensate for font size; fix later
  else if(barValPosition === "bottom") barLabelDiv.css("bottom", "calc(-100% + 20px)");
  parentBar.append(barLabelDiv);
}

let appendBarLabel = (barLabel, parentBar, barLabelColor, graphType) => {
  let barLabelDiv = $("<div/>").addClass("bar-label");
  barLabelDiv.css("color", barLabelColor);
  barLabelDiv.text(barLabel);

  if(graphType === "stacked"){
    parentBar.css("position", "relative");
    barLabelDiv.css("position", "absolute");
    barLabelDiv.css("width", "100%");
    barLabelDiv.css("bottom", "-30px")
  }

  parentBar.append(barLabelDiv);
}

//Legend for stacked bar graph colors
//Legend renders outside of the container defined by options.height, options.width - may change in future
let appendLegend = (stackedBarLegend, stackedBarColors, containerId) => {
  let container = $("#"+containerId)
  let legend = $("<div/>").addClass("legend");
  legend.css("width", container.width());

  for(let i = 0; i < stackedBarLegend.length; i++){
    let legendItem = $("<div/>");
    let legendColorBox = $("<div/>").addClass("legend-color-box");
    legendColorBox.css("background", stackedBarColors[i]);

    let legendLabel = $("<div/>").addClass("legend-label");
    legendLabel.text(stackedBarLegend[i]);

    legendItem.append(legendColorBox, legendLabel);
    legend.append(legendItem);
  }
  container.after(legend);
}

let drawBarChart = (data, options, element) => {
  let dataClass;
  try{
    dataClass = getDataClass(data);
  }catch(err){
    console.log(err);
    return;
  }

  options = loadOptions(options, data, dataClass); //substitutes default options for undefined params
  let containerId = createContainer(element, options.width, options.height);
  createTitle(containerId, options.title, options.titleFontSize, options.titleColor);
  createChartInner(containerId);

  let maxVal = getMaxVal(data, dataClass, options.graphType);
  let tickInterval = getTickInterval(maxVal);
  createTicks(containerId, maxVal, tickInterval, options.displayGrid);

  renderData(data, options, containerId, dataClass, maxVal);
  if(options.graphType === "stacked" && options.stackedBarLegend){
    appendLegend(options.stackedBarLegend, options.stackedBarColors, containerId);
  }
}

let optionsA = {
  graphType:"bar",
  width:600,
  height:400,
  title:"Graph A",
  titleFontSize:30,
  titleColor:"red",
  barSpacing:10,
  barColor:"blue",
  barValPosition:"center",
  barValColor:"white",
  displayGrid:true,
};
let dataA = [300, 90, 1005, 450, 627];
drawBarChart(dataA, optionsA, "main-container" );

let optionsB = {
  graphType:"stacked",
  width:400,
  height:600,
  title:"Graph B",
  titleFontSize:35,
  titleColor:"darkblue",
  barSpacing:15,
  barColor:"blue",
  barValPosition:"center",
  barValColor:"white",
  stackedBarLegend:["Legend A", "Legend B", "Legend C", "Legend D"],
  stackedBarColors:["red", "orange", "yellow", "blue"],
};
let dataB = [[2,6,4,2], [3,1,2,2], [5,3,2,5], [4,4,7,3]];
drawBarChart(dataB, optionsB, "main-container" );

let optionsC = {
  graphType:"bar",
  width:500,
  height:500,
  title:"Graph C",
  titleFontSize:35,
  titleColor:"darkblue",
  barSpacing:15,
  barValColor:"red",
  barValPosition:"top",
  barLabelColor:"blue",
  displayGrid:true,
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
  graphType:"stacked",
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
};
let dataD = [
  {value:[2,6,4,2], color:"red", label:"Stack A"},
  {value:[3,1,2,2], color:"orange", label:"Stack B"},
  {value:[5,3,2,5], color:"yellow", label:"Stack C"},
  {value:[4,4,7,3], color:"green", label:"Stack D"},
];
drawBarChart(dataD, optionsD, "main-container" );


let optionsE = {title:"Default Graph"};
let dataE = [100, 45, 23, 87, 92];
drawBarChart(dataE, optionsE, "main-container" );
