# Bar Chart Generator

## About
This project is a prep assignment for Lighthouse Labs' Web Development bootcamp.

## Features + Screenshots
The script can generate both stacked and unstacked bar graphs with the following customizable options:  

- Container dimensions and background color
- Font family, size and color for title
- Font color for bar labels, value labels and y-axis label
- Per-bar color assignment for unstacked graphs
- Color assignment for each layer of stacked graphs   
- Optional legend mapping labels onto stacked graph colors
- Optional gridlines and bar outlines

![Sample Unstacked Graphs](https://raw.githubusercontent.com/dmyronuk/lhl-bar-chart/master/screenshots/home_cpi_graphs.png)
![Sample Stacked Graphs](https://raw.githubusercontent.com/dmyronuk/lhl-bar-chart/master/screenshots/power_sales_graphs.png)

## Usage

Embed bar-chart.js and chart-style.css into an html document, then use the api by calling:

```javascript
drawBarChart(data, options, element)
```

### data
*Type: Array* - Each element represents a data value or array of values to be rendered as a single bar. Each bar can be labelled and assigned it's own color.  The data type of the elements will determine what type of graph is rendered.

| Type | Example | Graph Type Rendered |
| :--- | :--- | :--- |
| *Number* | ```data = [1, 2, 3, 4]``` | Unstacked bar graph with no labels and no per-bar color assignments |
| *Array* | ```data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]``` | Stacked bar graph with no labels and no per-bar color assignments |
| *Object*| ```data = [{value: 10, color: "red", label: "apples"}, {value: 5, color: "yellow", label: "bananas"}]``` | Unstacked bar graph with labels or per-bar color assignments|
| *Object*| ```data = [{value: [1, 2, 3], color: "black", label: "Monday"}, {value: [4, 5, 6], color: "blue", label:"Tuesday"}]``` | Stacked bar graph with labels or per-bar color assignments |


### options
*Type: Object* - An object representing configuration options for the graph.  If no options argument is supplied, the graph will be rendered using a default configuration.

| Parameter | Type | Default Value |  Description |
| :--- | :--- | :--- | :--- |
| `options.backgroundColor` | *String* | #eeeeee | CSS background color of chart container |
| `options.barColor` | *String* | red | Applies only to unstacked graphs.  Sets the color of every bar in the graph.  If per-bar colors are specified by the `data` arg, they will override this option. |
| `options.barLabelColor` | *String* | null | Applies only if labels are passed to the function in the `data` argument.  Sets the CSS color property of the label. |
| `options.barSpacing` | *Number* | 15 | Space in pixels between chart bars |
| `options.barValColor` | *String* | null | Applies only if `barValPosition !== null`.  Sets the font color of the displayed numeric value of each bar.  If this value is not set then bar values will revert to `options.baseFontColor` |
| `options.barValPosition` | *String* | null | Toggles whether the numeric value of each bar will be displayed with the bar.  The string specifies the relative position of the label and allowable values are "top", "center" or "bottom". |
| `options.baseFont` | *String* | Arial | CSS font-family of chart |
| `options.baseFontColor` | *String* | black | CSS color property of the chart |
| `options.displayBarOutlines` | *Bool* | false | Toggles CSS outline property of bars |
| `options.displayValCommas` | *Bool* | false | Applies only if `barValPosition !== null`.  Formats the displayed bar value so that every third digit is separated by a comma. |
| `options.displayGrid` | *Bool* | true | Toggles display of chart grid |
| `options.height` | *Number* | 500 | Height of the rendered chart in pixels |
| `options.stackedBarColors` | *Array* | [ ] | Applies only to stacked graphs.  Each element of the array is a string representing a stacked bar color.  The 0<sup>th</sup> element is the bottom color and the last element is the top color.  If this option is not set, colors will be randomly assigned.  Similarly, if not enough colors are supplied, i.e. each stacked bar has 4 data values but only 3 colors are specified, then the 4th color will be randomly assigned. |
| `options.stackedBarLegend` | *Array* | null | Applies only to stacked graphs.  Appends a legend below the graph container that maps stacked bar colors to a label.  Each element of the array is a string that is matched with a color.  The n<sup>th</sup> element of the array matches with the n<sup>th</sup> element of `options.stackedBarColors`. |
| `options.tickDecimalPlaces` | *Number* | 0 | Specifies the decimal place that the y-axis tick values will be rounded to.  By default, y-ticks are rounded to 0 decimal places if the base tick is greater than one, or 1 decimal place if the base tick is less than one. |
| `options.title` | *String* | null | Title string inserted above chart |
| `options.titleFont` | *String* | Arial | CSS font-family of title |
| `options.titleFontSize` | *Number* | 35 | CSS font-size of title |
| `options.titleColor` | *Number* | black | CSS color of title |
| `options.width` | *Number* | 500 | Width of the rendered chart in pixels |
| `options.yAxisLabel` | *String* | null | Label string inserted parallel to the y-axis |
| `options.yAxisUnits` | *String* | null | Unit string inserted parallel to the y-axis |

### element
*Type: String* - A string representing the DOM element.id of the container the graph will be rendered to

## Bugs
- Negative y-values are currently unsupported and will render as bars with 0 height
- Long bar labels will sometimes overflow their containers depending on the width of the bar
- By default, the legend for stacked bar graphs renders outside of the container defined by `options.height, options.width`
- If `options.displayValCommas` is set to true and the data set contains floating point numbers, the commas will not be inserted correctly

## Roadmap
- Add chart annotation
- Add support for negative y-values

## Resources
- [Color-Hex](www.color-hex.com)
- [CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Flexbox Guide
- [CSS-Tricks](https://css-tricks.com/viewport-sized-typography/) - Viewport Sized Typography
- [w3schools](https://www.w3schools.com/cssref/css3_pr_transform.asp) - Transform Property
- [Markdown Live Preview](http://markdownlivepreview.com/)
- [Awesome-Computer-Vision](https://github.com/jbhuang0604/awesome-computer-vision/blob/master/README.md) - Markdown example
- [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) - Array.prototype.reduce()
- [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) - CSS outline property
- [jQuery Documentation](http://api.jquery.com) - .prepend() .after() .hasClass()
- [stackoverflow](https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class#1249554) - Help with typeof, instanceof, obj.constructor
- [stackoverflow](https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript) - Help debugging
- [stackoverflow](https://stackoverflow.com/questions/15155778/superscript-in-markdown-github-flavored) - Markdown superscripts
- [stackoverflow](https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container#19814948) - Font scaling based on container width
- [stackoverflow](https://stackoverflow.com/questions/9453421/how-to-round-float-numbers-in-javascript) - Rounding floats in JS
- [stackoverflow](https://stackoverflow.com/questions/17788990/access-the-css-after-selector-with-jquery) - :after with jQuery
- [stackoverflow](https://stackoverflow.com/questions/14494747/add-images-to-readme-md-on-github) - Embedding repo images into readme
- [Statistics Canada](http://www.statcan.gc.ca/tables-tableaux/sum-som/l01/cst01/econ46a-eng.htm) - Canada CPI Inflation
- [CREA](http://creastats.crea.ca/natl/index.html) - Canadian Home Prices
- [Toronto Raptors](http://www.nba.com/raptors/stats/team) - Team stats
