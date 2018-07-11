(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "mpn",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "brand_name",
            alias: "brand",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "manufacturer",
            
            dataType: tableau.dataTypeEnum.string
        },{
            id: "sku",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "name",
            alias: "Seller Name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "1",
            alias: "USD",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "octopart",
            alias: "Part Data Search by MPN",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var mpnObj = JSON.parse(tableau.connectionData),
            partNum = mpnObj.partNum,
            apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partNum+"%22%7d%5d&include%5b%5d=specs,compliance_documents,&callback=?";
        $.getJSON(apiCall, function(resp) {
            tableau.log(apiCall)
            var feat = resp.results,
                tableData = [];
               
            // Iterate over the JSON object
            // for (var i = 0, len = feat[0].items.length; i < len; i++) {
                
            //     tableData.push({
            //         "mpn": feat[0].items[i].mpn,
            //         "uid": feat[0].items[i].brand.name,
            //         "name": feat[0].items[i].manufacturer.name
                    
                   
            //     });
            // }

            for (var i = 0, len = feat[0].items.length; i < len; i++) {

                for (var j = 0, len = feat[0].items[i].offers.length; j < len; j++){
                    // tableau.log(feat[0].items[i].offers[j].prices.USD)

                    // for (var k = 0, len = feat[0].items[i].offers[j].prices.USD.length; k < len; k++){   

                        tableData.push({
                            "mpn": feat[0].items[i].mpn,
                            "brand_name": feat[0].items[i].brand.name,
                            "manufacturer": feat[0].items[i].manufacturer.name,
                            "sku" : feat[0].items[i].offers[j].sku,
                            "name" : feat[0].items[i].offers[j].seller.name
                            // "1" : feat[0].items[i].offers[j].prices.USD[k][1]
                });
                // }
                }
            }


            // for (var i = 0, len = feat[0].items.length; i < len; i++) {
            //     for (var j = 0, len = feat[0].items[i].offers.length; j < len; j++){
            //         for (var k = 0, len = feat[0].items[i].offers[k].sellers.length; k < len; k++){
            //             tableData.push({
            //                 "mpn": feat[0].items[i].mpn,
            //                 "uid": feat[0].items[i].brand.name,
            //                 "name": feat[0].items[i].manufacturer.name,
            //                 "sku" : feat[0].items[i].offers[j].sku
            //     });
            //         }
            //         for (var l = 0, len = feat[0].items[i].offers[k].prices.length; l < len; l++){
            //             for (var m = 0, len = feat[0].items[i].offers[k].USD[l].length; m < len; m++){
            //             tableData.push({
            //                 "name":feat[0].items[i].offers[k].name,
            //                 "1" : feat[0].items[i].offers[k].prices.USD[m].'1'
            //     });
            //         }
            //         }
            //     }
                
            // }

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