require.config({
	baseUrl: "js/src"
});
require(['Chart'],
function(Chart) {
	var chartContainer$ = $('.chart-holder');

	//width is 80% of outer-container width.
	chartContainer$.css("width", "80%");

	var chartOptions = {
		dataCsv: "resources/data.csv",
		title: "Bar Chart"
	};
    var chart = new Chart(chartContainer$[0]);
    chart.render(chartOptions);
    $(window).resize(function() {
    	chart.validateSize();
    })
});