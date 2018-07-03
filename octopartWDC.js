(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "uid",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "name",
            alias: "manufacturer",
            dataType: tableau.dataTypeEnum.string
        }, {
            id:"octopart_url",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "octopart",
            alias: "Part Data with texas in the name",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("http://octopart.com/api/v3/parts/search?q=texas&apikey=80dfab31", function(resp) {
            var feat = resp.results,
                tableData = [];
                 
                 
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                
                tableData.push({

                    "uid": feat[i].item.brand.uid,
                    "name": feat[i].item.manufacturer.name,
                    "octopart_url": feat[i].item.octopart_url
                   
                });
                tableau.log('after te push')
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Octopart Data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();