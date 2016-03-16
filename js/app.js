require.config({
	baseUrl: "js/src"
});
require(['ChartRender'],
function(ChartRender) {
	var chartContainer$ = $('.chart-holder');

	//width is 80% of outer-container width.
	//height is 80% of width.
	chartContainer$.css("width", "80%");
	var height = chartContainer$.width() * 0.7;
	chartContainer$.css("height", height);

	var chartOptions = {
		dataCsv: "resources/data.csv",
		title: "Bar Chart"
	};
    var chartRender = new ChartRender(chartContainer$[0]);
    chartRender.render(chartOptions);
    $(window).resize(function() {
    	chartRender.validateSize();
    })
});