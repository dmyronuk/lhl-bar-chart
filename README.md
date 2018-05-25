# Bar Chart Generator

## About
This project is a prep assignment for Lighthouse Labs' Web Development bootcamp.  Build html bar graphs!

## Features + Screenshots

## Usage

Embed bar-chart.js and chart-style.css into an html document, then use the api by calling:

```javascript
drawBarChart(data, options, element)
```

#### data
- *Type: Array* - Each element represents a data value or array of values to be rendered as a single bar. Each element can be labelled and assigned it's own color.  The data type of the elements will determine what type of graph is rendered.
  - Unstacked bar graph with no labels and no per-bar color assignments: `data = [1, 2, 3, 4]`

  - Stacked bar graph with no labels and no per-bar color assignments: `data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`

  - Unstacked bar graph with labels or per-bar color assignments:
    `data = [{value : 10, color : "red", label: "apples"}, {value: 5, color: "yellow", label:"bananas"}]`

  - Stacked bar graph with labels or per-bar color assignments:
    `data = [{value : [1, 2, 3], color : "black", label: "Monday"}, {value: [4, 5, 6], color: "blue", label:"Tuesday"}]`

#### options
- *Type: Object* - An object representing configuration options for the graph.  If no options argument is supplied, the graph will be rendered using a default configuration.
  - `options.width` *Number*

  - `options.height` *Number*

  - `options.title` *String*

  - `options.titleFontSize` *Number*

  - `options.titleColor` *Number*

  - `options.barSpacing` *Number*

  - `options.barColor` *String* - Applies to unstacked graphs.  Sets the color of every bar in the graph.  If per-bar colors are specified by the `data` arg, they will override this option.

  - `options.stackedBarColors` *Array* - Applies to stacked graphs.  Each element of the array is a string representing a stacked bar color.  The 0th element is the bottom color and the last element is the top color.  If this option is not set, colors will be randomly assigned.  Similarly, if not enough colors are supplied, i.e. each stacked bar has 4 data values but only 3 colors are specified, then the 4th color will be randomly assigned.

  - `options.stackedBarLegend` *null | Array* - Applies to stacked graphs.  Appends a legend below the graph container that maps stacked bar colors to a label.  Each element of the array is a string that is matched with a color.  The n<sup>th</sup> element of the array matches with the n<sup>th</sup> element of `stackedBarColors`.

  - `options.barValPosition` *null | String ("bottom" | "center" | "top")* - Toggles whether or not the numeric value of each bar will be displayed alongside the bar.  If not null, the string specifies the relative position of the value label.

  - `options.barValColor` *String* - Applies when `barValPosition !== null`.  Sets the font color of the displayed numeric value of each bar.

  - `options.barLabelColor` *String* - Applies font color if labels are passed into the `data` argument.

  - `options.displayGrid` *Bool* - Toggles whether gridlines are displayed perpedicular to the y-axis ticks.

#### element
  - *Type: String* - A string representing the DOM element.id of the container the graph will be rendered to.

## Bugs
  - Setting `options.barSpacing` to a value greater than the width of the bars will prevent the bars from rendering properly
  - `options.stackedBarLegend` renders the legend outside of the container defined by `options.height, options.width`

## Roadmap

## Resources
* [Color-Hex](www.color-hex.com)
* [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Markdown Live Preview](http://markdownlivepreview.com/)
* [Awesome-Computer-Vision](https://github.com/jbhuang0604/awesome-computer-vision/blob/master/README.md) - Markdown example
* [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) - Array.prototype.reduce()
* [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) - CSS outline property
* [jQuery Documentation](http://api.jquery.com) - .prepend() .after() .hasClass()
* [stackoverflow](https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class#1249554) - Help with typeof, instanceof, obj.constructor
* [stackoverflow](https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript) - Help debugging
* [stackoverflow](https://stackoverflow.com/questions/15155778/superscript-in-markdown-github-flavored) - Markdown superscripts
* [stackoverflow](https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container#19814948) - Font scaling based on container width
