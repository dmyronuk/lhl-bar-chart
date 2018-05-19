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

createTitle("chart-container-a", "Some Graph", 35, "red");
createChartInner("chart-container-a");
