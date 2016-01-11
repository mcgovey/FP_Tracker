
Template.fpBulletChart.onRendered( function(){
    this.subscribe('MatchPointMetrics');




  // // create x axis
  // var xAxis = d3.svg.axis()
  //     .scale(x)
  //     .orient("bottom");

  // // create y axis
  // var yAxis = d3.svg.axis()
  //     .scale(y)
  //     .orient("left")
  //     .ticks(5)
  //     ;


  Deps.autorun(function(){

    var data = MatchPointMetrics.find({}).fetch();
    console.log('data', data);

    if (data.length!==0) {

      var mainElement = d3.select('.plotContainer');
      //Width and height
      var margin = {top: 10, right: 10, bottom: 30, left: 25}
        , width = parseInt(mainElement.style('width'), 10) - parseInt(mainElement.style('padding'),10) //get container width less padding
        , width = width - margin.left - margin.right
        , height = (data.length*36) - margin.top - margin.bottom;

      //set x scale
      var dim = d3.scale.ordinal()
      .rangeRoundBands([0, height-margin.bottom], .1);

      // //set y scale
      var mes = d3.scale.linear()
      .range([width, 0]);

      var chart = d3.select("div#bulletChart")
       .append("svg")
       .attr("width", width)
       .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // console.log('data',data);

      dim.domain(data.map(function(d) { return d._id; }));
      mes.domain([0, d3.max(data, function(d) { return d.value; })]);

      // chart.append("g")
      //   .attr("class", "x axis")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(xAxis)
      // .selectAll(".tick text")
      //   .call(wrap, x.rangeBand());

      // chart.append("g")
      //   .attr("class", "y axis")
      //   .call(yAxis)
      // .append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", ".71em")
      //   .style("text-anchor", "end")
      //   // .text("Frequency")
      //   ;

      chart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        ;

      var bar = chart.selectAll(".bar");

      // //Update the bars and draw width, height, and positioning
      bar.transition()
        .delay(function(d, i) {
          return i / data.length * 1000;
        }) // this delay will make transistions sequential instead of paralle
        .duration(500)
        .attr("y", function(d) { return dim(d._id); })
        .attr("x", 0)//function(d) { return mes(d.value); }
        .attr("height", dim.rangeBand())
        .attr("width", function(d) { return width - mes(d.value); })
        .attr("fill", function(d) {
          return "rgb(0, 0, " + (d.value * 3) + ")";
        });

      //Select…
      var labels = chart.selectAll("text")
       .data(data);

      //Enter…
      labels.enter()
       .append("text")
       .text(function(d) {
         return d.value;
       })
       .attr("text-anchor", "middle")
       .attr("y", function(d) { return dim(d._id); })
       .attr("x", function(d) {
         return width - mes(d.value) + 14;
       })
         .attr("font-family", "sans-serif")
         .attr("font-size", "11px")
         .attr("fill", "white");


      //create line markers
      chart.selectAll(".marker")
        .data(data)
      .enter().append("line")
        .attr("class","marker");

      var marker = chart.selectAll(".marker");

      marker.transition()
        .delay(function(d, i) {
          return i / data.length * 1000;
        }) // this delay will make transistions sequential instead of paralle
        .duration(500)
        // .attr("style","{ stroke: #000; stroke-width: 2px; }")
        .attr("x", function(d) { return dim(d._id); })
        .attr("y", function(d) { return mes(d.value); })
        .attr("height", dim.rangeBand())
        .attr("width", function(d) { return height - mes(d.value); })
        .attr("fill", function(d) {
          return "red";
        });
      };
  });


});