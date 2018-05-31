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

let createTicks = (containerId, config, options) => {
  let container = $("#" + containerId);
  let axes = container.find(".axes");
  let axisHeight = axes.innerHeight();
  let axisWidth = axes.innerWidth();
  //Bars are scaled to 80% axis height so ticks should be scaled by same ratio
  let maxHeight = axes.innerHeight() * 0.8;
  let curTickVal = config.tickInterval;
  let tickHeight = maxHeight * config.tickInterval / config.maxVal;
  let curHeight = tickHeight;

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

  let fontSize = getFontSize(tickContainer, 0.21, 11);
  if(options.yAxisLabel && config.maxVal > 100){
    fontSize *= 0.8;
  }

  while(curHeight < axisHeight){
    let tickLabel = $("<div/>").addClass("tick-label");
    tickLabel.css("bottom", curHeight);
    tickLabel.css("font-size", fontSize);
    tickLabel.text(`${curTickVal}`);
    tickContainerRight.append(tickLabel);

    let tick = $("<div/>").addClass("tick");
    tick.css("bottom", curHeight);
    tickContainerRight.append(tick);

    if(options.displayGrid){
      let gridLine = $("<div/>").addClass("grid-line");
      gridLine.css("bottom", curHeight);
      gridLine.css("width", axisWidth);
      gridLine.css("background", "#dddddd");
      axes.append(gridLine);
    }
    //round
    curTickVal = parseFloat((curTickVal + config.tickInterval).toFixed(options.tickDecimalPlaces));
    curHeight += tickHeight;
  }
  tickContainerRight.find(".tickLabel").css("fontSize", fontSize);
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

let setBarColor = (bar, barColor) => {
  bar.css("background", barColor);
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
let appendLegend = (stackedBarLegend, stackedBarColors, containerId) => {
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
let renderData = (data, config, options, element) => {
  let axes = $("#" + element).find(".axes");

  //We don't want the tallest bar going all the way to the top of the y axis so scale y-vals down to 80% of container
  let height = axes.innerHeight() * 0.8;
  let width = axes.innerWidth();
  let totalSpacerWidth = options.barSpacing * (data.length + 1);
  let barWidth = (width - totalSpacerWidth) / data.length;

  for(let i = 0; i < data.length; i++){
    //curData will be an array if graph has stacked bars, else curData will be a single value for regular bars
    let curData = data[i];
    let curBar;
    let barLabel;
    //need local var that may be overridden later by bar obj.color property
    let barColor = options.barColor;
    (config.dataClass === "Object" && curData.label) ? barLabel = curData.label : barLabel = null;

    if(config.graphType === "bar"){
      // curData should be either a Number or an Object
      let yVal;
      if(config.dataClass === "Object"){
        yVal = curData.value;
        if(curData.color){
          barColor = curData.color;
        }
      }else{
        yVal = curData;
      }
      let barHeight = height * yVal / config.maxVal;
      curBar = createBar(barHeight, barWidth, options);
      setBarColor(curBar, barColor);
      if(options.barValPosition){
        appendBarValueLabel(yVal, curBar, options);
      }
    }else if(config.graphType === "stacked"){
      //container for stacked values
      curBar = $("<div/>").addClass("stacked-bar");
      let stackLength = (config.dataClass === "Object") ? curData.value.length : curData.length;

      for(let j = 0; j < stackLength; j++){
        let yVal;
        // curData is either an Array or an Object - if Object, it's 'value' property is an array of values
        (config.dataClass === "Object") ? yVal = curData.value[j] : yVal = curData[j];
        let barHeight = height * yVal / config.maxVal;

        let color = options.stackedBarColors[j];
        let curStackedBar = createBar(barHeight, barWidth, options);
        setBarColor(curStackedBar, color);
        if(options.barValPosition){
          appendBarValueLabel(yVal, curStackedBar, options);
        }
        curBar.prepend(curStackedBar);
      }
    }

    //since createBar fn doesn't know whether bars are stacked or not, we need to set this css value outside the fn body
    curBar.css("display", "inline-block");
    if(barLabel){
      //If it's a stacked chart, the label's parent should be the bottom block of the stack
      let labelParent = (config.graphType === "stacked") ? $(curBar.children().last()[0]) : curBar;
      appendBarLabel(barLabel, labelParent, options.barLabelColor);
      if(config.graphType === "stacked"){
        setStackedLabelPositions(labelParent);
      }
    }
    axes.append(curBar);
  }
};

let drawBarChart = (data, options, element) => {
  /*Options arg is optional.  The assignment specifies the args in this order but I would prefer (data, element, options).
  When we check if element is undefined we're really checking if options is undefined */
  if(! element){
    element = options;
    options = {};
  }

  //set of configuration options determined by the data passed into the graph
  let config = {};
  try{
    config.dataClass = getDataClass(data);
  }catch(e){
    return e;
  }

  config.graphType = getGraphType(data, config.dataClass);
  //substitutes default options for undefined params
  config.maxVal = getMaxVal(data, config.dataClass, config.graphType);
  try{
    config.tickInterval = getTickInterval(config.maxVal, options.tickDecimalPlaces);
  }catch(e){
    return e;
  }
  options = loadOptions(config, options, data);

  //render html elements
  let containerId = createContainer(element, options);
  createTitle(containerId, options);
  createChartInner(containerId, options.yAxisLabel);
  createTicks(containerId, config, options);

  renderData(data, config, options, containerId);
  if(options.yAxisLabel){
    createYAxisLabel(containerId, options.yAxisLabel, options.yAxisUnits);
  }
  if(options.displayBarOutlines){
    addOutlines(containerId);
  }
  if(config.graphType === "stacked" && options.stackedBarLegend){
    appendLegend(options.stackedBarLegend, options.stackedBarColors, containerId);
  }
};
