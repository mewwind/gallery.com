require.config({
	baseUrl: "js/src"
});
require(['ChartRender'],
function(ChartRender) {
	var chartContainer$ = $('.chart-holder');
	chartContainer$.css({width:960, height:500});
	var chartOptions = {
		dataCsv: "resources/data.csv",
		title: "Bar Chart"
	};
    var chartRender = new ChartRender(chartContainer$[0]);
    chartRender.render(chartOptions);
});