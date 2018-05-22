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
- *Type: Array* - An array representing data values to be graphed.
  - No label or per-bar color assignment
    - Unstacked `data = [1, 2, 3, 4 ...]`
    - Stacked `data = [[1, 2, 3], [4, 5, 6], [7, 8, 9] ...]`
  - With label or per-bar color assignment
    - Unstacked `data = [{value : 10, color : "red", label: "apples"}, {value: 5, color: "yellow", label:"bananas"} ...]`
    - Stacked `data = [{value : [2, 4, 5], color : "black", label: "Monday"}, {value: [1, 6, 9], color: "blue", label:"Tuesday" ...}]`


#### options
- *Type: Object* - An object representing configuration options for the graph
  - `options.graphType` *String ( "bar" | "stacked" )*

  - `options.width` *Number*

  - `options.height` *Number*

  - `options.title` *String*

  - `options.titleFontSize` *Number*

  - `options.titleColor` *Number*

  - `options.barSpacing` *Number*

  - `options.stackedBarColors` *Array*

  - `options.stackedBarLegend` *Array*

  - `options.barValPosition` *String ( "top" | "center" | "bottom" )*

  - `options.barValColor` *String*

  - `options.barLabelColor` *String*

  - `options.displayGrid` *Bool*

#### element
  - *Type: String* - A string representing the DOM element.id of the container the graph will be rendered to

## Bugs

## Roadmap

## External Resources
* [Color-Hex](www.color-hex.com)
* [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Mozilla Web Docs*Type: Array*.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
* [jQuery Documentation](http://api.jquery.com) - .prepend() .after() .hasClass()
* [Markdown Live Preview](http://markdownlivepreview.com/)
* [Awesome-Computer-Vision](https://github.com/jbhuang0604/awesome-computer-vision/blob/master/README.md) - Markdown example
* [stackoverflow](https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class#1249554) - Help with typeof, instanceof, obj.constructor
* [stackoverflow](https://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript) -