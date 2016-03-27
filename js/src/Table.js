define(function() {
	var Table = function(div) {
		if (div == null) {
			throw new Error("div param is required in constructor of Table.");
		}
		this._dom = div;
		this._dom$ = $(div);
		this._options = null;
		this.init();
	};

	Table.prototype.init = function() {
		this._table = $('<div>').addClass('table table-hover table-style').appendTo(this._dom$);
		this._table.append('<h2 class=chart-title>Chart Data');
	};

	function createHead(data, table) {
		if (data.length > 0) {
			table._heads = heads = Object.keys(data[0]);
			var ths = '';
			heads.forEach(function(head) {
				ths += ('<th>'+ head);
			});
			var headTr$ = table.append('<thead><tr>' + ths);
			return headTr$;
		}
		return null;
	};

	function createBody(data, table) {
		if (data.length > 0) {
			var trs = '';
			data.forEach(function(d) {
				trs += '<tr>';
				table._heads.forEach(function(h) {
					trs += ('<td>' + d[h]);
				});

			});
			var body$ = table.append('<tbody>' + trs);
			return body$;
		};
		return null;
	}

	Table.prototype.render = function(options) {
		if (options.dataCsv == null) {
			return;
		}
		d3.csv(options.dataCsv, function(error, data) {
			var tableHead = createHead(data, this._table);
			var tableBody = createBody(data, this._table);
			$.trigger('tableRenderComplete', [data])
		}.bind(this));
	};

	return Table;
});