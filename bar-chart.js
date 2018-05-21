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

  let multiple = maxVal / tickInterval; // this is how many ticks we get at the current Interval
  if(multiple <= 2){tickInterval /= 5}
  else if(multiple <= 5){tickInterval /= 2};

  return tickInterval;
}

let createTicks = (containerId, maxVal, tickInterval) => {
  let axes = $("#" + containerId).find(".axes");
  let axisHeight = axes.innerHeight();
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

    curTickVal += tickInterval;
    curHeight += tickHeight;
  }
}

/* data arg can be either an array of object (labelled values), an array of subarrays (stacked graph) or an array of ints
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

let getMaxVal = (data, graphType) => {
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

//barWidth is fn of data.length, barHeight is fn of max(data)
let renderData = (graphType, element, data, maxVal, barSpacing, barColor) => {
  let axes = $("#" + element).find(".axes");

  //We don't want the tallest bar going all the way to the top of the y axis so scale y-vals down to 80% of container
  let height = axes.innerHeight() * 0.8;
  let width = axes.innerWidth();
  let totalSpacerWidth = barSpacing * (data.length + 1);
  let barWidth = (width - totalSpacerWidth) / data.length;

  for(let i=0; i < data.length; i++){
    //curData will be an array if graph has stacked bars, else curData will be a single value for regular bars
    let curData = data[i];
    let curBar;

    if(graphType === "bar"){
      let yVal = curData
      curBar = createBar(height, width, yVal, maxVal, barWidth, barSpacing, barColor);

    }else if(graphType === "stacked"){
      //container for stacked values
      curBar = $("<div/>").addClass("stacked-bar");

      for(let j = 0; j < data.length; j++){
        let yVal = curData[j];
        let randColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        curStackedBar = createBar(height, width, yVal, maxVal, barWidth, barSpacing, randColor);
        curBar.append(curStackedBar);
      }
    }
    //since createBar fn doesn't know whether bars are stacked or not, we need to set this css value outside the fn body
    curBar.css("display", "inline-block");
    axes.append(curBar);
  }
}

//height and width args refer to the axes - height is the max height of a bar
let createBar = (height, width, value, maxVal, barWidth, barSpacing, barColor) => {
  let bar = $("<div/>").addClass("bar");
  let barHeight = height * value / maxVal;
  bar.css("margin-left", barSpacing);
  bar.css("width", barWidth);
  bar.css("height", barHeight);
  bar.css("background", barColor);
  return bar;
}

let drawBarChart = (data, options, element) => {
  try{
    let dataClass = getDataClass(data);
  }catch(err){
    console.log(err);
    return;
  }

  let containerId = createContainer(element, options.width, options.height);
  createTitle(containerId, options.title, options.titleFontSize, options.titleColor);
  createChartInner(containerId);

  let maxVal = getMaxVal(data, options.graphType);
  let tickInterval = getTickInterval(maxVal);
  createTicks(containerId, maxVal, tickInterval);
  renderData(options.graphType, containerId, data, maxVal, options.barSpacing, options.barColor);
}

let optionsA = {
  graphType:"bar",
  width:600,
  height:400,
  title:"Graph A",
  titleFontSize:30,
  titleColor:"red",
  barSpacing:10,
  barColor:"red",
  barValuePosition:"top",
};
let dataA = [1200,580,1452,1300,300];
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
  barValuePosition:null,
};
let dataB = [[2,6,4], [3,1,2], [5,3,2], [4,4,7]];
drawBarChart(dataB, optionsB, "main-container" );

