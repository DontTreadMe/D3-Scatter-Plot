const w = 600,
      h = 500,
      padding = 46,
      div = d3.select(".diagram")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0),
      svg = d3.select(".diagram")
      .append("svg")
      .attr("width", w + padding * 2.6)
      .attr("height", h + padding * 2);
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then((json) => {
  const xMin = d3.min(json, (d) => d.Year);
  const xMax = d3.max(json, (d) => d.Year);
  const yMin = d3.min(json, (d) => d.Seconds * 1000);
  const yMax = d3.max(json, (d) => d.Seconds * 1000);
  const xScale = d3.scaleLinear()
  .domain([xMin-1, xMax+1])
  .range([0, w]);
  const yScale = d3.scaleTime()
  .domain([yMin, yMax])
  .range([0, h]);
  svg.selectAll("circle")
  .data(json)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.Year) + padding * 2)
  .attr("cy", (d) => yScale(d.Seconds * 1000) + padding)
  .attr("r", 6)
  .attr("class", "dot")
  .attr("class", (d) => d.Doping ? "yes" : "no")
  
  const xAxis = d3.axisBottom(xScale)
  .tickFormat(d3.format(""));
  const yAxis = d3.axisLeft(yScale)
  .tickFormat(d3.timeFormat("%M:%S"));
  svg.append("g")
  .attr("transform", "translate(" + padding * 2 + "," + (h + padding) + ")")
  .call(xAxis)      
  .attr("id", "x-axis");
  svg.append("g")
  .attr("transform", "translate(" + padding * 2 + "," + padding + ")")
  .call(yAxis)
  .attr("id", "y-axis");
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr('x', -200)
  .attr('y', 40)
  .text("Time in Minutes")
  .attr("class", "info");
  svg.append("rect")
  .attr("x", w + padding * 2)
  .attr("y", h / 2 - 20)
  .attr("width", 16)
  .attr("height", 16)
  .attr("class", "no");
  svg.append("rect")
  .attr("x", w + padding * 2)
  .attr("y", h / 2)
  .attr("width", 16)
  .attr("height", 16)
  .attr("class", "yes");
  svg.append("text")
  .attr("x", w + padding * 2 - 5)
  .attr("y", h / 2 - 8)
  .attr("text-anchor", "end")
  .text("No doping allegations")
  .attr("class", "info");
  svg.append("text")
  .attr("x", w + padding * 2 - 5)
  .attr("y", h / 2 + 10)
  .attr("text-anchor", "end")
  .text("Riders with doping allegations")
  .attr("class", "info");
  
});
