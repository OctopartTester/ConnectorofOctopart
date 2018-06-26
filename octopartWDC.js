(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "hits",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "OctopartData",
        alias: "This is a search for the part with mpn of SN74S74N",
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
                "hits": feat[i],
                "mag": feat[i].properties.mag,
                "title": feat[i].properties.title,
                "location": feat[i].geometry
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Octopart Data";
        tableau.submit();
    });
});
})();