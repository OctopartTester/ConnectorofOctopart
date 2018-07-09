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
        var mpnObj = JSON.parse(tableau.connectionData),
            partNum = mpnObj.part,
            apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22" +partNum+ "%22%7d%5d&pretty_print=true&include[]=specs,reference_designs,datasheets,compliance_documents,cad_models,%20descriptions,category_uids&callback=?";

        $.getJSON(apiCall, function(resp) {
            tableau.log(apiCall)
            var feat = resp.results,
                tableData = [];
                 
                 
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                
                tableData.push({

                    "uid": feat[i].items.brand.uid,
                    "name": feat[i].items.manufacturer.name,
                    "octopart_url": feat[i].items.octopart_url
                   
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            var mpnObj = {
                partNum: $('#part').val().trim(),
                
            };        
                tableau.connectionData = JSON.stringify(mpnObj); // Use this variable to pass data to your getSchema and getData functions
                tableau.connectionName = "Octopart Source"; // This will be the data source name in Tableau
                tableau.submit(); // This sends the connector object to Tableau
            
        });
    });
})();