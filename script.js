const w = 800,
      h = 400,
      padding = 56,
      div = d3.select(".diagram")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0),
      svg = d3.select(".diagram")
      .append("svg")
      .attr("width", w + padding * 2)
      .attr("height", h + padding * 2.4);
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
  .attr("cx", (d) => xScale(d.Year) + padding)
  .attr("cy", (d) => yScale(d.Seconds * 1000) + padding)
  .attr("r", 5)
  .attr("class", "dot")
  .attr("class", (d) => d.Doping ? "yes" : "no")
  
  const xAxis = d3.axisBottom(xScale)
  .tickFormat(d3.format(""));
  const yAxis = d3.axisLeft(yScale)
  .tickFormat(d3.timeFormat("%M:%S"));
  svg.append("g")
  .attr("transform", "translate(" + padding + "," + (h + padding) + ")")
  .call(xAxis)      
  .attr("id", "x-axis");
  svg.append("g")
  .attr("transform", "translate(" + padding + "," + padding + ")")
  .call(yAxis)
  .attr("id", "y-axis");
});
