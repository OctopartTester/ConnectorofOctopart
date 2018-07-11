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
            id: "seller_name",
            alias: "Seller Name",
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
            partOne = mpnObj.partOne, 
            partTwo = mpnObj.partTwo, 
            partThree = mpnObj.partThree, 
            partFour = mpnObj.partFour, 
            partFive = mpnObj.partFive;
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&include%5b%5d=specs,compliance_documents,&callback=?&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d,"
            apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=[{%22mpn%22:%22"+partOne+"%22}"
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d%";
            if (partTwo){
                apiCall += ",{%22mpn%22:%22"+partTwo+"%22}"
            }
            if (partThree){
                apiCall += ",{%22mpn%22:%22"+partThree+"%22}"
            }
            if (partFour){
                apiCall += ",{%22mpn%22:%22"+partFour+"%22}"
            }
            if (partFive){
                apiCall += ",{%22mpn%22:%22"+partFive+"%22}"
            }
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d%5d&include%5b%5d=specs,compliance_documents,&callback=?";
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d%";
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=[{%22mpn%22:%22SN74S74N%22},{%22mpn%22:%22MS15795-803%22}]&pretty_print=true"
            // end = "%5d&include%5b%5d=specs,compliance_documents,&callback=?";
            end = "]&callback=?"
            apiCall += end;
             
        $.getJSON(apiCall, function(resp) {
            tableau.log(apiCall)
            var feat = resp.results,
                tableData = [];
               
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                for (var j = 0, len2 = feat[i].items.length; j < len2; j++){
                    for (var k = 0, len3 = feat[i].items[j].offers.length; k < len3; k++){
                        // for (var l = 0, len4 = feat[i].items[j].offers[k].prices.USD.length; l < len4; l++){
                            tableau.log("loop")
                            tableData.push({
                            "mpn": feat[i].items[j].mpn,
                            "brand_name": feat[i].items[j].brand.name,
                            "manufacturer": feat[i].items[j].manufacturer.name,
                            "sku" : feat[i].items[j].offers[k].sku,
                            "seller_name" : feat[i].items[j].offers[k].seller.name
                            // "USD" : feat[i].items[j].offers[k].prices.USD[l][1]       
                });
                        // }
                    }
                    
                }
                
            }

            // for (var i = 0, len = feat[i].items.length; i < len; i++) {

            //     for (var j = 0, len = feat[i].items[j].offers.length; j < len; j++){
            //         // tableau.log(feat[0].items[i].offers[j].prices.USD)

            //         // for (var k = 0, len = feat[0].items[i].offers[j].prices.USD.length; k < len; k++){   

            //             tableData.push({
            //                 "mpn": feat[i].items[j].mpn,
            //                 "brand_name": feat[i].items[j].brand.name,
            //                 "manufacturer": feat[i].items[j].manufacturer.name
            //                 // "sku" : feat[0].items[i].offers[j].sku,
            //                 // "name" : feat[0].items[i].offers[j].seller.name
            //                 // "1" : feat[0].items[i].offers[j].prices.USD[k][1]
            //     });
            //     // }
            //     }
            // }


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
                partOne: $('#part_one').val().trim(),
                partTwo: $('#part_two').val().trim(),
                partThree: $('#part_three').val().trim(),
                partFour: $('#part_four').val().trim(),
                partFive: $('#part_five').val().trim(),
                
            };        
                tableau.connectionData = JSON.stringify(mpnObj); // Use this variable to pass data to your getSchema and getData functions
                tableau.connectionName = "Octopart Source"; // This will be the data source name in Tableau
                tableau.submit(); // This sends the connector object to Tableau
            
        });
    });
})();