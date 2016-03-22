define(function(){
	//the index indicates the scale-to-width ratio.
	INDEX = 0.85;
	var GeoChartRender = function(div) {
		if (div == null) {
			throw new Error("div param is required in constructor of GeoChartRender.");
		}
		this._dom = div;
		this._dom$ = $(div);
		//calculate the height via width
		this._options = null;
	};
	GeoChartRender.prototype.render = function(chartOptions) {
		if (chartOptions.geojson == null) {
			return;
		}
		this._options = chartOptions;
		var width = this._dom$.width();
		var height = this._dom$.height();
		var svg = d3.select(this._dom).append("svg")
		    .attr("width", width)
		    .attr("height", height)
		    .append("g")
		    .attr("transform", "translate(0,0)");
		
		var scale = width * INDEX;
		var projection = d3.geo.mercator()
							.center([107, 39])
							.scale(scale)
	    					.translate([width/2, height/2]);
		
		var path = d3.geo.path()
						.projection(projection);
		
		
		var color = d3.scale.category20();
		
		var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([-10, 0])
		  .html(function(d) {
		    return d.properties.name + "</span>";
		  })

		svg.call(tip);
		d3.json(chartOptions.geojson, function(error, root) {
			
			if (error) 
				return console.error(error);
			console.log(root.features);
			
			svg.selectAll("path")
				.data( root.features )
				.enter()
				.append("path")
				.attr("stroke","#000")
				.attr("stroke-width",1)
				.attr("fill", function(d,i){
					return color(i);
				})
				.attr("d", path )
				.on("mouseover",function(d,i){
	                d3.select(this)
	                    .attr("fill","yellow");
	                tip.show(d);
	            })
	            .on("mouseout",function(d,i){
	                d3.select(this)
	                    .attr("fill",color(i));
	            });
			
		});		
	}
	GeoChartRender.prototype.destroy = function() {
		this._dom$.children().remove();
	};

	GeoChartRender.prototype.size = function(size) {
		if (this._options && size) {
			this.destroy();
			this._options.size = size;
			this.render(this._options);
		}
	};

	return GeoChartRender;
	
});
