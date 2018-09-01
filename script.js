const margin = {
        top: 100,
        right: 20,
        bottom: 30,
        left: 60
      },
      w = 900 - margin.right - margin.left,
      h = 630 - margin.top - margin.bottom,
      div = d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0),
      color = d3.scaleOrdinal(d3.schemeDark2),
      colorTooltip = d3.scaleOrdinal(d3.schemePastel2);
      svg = d3.select("body")
      .append("svg")
      .attr("width", w + margin.right + margin.left)
      .attr("height", h + margin.top + margin.bottom);

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then((json) => {
  json.forEach((d) => d.Time = new Date(Date.UTC(1970, 0, 1, 0, 0, d.Seconds)));
  const xMin = d3.min(json, (d) => d.Year);
  const xMax = d3.max(json, (d) => d.Year);
  const yMin = d3.min(json, (d) => d.Time);
  const yMax = d3.max(json, (d) => d.Time);  
  const xScale = d3.scaleLinear()
  .domain([xMin-1, xMax+1])
  .range([margin.left, w + margin.left - margin.right]);
  
  const yScale = d3.scaleTime()
  .domain([yMin, yMax])
  .range([margin.top, h + margin.top - margin.bottom]);
  
  svg.selectAll("circle")
  .data(json)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.Year))
  .attr("cy", (d) => yScale(d.Time))
  .attr("r", 6)
  .attr("class", "dot")
  .attr("data-xvalue", (d) => d.Year)
  .attr("data-yvalue", (d) => d.Time.toISOString())
  .style("fill", function(d) {
      return color(d.Doping != "");
    })
  .on("mouseover", (d, i) => {
    div.transition()
    .duration(200)
    .style("opacity", .9)
    .style("background", colorTooltip(d.Doping != ""));
    div.html(d.Name + ': ' + d.Nationality + '<br>' + 'Year: ' + d.Year + ', Time: ' + d.Time + (d.Doping ? '<br/><br/>' + d.Doping : ''));
    div.style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 26) + "px");
  })
  .on("mouseout", () => {
    div.transition()        
    .duration(500)      
    .style("opacity", 0);
  });
  
  const xAxis = d3.axisBottom(xScale)
  .tickFormat(d3.format(""));
  
  const yAxis = d3.axisLeft(yScale)
  .tickFormat(d3.timeFormat("%M:%S"));
  
  svg.append("g")
  .attr("transform", "translate(" + 0 + "," + (h + margin.top - margin.bottom) + ")")
  .call(xAxis)      
  .attr("id", "x-axis");
  
  svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + 0 + ")")
  .call(yAxis)
  .attr("id", "y-axis");
  
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr('x', -margin.top * 2)
  .attr('y', margin.left / 4)
  .text('Time in Minutes')
  .attr("class", "info");  
  
  svg.append("text")
  .attr("text-anchor", "middle")
  .attr("x", (w + margin.left + margin.right) / 2)
  .attr("y", 48)
  .text('Doping in Professional Bicycle Racing')
  .style("font-size", 28 + "px");
  
  svg.append("text")
  .attr("text-anchor", "middle")
  .attr("x", (w + margin.left + margin.right) / 2)
  .attr("y", 76)
  .text('35 Fastest times up Alpe d\'Huez')
  .style("font-size", 20 + "px");
  
  const legend = svg.selectAll(".legend")
  .data(color.domain())
  .enter().append("g")
  .attr("class", "legend")
  .attr("id", "legend")
  .attr("transform", function(d, i) {
    return "translate(0," + (h/2 + i * 20) + ")";
  });

  legend.append("rect")
  .attr("x", w)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

  legend.append("text")
  .attr("x", w - 6)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) {
    if (d) return "Riders with doping allegations";
    else {
      return "No doping allegations";
    };
  })
  .attr("class", "info");
});
