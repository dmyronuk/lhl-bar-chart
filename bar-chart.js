let loadOptions = (graphType, options, data, dataClass) => {
  let defaultOptions = {
    width:500,
    height:500,
    backgroundColor:"#dddddd",
    title:"Graph Title",
    titleFontSize:35,
    titleColor:"black",
    barSpacing:15,
    barColor:"red",
    displayBarOutlines:false,
    stackedBarColors:[],
    stackedBarLegend:null,
    barValPosition:null,
    barValColor:"black",
    barLabelColor:"black",
    yAxisLabel:null,
    yAxisUnits:null,
    displayGrid:true,
  };

  for(key in defaultOptions){
    if(options[key] === undefined){
      options[key] = defaultOptions[key];
    }
  }

  //assign random colors if graph is stacked and user does not pass enough values into stackedBarColors array
  if(graphType === "stacked"){
    let numStacked; //each stack is composed of how many bars?
    (dataClass === "Object") ? numStacked = data[0].value.length : numStacked = data[0].length;
    while(options.stackedBarColors.length < numStacked){
      let randColor = getRandomColor();
      options.stackedBarColors.push(randColor);
    }
  }
  return options;
}

let createContainer = (element, width, height, backgroundColor) => {
  let container = $("<div></div").addClass("chart-container");
  container.css("width", width);
  container.css("height", height);
  container.css("background-color", backgroundColor);

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
  let margin = width * 0.12;
  axes.css("margin", `0px ${margin}px ${margin}px ${margin}px`)
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
  let container = $("#" + containerId);
  let axes = container.find(".axes");
  let axisHeight = axes.innerHeight();
  let axisWidth = axes.innerWidth();
  let maxHeight = axes.innerHeight() * 0.8; //Bars are scaled to 80% axis height so ticks should be scaled by same ratio
  let curTickVal = tickInterval;
  let tickHeight = maxHeight * tickInterval / maxVal;
  let curHeight = tickHeight;


  console.log("container margin", parseFloat(axes.css("margin-left").slice(0, -2)));
  let margin = parseFloat(axes.css("margin-left").slice(0, -2));
  let tickContainer = $("<div/>").addClass("tick-container");
  tickContainer.css("height", axisHeight);
  tickContainer.css("width", margin);
  container.find(".chart-inner").prepend(tickContainer);
  let fontSize = getFontSize(tickContainer, 0.20, 11);

  while(curHeight < axisHeight){
    let tickLabel = $("<div/>").addClass("tick-label");
    tickLabel.css("bottom", curHeight);
    tickLabel.css("font-size", fontSize);
    tickLabel.text(`${curTickVal}`);
    tickContainer.append(tickLabel);

    let tick = $("<div/>").addClass("tick");
    tick.css("bottom", curHeight);
    tickContainer.append(tick);

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

let getGraphType = (data, dataClass) => {
  let firstElem = (dataClass === "Object") ? data[0].value : data[0];
  return (firstElem.constructor.name === "Array") ? "stacked" : "bar";
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

/*Tried setting font-size with 'vw' but had trouble getting the result I wanted - plus this works on browsers that don't support vw
limitingElem is a jQuery object
*/
let getFontSize = (limitingElem, ratio, maxSize) => {
  let fontSize = limitingElem.innerWidth() * ratio;
  if(fontSize > maxSize) fontSize = maxSize;
  return fontSize
}

//barWidth is fn of data.length, barHeight is fn of max(data)
let renderData = (data, graphType, options, element, dataClass, maxVal) => {
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

    if(graphType === "bar"){
      let yVal; // curData should be either a Number or an Object
      if(dataClass === "Object"){
        yVal = curData.value;
        if(curData.color) barColor = curData.color;
      }else{
        yVal = curData;
      }
      curBar = createBar(height, width, yVal, maxVal, barWidth, options.barSpacing, barColor);
      if(options.barValPosition) appendBarValueLabel(options.barValPosition, options.barValColor, yVal, curBar);

    }else if(graphType === "stacked"){
      //container for stacked values
      curBar = $("<div/>").addClass("stacked-bar");
      let stackLength = (dataClass === "Object") ? curData.value.length : curData.length;

      for(let j = 0; j < stackLength; j++){
        let yVal;  // curData is either an Array or an Object - if Object, it's 'value' property is an array of values
        (dataClass === "Object") ? yVal = curData.value[j] : yVal = curData[j];

        let color = options.stackedBarColors[j];
        let curStackedBar = createBar(height, width, yVal, maxVal, barWidth, options.barSpacing, color);
        if(options.barValPosition) appendBarValueLabel(options.barValPosition, options.barValColor, yVal, curStackedBar);
        curBar.prepend(curStackedBar);
      }
    }

    //since createBar fn doesn't know whether bars are stacked or not, we need to set this css value outside the fn body
    curBar.css("display", "inline-block");
    if(barLabel){
      //If it's a stacked chart, the label's parent should be the bottom block of the stack
      let labelParent = (graphType === "stacked") ? $(curBar.children().last()[0]) : curBar;
      appendBarLabel(barLabel, labelParent, options.barLabelColor, graphType);
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

  let fontSize = getFontSize(parentBar, 0.22, 15);
  barLabelDiv.css("font-size", fontSize);
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

let addOutlines = (containerId, width) => {
  let bars = $("#" + containerId).find(".bar");
  $(bars).css("outline", "solid black 2px");
}

let createYAxisLabel = (containerId, yAxisLabel, yAxisUnits) => {
  let axes = $("#" + containerId).find(".axes");
  let yHeight = axes.css("height");
  let yLabel = $("<div/>").addClass("y-label");
  yLabel.css("width", yHeight);
  yLabel.html(`${yAxisLabel} \(${yAxisUnits}\)`);
  $(axes).append(yLabel);
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
  /*Options arg is optional.  The assignment specifies the args in this order but I would prefer (data, element, options).
  In the former case, when we check if element is undefined we're really checking if options is undefined */
  if(! element){
    element = options;
    options = {};
  }

  let dataClass;
  try{
    dataClass = getDataClass(data);
  }catch(err){
    console.log(err);
    return;
  }

  let graphType = getGraphType(data, dataClass);
  options = loadOptions(graphType, options, data, dataClass); //substitutes default options for undefined params
  let containerId = createContainer(element, options.width, options.height, options.backgroundColor);
  createTitle(containerId, options.title, options.titleFontSize, options.titleColor);
  createChartInner(containerId);

  let maxVal = getMaxVal(data, dataClass, graphType);
  let tickInterval = getTickInterval(maxVal);
  createTicks(containerId, maxVal, tickInterval, options.displayGrid);

  renderData(data, graphType, options, containerId, dataClass, maxVal);
  if(options.yAxisLabel) createYAxisLabel(containerId, options.yAxisLabel, options.yAxisUnits);
  if(options.displayBarOutlines) addOutlines(containerId, options.barOutlineWidth);

  if(graphType === "stacked" && options.stackedBarLegend){
    appendLegend(options.stackedBarLegend, options.stackedBarColors, containerId);
  }
}