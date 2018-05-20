let createContainer = (element, width, height) => {
  let container = $("<div></div");
  container.css("width", width);
  container.css("height", height);

  container.addClass("chart-container");
  let chartNum = $("#"+element).children(".chart-container").length;
  container.attr("id", `chart-${chartNum}-container`);
  $("#" + element).append(container);
}

let createTitle = (element, title, fontSize, fontColor) => {
  let titleDiv = $(`<div>${title}</div>`);
  titleDiv.css("fontSize", fontSize+"px");
  titleDiv.css("color", fontColor);
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
let createBars = (element, data, barSpacing, barColor) => {
  let axes = $("#" + element).find(".axes");

  //We don't want the tallest bar going all the way to the top of the axes so scale them down to 80% of container
  let height = axes.innerHeight() * 0.8;
  let width = axes.innerWidth();
  let maxVal = data.reduce((a,b) => a > b ? a:b);

  let totalSpacerWidth = barSpacing * (data.length + 1);
  let barWidth = (width - totalSpacerWidth) / data.length;

  for(let i=0; i < data.length; i++){
    let curBar = $("<div></div>");
    let curBarHeight = height * data[i] / maxVal;

    curBar.css("margin-left", barSpacing);
    curBar.css("display", "inline-block");
    curBar.css("width", barWidth + "px");
    curBar.css("height", curBarHeight);
    curBar.css("background", barColor);
    curBar.addClass("bar");
    axes.append(curBar);
  }
}

let drawBarChart = (data, options, element) => {

}

createContainer("main-container", 600, 400)
createTitle("chart-1-container", "Some Graph", 35, "red");
createChartInner("chart-1-container");
createBars("chart-1-container", [5,8,2,9,10, 4, 6, 12], 10, "red");

createContainer("main-container", 400, 600)
createTitle("chart-2-container", "Some Graph", 35, "red");
createChartInner("chart-2-container");
createBars("chart-2-container", [45,21,10,5,34], 20, "blue");