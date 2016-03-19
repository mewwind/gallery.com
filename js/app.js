require.config({
	baseUrl: "js/src"
});
require(['Chart'],
function(Chart) {


	var chartContainer$ = $('.chart-holder');

	var config = {
		"chart": {
			dataCsv: "resources/data.csv",
			title: "Bar Chart",
			type: "chart"
		},
		"geomap": {
			geojson: "resources/china.geojson",
			title: "Geo Map of China",
			type: "geomap"
		}
	};
    var chart = new Chart(chartContainer$[0]);
    chart.render(config.chart);

    var navItem = $(".nav-menu div");
	navItem.first().addClass('nav-item-highlight');
	navItem.click(function() {
		$(this).addClass('nav-item-highlight').siblings().removeClass('nav-item-highlight');
		chart.destroy();
		if ($(this).find("span").hasClass('octicon-globe')) {
			chart.render(config.geomap);
		} else {
			chart.render(config.chart);
		}
		return false;
	})
    $(window).resize(function() {
    	chart.validateSize();
    })
});