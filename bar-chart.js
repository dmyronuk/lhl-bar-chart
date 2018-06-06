let getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
};

//Tried setting font-size with 'vw' but had trouble getting the result I wanted
let getFontSize = (limitingElem, ratio, maxSize) => {
  let fontSize = Math.round(limitingElem.innerWidth() * ratio);
  if(fontSize > maxSize) {
    fontSize = maxSize;
  }
  return fontSize;
};

let loadOptions = (config, options, data) => {
  let defaultOptions = {
    backgroundColor: "#eeeeee",
    barColor: "red",
    barLabelColor: null,
    barSpacing: 15,
    barValColor: null,
    barValPosition: null,
    baseFont: "Arial",
    baseFontColor: "black",
    displayBarOutlines: false,
    displayGrid: true,
    displayValCommas: false,
    height: 500,
    stackedBarColors: [],
    stackedBarLegend: null,
    tickDecimalPlaces: 0,
    title: null,
    titleColor: "black",
    titleFont: "Arial",
    titleFontSize: 35,
    width: 500,
    yAxisLabel: null,
    yAxisUnits: null
  };

  for(let key in defaultOptions){
    if(options[key] === undefined){
      options[key] = defaultOptions[key];
    }
  }

  //assign random colors if graph is stacked and user does not pass enough values into stackedBarColors array
  if(config.graphType === "stacked"){
    //each stack is composed of how many bars?
    let numStacked = config.dataClass === "Object" ? data[0].value.length : data[0].length;
    while(options.stackedBarColors.length < numStacked){
      let randColor = getRandomColor();
      options.stackedBarColors.push(randColor);
    }
  }
  return options;
};

/*data arg can be an array of number or an array of object - if elems are numbers, we want to convert them to objects so we can
use the same functions on both types of inputs*/
let convertDataToObjects = (data, barColor) => {
  let convertedData = [];
  data.forEach((elem) => {
    convertedData.push({value: elem});
  });
  return convertedData;
};

let createContainer = (element, options) => {
  let container = $("<div></div").addClass("chart-container");
  container.css("width", options.width);
  container.css("height", options.height);
  container.css("font-family", options.baseFont);
  container.css("color", options.baseFontColor);
  container.css("background-color", options.backgroundColor);

  let chartNum = $("#" + element).children(".chart-container").length;
  let containerId = `${element}-chart-${chartNum}-container`;
  container.attr("id", containerId);
  $("#" + element).append(container);
  return containerId;
};

let createTitle = (element, options) => {
  let titleDiv = $("<div/>").addClass("chart-title");
  if(options.title){
    titleDiv.text(options.title);
    titleDiv.css("font-family", options.titleFont);
    titleDiv.css("fontSize", options.titleFontSize + "px");
    titleDiv.css("color", options.titleColor);
  }else{
    titleDiv.css("height", options.titleFontSize);
  }
  $("#" + element).append(titleDiv);
};

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
  let margin = width * 0.14;
  if(margin > 60){
    margin = 60;
  }
  axes.css("margin", `0px ${margin}px ${margin}px ${margin}px`);
  chartInner.append(axes);
};

let getTickInterval = (maxVal, tickDecimalPlaces) => {
  let exp = Math.floor(Math.log10(maxVal));
  let tickInterval = Math.pow(10, exp);
  let multiple = maxVal / tickInterval;
  if(multiple <= 2){
    tickInterval /= 5;
  }else if(multiple <= 5){
    tickInterval /= 2;
  }

  if(tickInterval < 1){
    if(tickDecimalPlaces < 1){
      throw "Error: options.tickDecimalPlaces must be equal to or greater than 1";
    }
    tickInterval = parseFloat((tickInterval).toFixed(tickDecimalPlaces));
  }
  return tickInterval;
};

let createTickContainer = (containerId, config, options) => {
  let container = $("#" + containerId);
  let axes = container.find(".axes");
  let axisHeight = axes.innerHeight();
  let axisWidth = axes.innerWidth();
  let margin = parseFloat(axes.css("margin-left").slice(0, -2));
  let tickContainer = $("<div/>").addClass("tick-container");
  // left container will hold the y-axis title - right container will hold the ticks and labels
  let tickContainerLeft = $("<div/>").addClass("tick-container-left");
  let tickContainerRight = $("<div/>").addClass("tick-container-right");
  if(options.yAxisLabel){
    tickContainerLeft.css("width", "30%");
    tickContainerRight.css("width", "70%");
  }

  tickContainer.css("height", axisHeight);
  tickContainer.css("width", margin);
  tickContainer.append([tickContainerLeft, tickContainerRight]);
  container.find(".chart-inner").prepend(tickContainer);
}

let createTicks = (containerId, config, options) => {
  let container = $("#" + containerId);
  let tickContainerRight = container.find(".tick-container-right");
  let axes = container.find(".axes");
  let axisHeight = axes.innerHeight();
  let axisWidth = axes.innerWidth();
  //Bars are scaled to 80% axis height so ticks should be scaled by same ratio
  let maxHeight = axes.innerHeight() * 0.8;
  let tickHeight = maxHeight * config.tickInterval / config.maxVal;
  let curHeight = tickHeight;
  let curTickVal = 0;

  while(curHeight < axisHeight){
    let tick = $("<div/>").addClass("tick");
    //calculate new tick value, round it to the decimal place specified in options.tickDecimalPlaces, save it as an attr of tick element
    curTickVal = parseFloat((curTickVal + config.tickInterval).toFixed(options.tickDecimalPlaces));
    tick.attr("value", curTickVal);
    tick.css("bottom", curHeight);
    tickContainerRight.append(tick);
    curHeight += tickHeight;
  }
};

let createTickLabels = (containerId, options, config) => {
  let tickContainer = $("#" +containerId).find(".tick-container");
  let ticks = tickContainer.find(".tick");
  let tickContainerRight = tickContainer.find(".tick-container-right");

  let fontSize = getFontSize(tickContainer, 0.21, 11);
  if(options.yAxisLabel && config.maxVal > 100) fontSize *= 0.8;
  tickContainerRight.find(".tickLabel").css("fontSize", fontSize);

  for(let i = 0; i < ticks.length; i++){
    let tick = $(ticks[i]);
    let height = tick.css("bottom");
    let tickLabel = $("<div/>").addClass("tick-label");
    tickLabel.css("bottom", height);
    tickLabel.text(tick.attr("value"));
    tickContainerRight.append(tickLabel);
  }
}

let createGrid = (containerId) => {
  let axes = $("#" + containerId).find(".axes");
  let ticks = $("#" + containerId).find(".tick");
  let width = axes.width();

  for(let i = 0; i < ticks.length; i++){
    let tick = $(ticks[i]);
    let gridLine = $("<div/>").addClass("grid-line");
    let bottom = tick.css("bottom");
    gridLine.css("bottom", bottom);
    gridLine.css("width", width);
    gridLine.css("background", "#dddddd");
    axes.append(gridLine);
  }
};

/* data arg can be either an array of objects (labelled values), an array of subarrays (stacked graph) or an array of ints
Fn checks that all values in the data array are of the same class and returns a string representing the class ie "Array"
obj.constructor.name is only available in ES6 */
let getDataClass = (data) => {
  let firstElemClass = data[0].constructor.name;
  for(let i = 1; i < data.length; i++){
    if(data[i].constructor.name !== firstElemClass){
      throw "Exception: data values must be instances of the same class";
    }
  }
  return firstElemClass;
};

let getGraphType = (data, dataClass) => {
  let firstElem = (dataClass === "Object") ? data[0].value : data[0];
  return (firstElem.constructor.name === "Array") ? "stacked" : "bar";
};

let getTotalSpacerWidth = (data, barSpacing) => {
  return barSpacing * (data.length + 1);
}

let getBarWidth = (data, totalSpacerWidth, containerId) => {
  let axes = $("#" + containerId).find(".axes");
  return (axes.width() - totalSpacerWidth) / data.length;
}

let getMaxVal = (data, dataClass, graphType) => {
  if(dataClass === "Object"){
    data = data.map((elem) => elem.value);
  }

  if(graphType === "bar"){
    return data.reduce((a, b) => a > b ? a : b);

  }else if(graphType === "stacked"){
    //To find the max y-Val we need to sum the values in each stacked array and then compute the max sum
    let maxVal = data.reduce((a, b) => {
      let sumB = b.reduce((total, cur) => total + cur);
      if(a > sumB){
        return a;
      }else{
        return sumB;
      }
    }, 0);
    return maxVal;
  }
};

//height and width args refer to the axes - height is the max height of a bar
let createBar = (barHeight, barWidth, options) => {
  let bar = $("<div/>").addClass("bar");
  bar.css("margin-left", options.barSpacing);
  bar.css("width", barWidth);
  bar.css("height", barHeight);
  return bar;
};

let addCommas = (integer) => {
  let inString = String(integer);
  let outString = "";
  let counter = 1;
  for(let i = inString.length - 1; i > 0; i--){
    if((counter) % 3 === 0){
      outString = "," + inString[i] + outString;
    }else{
      outString = inString[i] + outString;
    }
    counter ++;
  }
  return inString[0] + outString;
};

let appendBarValueLabel = (barValue, parentBar, options) => {
  let barLabelDiv = $("<div/>").addClass("bar-value-label");
  let label = barValue;
  if(options.displayValCommas){
    label = addCommas(barValue);
  }
  barLabelDiv.text(label);

  barLabelDiv.css("color", options.barValColor);
  if(options.barValPosition === "top"){
    barLabelDiv.css("top", "-20px");
  }else if(options.barValPosition === "center"){
    barLabelDiv.css("bottom", "calc(-50% + 7px)");
  }else if(options.barValPosition === "bottom"){
    barLabelDiv.css("bottom", "calc(-100% + 20px)");
  }
  let fontSize = getFontSize(parentBar, 0.23, 12);
  barLabelDiv.css("font-size", fontSize);
  parentBar.append(barLabelDiv);
};

let appendBarLabel = (barLabel, parentBar, barLabelColor) => {
  let barLabelDiv = $("<div/>").addClass("bar-label");
  let fontSize = getFontSize(parentBar, 0.34, 15);
  barLabelDiv.css("font-size", fontSize);
  barLabelDiv.css("color", barLabelColor);
  barLabelDiv.text(barLabel);
  parentBar.append(barLabelDiv);
};

let setStackedLabelPositions = (parentBar) => {
  parentBar.css("position", "relative");
  let labels = parentBar.children(".bar-label");
  labels.css("position", "absolute");
  labels.css("width", "100%");
  labels.css("bottom", "-30px");
};

//Tried setting outline on parent div but it was applied to child elements like bar-labels & bar-vals, even if they're outside the container
let addOutlines = (containerId) => {
  let bars = $("#" + containerId).find(".bar");
  let outlineDiv = $("<div/>").addClass("bar-outline");
  $(outlineDiv).css("outline", "solid black 2px");
  bars.append(outlineDiv);
};

let createYAxisLabel = (containerId, yAxisLabel, yAxisUnits) => {
  let tickContainerLeft = $("#" + containerId).find(".tick-container-left");
  let yHeight = tickContainerLeft.css("height");
  let yLabel = $("<div/>").addClass("y-label");
  yLabel.css("width", yHeight);
  yLabel.css("font-size", tickContainerLeft.width() * 0.68);
  let text = (yAxisUnits) ? `${yAxisLabel} (${yAxisUnits})` : yAxisLabel ;
  yLabel.text(text);
  $(tickContainerLeft).prepend(yLabel);
};

//Legend for stacked bar graph colors
//Legend renders outside of the container defined by options.height, options.width - may change in future
let createLegend = (stackedBarLegend, stackedBarColors, containerId) => {
  let container = $("#" + containerId);
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
};

//barWidth is fn of data.length, barHeight is fn of max(data)
let renderUnstackedBars = (data, config, options, element) => {
  let axes = $("#" + element).find(".axes");
  //Max bar height is 80% of container
  let maxHeight = axes.innerHeight() * 0.8;

  for(let i = 0; i < data.length; i++){
    let curData = data[i];
    let barHeight = maxHeight * curData.value / config.maxVal;
    let curBar = createBar(barHeight, config.barWidth, options);
    let barColor = (curData.color) ? curData.color : options.barColor;
    curBar.css("background", barColor);
    curBar.css("display", "inline-block");

    if(options.barValPosition){
      appendBarValueLabel(curData.value, curBar, options);
    }
    if(curData.label){
      appendBarLabel(curData.label, curBar, options.barLabelColor);
    }
    axes.append(curBar);
  }
}

let renderStackedBars = (data, config, options, element) => {
  let axes = $("#" + element).find(".axes");
  let maxHeight = axes.innerHeight() * 0.8;

  //render each stacked bar
  for(let i = 0; i < data.length; i++){
    let curData = data[i];
    let stackLength = curData.value.length;
    let curBar = $("<div/>").addClass("stacked-bar");

    //render each sub-bar in the stack
    for(let j = 0; j < stackLength; j++){
      let barHeight = maxHeight * curData.value[j] / config.maxVal;
      let curStackedBar = createBar(barHeight, config.barWidth, options);
      let barColor = options.stackedBarColors[j];
      curStackedBar.css("background", barColor);
      if(options.barValPosition){
        appendBarValueLabel(curData.value[j], curBar, options);
      }
      curBar.prepend(curStackedBar);
    }

    //add data labels
    if(curData.label){
      let labelParent = $(curBar.children().last()[0])
      appendBarLabel(curData.label, labelParent, options.barLabelColor);
      setStackedLabelPositions(labelParent);
    }
    curBar.css("display", "inline-block");
    axes.append(curBar);
  }
};

let drawBarChart = (data, options, element) => {
  //set of configuration options determined by the data passed into the graph
  let config = {};
  try{
    config.dataClass = getDataClass(data);
  }catch(e){
    return e;
  }

  config.graphType = getGraphType(data, config.dataClass);
  config.maxVal = getMaxVal(data, config.dataClass, config.graphType);
  options = loadOptions(config, options, data);

  try{
    config.tickInterval = getTickInterval(config.maxVal, options.tickDecimalPlaces);
  }catch(e){
    console.log(e);
  }

  //render html elements
  let containerId = createContainer(element, options);
  createTitle(containerId, options);
  createChartInner(containerId, options.yAxisLabel);
  createTickContainer(containerId, config, options);
  createTicks(containerId, config, options);
  createTickLabels(containerId, options, config);
  if(options.displayGrid) createGrid(containerId);

  config.totalSpacerWidth = getTotalSpacerWidth(data, options.barSpacing);
  config.barWidth = getBarWidth(data, config.totalSpacerWidth, containerId);

  let dataObjectArray;
  if(config.dataClass === "Number" || config.dataClass === "Array"){
    dataObjectArray = convertDataToObjects(data, options.barColor);
  }else{
    dataObjectArray = data;
  }

  if(config.graphType === "stacked"){
    renderStackedBars(dataObjectArray, config, options, containerId);
  }else{
    renderUnstackedBars(dataObjectArray, config, options, containerId);
  }

  if(options.yAxisLabel) createYAxisLabel(containerId, options.yAxisLabel, options.yAxisUnits);
  if(options.displayBarOutlines)addOutlines(containerId);
  if(config.graphType === "stacked" && options.stackedBarLegend){
    createLegend(options.stackedBarLegend, options.stackedBarColors, containerId);
  }
};
