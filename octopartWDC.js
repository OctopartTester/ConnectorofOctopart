(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var colsOne = [{
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
        },{
            id: "USD",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchemaOne = {
            id: "tableOne",
            alias: "Part Data Search by MPN",
            columns: colsOne
        };

       

        schemaCallback([tableSchemaOne]);
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
            apiCallOne = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partOne+ "%27"
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d%";
            
            // if (partThree){
            //     apiCall += ",{%22mpn%22:%22"+partThree+"%22}"
            // }
            // if (partFour){
            //     apiCall += ",{%22mpn%22:%22"+partFour+"%22}"
            // }
            // if (partFive){
            //     apiCall += ",{%22mpn%22:%22"+partFive+"%22}"
            // }
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d%5d&include%5b%5d=specs,compliance_documents,&callback=?";
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=%5b%7b%22mpn%22:%22"+partOne+"%22%7d%";
            // apiCall = "https://octopart.com/api/v3/parts/match?apikey=80dfab31&queries=[{%22mpn%22:%22SN74S74N%22},{%22mpn%22:%22MS15795-803%22}]&pretty_print=true"
            // end = "%5d&include%5b%5d=specs,compliance_documents,&callback=?";
            end = "]&callback=?"
            apiCallOne += end;
            tableData1= [];
            tableData2= [];
            tableData3= [];
            tableData4= [];
            tableData5= [];
        $.getJSON(apiCallOne, function(resp) {
            tableau.log(apiCallOne)
            var feat = resp.results,
                tableData1 = [];
               // tableau.log(feat[2].items[1].offers[0].prices.USD.length)
          

                 for (var i = 0, len = feat.length; i < len; i++) {
                    for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                        if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                            for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                            tableau.log("loop1")
                            tableData1.push({
                                "mpn": feat[i].item.mpn,
                                "brand_name": feat[i].item.brand.name,
                                "manufacturer": feat[i].item.manufacturer.name,
                                "sku" : feat[i].item.offers[k].sku,
                                "seller_name" : feat[i].item.offers[k].seller.name,
                                "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            }
            
            table.appendRows(tableData1);
            tableau.log('end first getJSON')
            doneCallback();
        });
        
       

        if (partTwo){
            tableau.log('begin second loop')
            apiCallTwo = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partTwo+ "%27"
            apiCallTwo += end;
            $.getJSON(apiCallTwo, function(resp) {
                tableau.log(apiCallTwo)
                var feat = resp.results,
                    tableData2= [];            
                    
                     for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData2.push({
                                    "mpn": feat[i].item.mpn,
                                    "brand_name": feat[i].item.brand.name,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            }

            table.appendRows(tableData2);
            doneCallback();
        });
            
            

        //     if (partThree){
        //     tableau.log('begin second loop')
        //     apiCallThree = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partThree+ "%27"
        //     apiCallThree += end;
        //     $.getJSON(apiCallThree, function(resp) {
        //         tableau.log(apiCallThree)
        //         var feat = resp.results,
        //             tableData3= [];            
                    
        //              for (var i = 0, len = feat.length; i < len; i++) {
        //                 for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
        //                     if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
        //                         for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
        //                         tableau.log("loop3")
        //                         tableData3.push({
        //                             "mpn": feat[i].item.mpn,
        //                             "brand_name": feat[i].item.brand.name,
        //                             "manufacturer": feat[i].item.manufacturer.name,
        //                             "sku" : feat[i].item.offers[k].sku,
        //                             "seller_name" : feat[i].item.offers[k].seller.name,
        //                             "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
        //                         });
        //                     }
        //                 }            
        //         }
                
        //     }

        //     table.appendRows(tableData3);
        // });
        //     doneCallback();
        //     }

        //     if (partFour){
        //     tableau.log('begin fourth loop')
        //     apiCallFour = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partFour+ "%27"
        //     apiCallFour += end;
        //     $.getJSON(apiCallFour, function(resp) {
        //         tableau.log(apiCallFour)
        //         var feat = resp.results,
        //             tableData4= [];            
                    
        //              for (var i = 0, len = feat.length; i < len; i++) {
        //                 for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
        //                     if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
        //                         for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
        //                         tableau.log("loop4")
        //                         tableData4.push({
        //                             "mpn": feat[i].item.mpn,
        //                             "brand_name": feat[i].item.brand.name,
        //                             "manufacturer": feat[i].item.manufacturer.name,
        //                             "sku" : feat[i].item.offers[k].sku,
        //                             "seller_name" : feat[i].item.offers[k].seller.name,
        //                             "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
        //                         });
        //                     }
        //                 }            
        //         }
                
        //     }

        //     table.appendRows(tableData4);
        // });
        //     doneCallback();
        //     }

            // if (partFive){
        //     tableau.log('begin second loop')
        //     apiCallFive = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partFive+ "%27"
        //     apiCallFive += end;
        //     $.getJSON(apiCallTwo, function(resp) {
        //         tableau.log(apiCallFive)
        //         var feat = resp.results,
        //             tableData5= [];            
                    
        //              for (var i = 0, len = feat.length; i < len; i++) {
        //                 for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
        //                     if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
        //                         for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
        //                         tableau.log("loop5")
        //                         tableData5.push({
        //                             "mpn": feat[i].item.mpn,
        //                             "brand_name": feat[i].item.brand.name,
        //                             "manufacturer": feat[i].item.manufacturer.name,
        //                             "sku" : feat[i].item.offers[k].sku,
        //                             "seller_name" : feat[i].item.offers[k].seller.name,
        //                             "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
        //                         });
        //                     }
        //                 }            
        //         }
                
        //     }

        //     table.appendRows(tableData5);
        // });
// doneCallback();
            // }
            
            
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