define(function(){

	var MARGIN = {top:20, right:20, bottom:30, left:40};
	/*
     * @param {HTMLElement}     div
     *                  		The dom element to host the control.
     */
	var ChartRender = function(div) {
		if (div == null) {
			throw new Error("div param is required in constructor of ChartRender.");
		}
		this._dom = div;
		this._dom$ = $(div);
		//calculate the height via width
		this._options = null;
	};

	ChartRender.prototype.render = function(chartOptions) {
		if (chartOptions.data == null && chartOptions.dataCsv == null) {
			return;
		}
		this._options = chartOptions;
		if (chartOptions.title) {
			var title = $('<h1>').addClass('chart-title');
			title.html(chartOptions.title).css('margin-left',MARGIN.left).appendTo(this._dom$);
		}
		var titleHeight = title ? title.height() : 0;
		var width = chartOptions.size.width - MARGIN.right - MARGIN.left;
		var height = chartOptions.size.height - MARGIN.top - MARGIN.bottom - titleHeight;
		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);
		var y = d3.scale.linear()
			.range([height, 0]);
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom');
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left')
			.ticks(10, '%');

		var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([-10, 0])
		  .html(function(d) {
		    return "<strong>Frequency:</strong>" + d.frequency + "</span>";
		  })

		var svg = d3.select(this._dom).append('svg')
			.attr('width', this._dom$.width())
			.attr('height', this._dom$.height() - titleHeight)
			.append('g')
			.attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')');
		if (chartOptions.dataCsv) {
			d3.csv(chartOptions.dataCsv, function(error, data) {
				if (error) {
					throw error;
				}
				x.domain(data.map(function(d){return d.letter}));
				y.domain([0, d3.max(data.map(function(d) {return d.frequency}))]);
				//draw x axis
				svg.append('g')
					.attr('class', 'x axis')
					.attr('transform', 'translate(0,' + height + ')')
					.call(xAxis);
				//draw y axis
				svg.append('g')
					.attr('class', 'y axis')
					.call(yAxis)
				   .append('text')
					.attr('transform', 'rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text('Frequency');

				svg.call(tip);
				//add datapoints of bar
				svg.selectAll('.bar')
					.data(data)
					.enter().append('rect')
					.attr('class', 'bar')
					.attr('x',function(d) {return x(d.letter)})
					.attr('width', function(d) {return x.rangeBand()})
					.attr('y', height)
					.attr('height', 0)
					//mouseover
					.on('mouseover', 
						function(d) {
							d3.select(this).style({
								"stroke": "#4cb771",
								"stroke-width":"2px"
							});

							tip.show(d);
						}
					)
					//mouseout
					.on('mouseout', function(d) {
						d3.select(this).style({
							"stroke": null,
							"stroke-width":null
						});
						tip.hide(d);
					})
					.on('click', function(d) {
						d3.select(this).style({
							'fill':'#4cb771'
						})
						console.log(d);
					})
					.on('blur', function(d) {
						d3.select(this).style({
							'fill':'rgb(149,222,171)'
						})
					})
					//animation
					.transition()
					.attr('y', function(d) {return y(d.frequency)})
					.attr('height', function(d) {return height - y(d.frequency)})
					.delay(function(d, i) { return i * 20; })
					.duration(2000)
					.ease('elastic');

			});
		}	
	};

	ChartRender.prototype.size = function(size) {
		if (this._options && size) {
			this._dom$.children().remove();
			this._options.size = size;
			this.render(this._options);
		}
	};

	ChartRender.prototype.destroy = function() {
		
	}



	
	return ChartRender;
})