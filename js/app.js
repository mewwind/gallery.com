require.config({
	baseUrl: "js/src"
});
require(['Chart'],
function(Chart) {

	var navItem = $(".nav-menu div");
	navItem.first().addClass('nav-item-highlight');
	navItem.click(function() {
		$(this).addClass('nav-item-highlight').siblings().removeClass('nav-item-highlight');
		return false;
	})
	var chartContainer$ = $('.chart-holder');

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