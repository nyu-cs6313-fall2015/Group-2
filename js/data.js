
pluto.Data = function (){
    // exported object
    var exports = {};

    // load the available datasets
    exports.availableNames = function(){
        $.get(
            '/availableNames',
            {},
            function(data){
                // json json
                var jsonData = JSON.parse(data);
                // store the json
                pluto.availablePlutoNames       = jsonData.pluto;
                pluto.availableFunctionNames[0] = jsonData.functionLinear;
                pluto.availableFunctionNames[1] = jsonData.functionOrdinal;

                // emmit signal
                __sig__.emit(__sig__.availableNamesDone);
            }
        );
    };

    // load a pluto json
    exports.loadDataSet = function(){
        $.get(
            '/loadDataSet',
            {
              'name': pluto.selectedPlutoName
            },
            function(data){
                // json json
                var jsonData = JSON.parse(data);
                // stores the crossfilter
                pluto.loadedDataSet[pluto.selectedPlutoName] = crossfilter(jsonData);

                // emmit signal
                __sig__.emit(__sig__.loadDataSetDone);
            }
        );
    };

    // load the available datasets from a json file
    exports.availableNamesFile = function(){
        $.getJSON("json/availableNames.json", function(json) {
            // parses json
            var jsonData = JSON.parse(json);
            // store the json
            pluto.availablePlutoNames       = jsonData.pluto;
            pluto.availableFunctionNames[0] = jsonData.functionLinear;
            pluto.availableFunctionNames[1] = jsonData.functionOrdinal;

            // emmit signal
            __sig__.emit(__sig__.availableNamesDone);
        });
    };

    // load a pluto json
    exports.loadDataSetFile = function(render) {
        // default value
        render = typeof render !== 'undefined' ? render : true;
        // data set name
        var dataName = render?pluto.selectedPlutoName:pluto.selectedPlutoCompareName;

        $.getJSON("json/"+dataName+".json", function(json) {
            // parses json
            var jsonData = JSON.parse(json);

            // stores the crossfilter
            pluto.loadedDataSet[dataName] = crossfilter(jsonData);

            // emmit signal
            if(render)
                __sig__.emit(__sig__.loadDataSetDone);
            else
                __sig__.emit(__sig__.loadDataSetDoneNoRender)
        });

    };

    return exports;
};