
Template.barChart.onRendered( function(){

  	var barHeight = (($(window).height() - $('.navbar').height())*.9)/2;
  	// console.log('barHeight', barHeight);

  	var mainElement = d3.select('.plotContainer');
	//Width and height
	var margin = {top: 10, right: 10, bottom: 30, left: 25}
		, width = parseInt(mainElement.style('width'), 10) - parseInt(mainElement.style('padding'),10) //get container width less padding
	    , width = width - margin.left - margin.right
	    , height = barHeight - margin.top - margin.bottom;

	//set x scale
	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width-margin.left], .1);

	//set y scale
	var y = d3.scale.linear()
	    .range([(height*.9), 0]);

	// create x axis
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	// create y axis
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(5)
	    ;

	    
	var chart = d3.select("div#barChart")
	   .append("div")
	   // .attr('style', 'height: '+barHeight)
	   .classed("svg-container", true) //container class to make it responsive
	   .append("svg")
	   //responsive SVG needs these 2 attributes and no width and height attr
	   .attr("preserveAspectRatio", "xMinYMin meet")
	   .attr("viewBox","0 0 " + width + " " + (height*1.2))
	   //class to make it responsive
	   .classed("svg-content-responsive", true)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var parentChart = $("div#barChart .svg-container")
		.css('height', barHeight);

	Tracker.autorun(function(){

		// var dateRange = Session.get('dates');
		var appFilters = Session.get('globalFilters');
		var monFilterString = getGlobalFilterForMongo(appFilters);
		Meteor.subscribe('MatchPointMetrics',monFilterString);

		var data = MatchPointMetrics.find({}).fetch();
		// console.log('data',data);

		x.domain(data.map(function(d) { return d._id; }));
		y.domain([0, d3.max(data, function(d) { return d.value; })]);

		chart.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + (height*.9) + ")")
		  .call(xAxis)
		.selectAll(".tick text")
		  .call(wrap, x.rangeBand());

		chart.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end");

		chart.selectAll(".bar")
		  .data(data)
		.enter().append("rect")
		  .attr("class", "bar");

		var bar = chart.selectAll(".bar");

		//Update the bars and draw width, height, and positioning
		bar.transition()
			.delay(function(d, i) {
				return i / data.length * 1000;
			}) // this delay will make transistions sequential instead of paralle
			.duration(500)
			.attr("x", function(d) { return x(d._id); })
			.attr("y", function(d) { return y(d.value); })
			.attr("width", x.rangeBand())
			.attr("height", function(d) { return (height*.9) - y(d.value); })
			.attr("fill", function(d) {
				return "rgb(0, 0, " + (d.value * 10) + ")";
			});


		//Update all labels

		// //Select…
		// var labels = svg.selectAll("text")
		// 	.data(dataset, key);
		
		// //Enter…
		// labels.enter()
		// 	.append("text")
		// 	.text(function(d) {
		// 		return d.value;
		// 	})
		// 	.attr("text-anchor", "middle")
		// 	.attr("x", width)
		// 	.attr("y", function(d) {
		// 		return h - yScale(d.value) + 14;
		// 	})						
		//    .attr("font-family", "sans-serif")
		//    .attr("font-size", "11px")
		//    .attr("fill", "white");

		// //Update…
		// labels.transition()
		// 	// .delay(function(d, i) {
		// 	// 	return i / dataset.length * 1000;
		// 	// }) // this delay will make transistions sequential instead of paralle
		// 	.duration(500)
		// 	.attr("x", function(d, i) {
		// 		return xScale(i) + xScale.rangeBand() / 2;
		// 	}).attr("y", function(d) {
		// 		return h - yScale(d.value) + 14;
		// 	}).text(function(d) {
		// 		return d.value;
		// 	});

	// });
	});

	function wrap(text, width) {
	  text.each(function() {
	    var text = d3.select(this),
	        words = text.text().split(/\s+/).reverse(),
	        word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1, // ems
	        y = text.attr("y"),
	        dy = parseFloat(text.attr("dy")),
	        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
	    while (word = words.pop()) {
	      line.push(word);
	      tspan.text(line.join(" "));
	      if (tspan.node().getComputedTextLength() > width) {
	        line.pop();
	        tspan.text(line.join(" "));
	        line = [word];
	        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      }
	    }
	  });
	}
});