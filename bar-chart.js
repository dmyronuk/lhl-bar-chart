let createContainer = (element, width, height) => {
  let container = $("<div></div");
  container.css("width", width);
  container.css("height", height);
  container.addClass("chart-container");

  //Dynamically assign id
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
  let chartInner = $("<div></div");
  chartInner.addClass("chart-inner");
  chartInner.css("height", height);
  chartInner.css("width", width);
  container.append(chartInner);

  //create axes
  let axes = $("<div></div>");
  axes.addClass("axes");
  chartInner.append(axes)
}

//barWidth is fn of data.length, barHeight is fn of max(data)
let renderData = (graphType, element, data, barSpacing, barColor) => {
  let axes = $("#" + element).find(".axes");

  //We don't want the tallest bar going all the way to the top of the y axis so scale y-vals down to 80% of container
  let height = axes.innerHeight() * 0.8;
  let width = axes.innerWidth();
  let totalSpacerWidth = barSpacing * (data.length + 1);
  let barWidth = (width - totalSpacerWidth) / data.length;

  for(let i=0; i < data.length; i++){
    //curData will be an array if graph has stacked bars, else curData will be a single value (number) for regular bars
    let curData = data[i];
    let curBar;

    if(graphType === "bar"){
      let maxVal = data.reduce((a,b) => a > b ? a:b);
      let yVal = curData
      curBar = createBar(height, width, yVal, maxVal, barWidth, barSpacing, barColor);

    }else if(graphType === "stacked"){

      //To find the max y-Val we need to sum the values in each stacked array and then compute the max sum
      let maxVal = data.reduce((a,b) => {
        let sumB = b.reduce((total, cur) => total + cur);
        if(a > sumB) return a;
        else return sumB;
      }, 0);
      //container for stacked values
      curBar = $("<div></div");
      curBar.addClass("stacked-bar");

      for(let j = 0; j < data.length; j++){
        let yVal = curData[j];
        let randColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        curStackedBar = createBar(height, width, yVal, maxVal, barWidth, barSpacing, randColor);
        curBar.append(curStackedBar);
      }
    }

    //since createBar fn doesn't know whether bars are stacked or not, we need to set this css outside the fn body
    curBar.css("display", "inline-block");
    axes.append(curBar);
  }
}

//height and width args refer to the axes - height is the max height of a bar
let createBar = (height, width, value, maxVal, barWidth, barSpacing, barColor) => {
  let bar = $("<div></div>");
  let barHeight = height * value / maxVal;

  bar.css("margin-left", barSpacing);
  bar.css("width", barWidth);
  bar.css("height", barHeight);
  bar.css("background", barColor);
  bar.addClass("bar");
  return bar;
}

let drawBarChart = (data, options, element) => {
  let containerId = createContainer(element, options["width"], options["height"])
  createTitle(containerId, options["title"], options["titleFontSize"], options["titleColor"]);
  createChartInner(containerId);
  renderData(options["graphType"], containerId, data, options["barSpacing"], options["barColor"]);
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
};
let dataA = [5,8,2,9,10, 4, 6, 12];
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
};
let dataB = [[2,6,4], [3,1,2], [5,3,2], [4,4,7]];
drawBarChart(dataB, optionsB, "main-container" );

