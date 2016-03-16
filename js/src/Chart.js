define(["ChartRender"],
function(ChartRender) {
	var Chart = function(div, uiConfig) {
		this._dom = div;
		this._dom$ = $(div);
		this._uiConfig = uiConfig;
		this._createRender();
	};

	Chart.prototype._createRender = function() {
		this._chartRender = new ChartRender(this._dom);
	};

	Chart.prototype.render = function(options) {
		if (this._chartRender) {
			var size = this._calculateSize();
			options.size = size;
			this._chartRender.render(options);
		}
	};

	Chart.prototype.validateSize = function() {
		var newSize = this._calculateSize();
		if (this._chartRender) {
			this._chartRender.size(newSize);
		}
	};

	Chart.prototype._calculateSize = function() {
		var width = this._dom$.width();
		var height = width * 0.7;
		this._dom$.css("height", height);
		return {
			width: width,
			height: height
		};
	};

	Chart.prototype.destroy = function() {

	};
	return Chart;
});