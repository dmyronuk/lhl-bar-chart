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


let drawBarChart = (data, options, element) => {

}

createContainer("main-container", 700, 400)
createTitle("chart-1-container", "Some Graph", 35, "red");
createChartInner("chart-1-container");

createContainer("main-container", 400, 600)
createTitle("chart-2-container", "Some Graph", 35, "red");
createChartInner("chart-2-container");