(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var colsOne = [{
            id: "mpn",
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
            apiCallOne = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partOne+ "%27]&callback=?"
            apiCallTwo = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partTwo+ "%27]&callback=?"
            apiCallThree = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partThree+ "%27]&callback=?"
            apiCallFour = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partFour+ "%27]&callback=?"
            apiCallFive = "https://octopart.com/api/v3/parts/search?apikey=80dfab31&q=%27"+partFive+ "%27]&callback=?"
            // end = ""
            // apiCallOne += end;
            tableData1= [];
            tableData2= [];
            tableData3= [];
            tableData4= [];
            tableData5= [];
            check = 0
            if(partOne){
                check++;
            }
            if(partTwo){
                check++;
            }
            if(partThree){
                check++;
            }
            if(partFour){
                check++;
            }
            if(partFive){
                check++;
            }
            tableau.log(check)

        switch(check){
            case 1:
                tableau.log('now in case 1')
                
                $.getJSON(apiCallOne, function(resp) {
                tableau.log(apiCallOne)
                var feat = resp.results,
                    tableData1 = [];            

                     for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop1")
                                tableData1.push({
                                    "mpn": feat[i].item.mpn,
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

            case 2:

                var $urlOne = apiCallOne;
                var $urlTwo = apiCallTwo
                $.when($.getJSON($urlOne), $.getJSON($urlTwo)).then(function(resp1,resp2){
                    tableau.log(resp1);
                    var feat = resp1[0].results
                    for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop1")
                                tableData1.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                       
                                    });
                                }
                            }            
                    }
                    
                } //first for loop

                table.appendRows(tableData1);
                var feat = resp2[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData2.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData2);
            doneCallback();

                }).fail(function(problem){
                    tableau.log(problem);
                })
       
                break;
            case 3:
                var $urlOne = apiCallOne;
                var $urlTwo = apiCallTwo;
                var $urlThree = apiCallThree;
                $.when($.getJSON($urlOne), $.getJSON($urlTwo),$.getJSON($urlThree)).then(function(resp1,resp2, resp3){
                    tableau.log(resp1);
                    var feat = resp1[0].results
                    for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop1")
                                tableData1.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                       
                                    });
                                }
                            }            
                    }
                    
                } //first for loop

                table.appendRows(tableData1);
                var feat = resp2[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData2.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData2);

            var feat = resp3[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData3.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData3);



            doneCallback();

                }).fail(function(problem){
                    tableau.log(problem);
                })


                break;
            case 4:
                var $urlOne = apiCallOne;
                var $urlTwo = apiCallTwo;
                var $urlThree = apiCallThree;
                var $urlFour = apiCallFour;
                $.when($.getJSON($urlOne), $.getJSON($urlTwo),$.getJSON($urlThree),$.getJSON($urlFour)).then(function(resp1,resp2, resp3, resp4){
                    tableau.log(resp1);
                    var feat = resp1[0].results
                    for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop1")
                                tableData1.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                       
                                    });
                                }
                            }            
                    }
                    
                } //first for loop

                table.appendRows(tableData1);
                var feat = resp2[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData2.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData2);

            var feat = resp3[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData3.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData3);

            var feat = resp4[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData4.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData4);

            doneCallback();

                }).fail(function(problem){
                    tableau.log(problem);
                })

                break;
            case 5:
                var $urlOne = apiCallOne;
                var $urlTwo = apiCallTwo;
                var $urlThree = apiCallThree;
                var $urlFour = apiCallFour;
                var $urlFive = apiCallFive;
                $.when($.getJSON($urlOne), $.getJSON($urlTwo),$.getJSON($urlThree),$.getJSON($urlFour),$.getJSON($urlFive)).then(function(resp1,resp2, resp3, resp4, resp5){
                    tableau.log(resp1);
                    var feat = resp1[0].results
                    for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop1")
                                tableData1.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                       
                                    });
                                }
                            }            
                    }
                    
                } //first for loop

                table.appendRows(tableData1);
                var feat = resp2[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData2.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData2);

            var feat = resp3[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData3.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData3);

            var feat = resp4[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData4.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData4);

            var feat = resp5[0].results
                for (var i = 0, len = feat.length; i < len; i++) {
                        for (var k = 0, len3 = feat[i].item.offers.length; k < len3; k++){
                            if((typeof(feat[i].item.offers[k].prices) !== 'undefined') && (typeof(feat[i].item.offers[k].prices.USD) !== 'undefined')){
                                for (var l = 0, len4 = feat[i].item.offers[k].prices.USD.length; l < len4; l++){
                                tableau.log("loop2")
                                tableData5.push({
                                    "mpn": feat[i].item.mpn,
                                    "manufacturer": feat[i].item.manufacturer.name,
                                    "sku" : feat[i].item.offers[k].sku,
                                    "seller_name" : feat[i].item.offers[k].seller.name,
                                    "USD" : feat[i].item.offers[k].prices.USD[l][1]
                                   
                                });
                            }
                        }            
                }
                
            } //second for loop

            table.appendRows(tableData5);

            doneCallback();

                }).fail(function(problem){
                    tableau.log(problem);
                })
                break;
            default:
                tableau.log("defaulted")
        }
        
        
    
            
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