(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
	    var cols = [{
	        id: "uid",
	        dataType: tableau.dataTypeEnum.string
	    }, 
	     {
	        id: "name",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "is_authorized",
	        dataType: tableau.dataTypeEnum.bool
	    }];

	    var tableSchema = {
	        id: "Octopart Part Search",
	        columns: cols
    };

    schemaCallback([tableSchema]);
};

    myConnector.getData = function(table, doneCallback) {
	    $.getJSON("https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=[{%22mpn%22:%22SN74S74N%22}]&pretty_print=true", function(resp) {
	        var feat = resp.features,
	            tableData = [];

	        // Iterate over the JSON object
	        for (var i = 0, len = feat.length; i < len; i++) {
	            tableData.push({
	                "uid": feat[i].uid,
	                "name": feat[i].properties.name,
	                "title": feat[i].properties.title
	                
	            });
	        }

	        table.appendRows(tableData);
	        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Octopart API";
        tableau.submit();
    });
});
})();