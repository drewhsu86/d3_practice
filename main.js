
const data1 = [4, 7, 2, 35, 1, 43, 2, 76];

// https://observablehq.com/@d3/lets-make-a-bar-chart
// Basics of dom manipulation using d3

function createBarGraphDiv(data) {

  const x = d3.scaleLinear()
    .domain([0, d3.max(data1)])
    .range([0, 420]);

  const div = d3.create("div")
    .style("font", "10px sans-serif")
    .style("text-align", "right")
    .style("color", "white");

  div.selectAll("div")
    .data(data)
    .join("div")
    .style("background", "steelblue")
    .style("margin", "1px")
    .style("padding", "3px")
    .style("width", d => `${x(d)}px`)
    .text(d => d);

  return div.node();
}

// https://observablehq.com/@d3/lets-make-a-bar-chart/2 
// switch to using svgs from divs 

function createBarGraphSVG(data) {

  const width = 420;

  const x = d3.scaleLinear()
    .domain([0, d3.max(data1)])
    .range([0, width]);
  
  const y = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, 20 * data.length]);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", y.range()[1])
    .attr("font-family", "sans-serif")
    .attr("font-size", "10")
    .attr("text-anchor", "end");

  // bars of bar graph 
  const bar = svg.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d, i) => `translate(0,${y(i)})`);
  
  bar.append("rect")
    .attr("fill", "steelblue")
    .attr("width", x)
    .attr("height", y.bandwidth() - 1);

  bar.append("text")
    .attr("fill", "white")
    .attr("x", d => x(d) - 3)
    .attr("y", y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => d);
  
  return svg.node();
}

// appending d3 practice to the dom

const body = document.querySelector("body");

body.append(createBarGraphDiv(data1))
body.append(createBarGraphSVG(data1))
