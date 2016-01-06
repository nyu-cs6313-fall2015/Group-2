

pluto.Main = function() {
    // map app definition
    var map = new pluto.Map();
    // json i-o
    var dat = new pluto.Data();
    // ui factory
    var gui = new pluto.Ui();

    // exported api
    var exports = {};

    // slots and signals connection
    var connectSlots = function(){
        // available datasets
        Sigs.connect(
          __sig__.availableNames, dat, dat.availableNamesFile
        );
        Sigs.connect(
          __sig__.availableNamesDone, gui, gui.initMenus
        );

        // load pluto dataset
        Sigs.connect(
          __sig__.loadDataSet, dat, dat.loadDataSetFile
        );
        Sigs.connect(
          __sig__.loadDataSetDone, map, map.initPluto
        );
        Sigs.connect(
          __sig__.loadDataSetDoneNoRender, map, map.initPlutoNoRender
        );

        // update FunctionView
        Sigs.connect(
          __sig__.loadFunctionView, map, map.initFunctionView
        );
    };

    // public API
    exports.run = function(){
        // Connects slots and signals.
        connectSlots();
        // creates the map
        map.createMap();
        // gets available json
        gui.loadAvailableNames();
    };

    // API return
    return exports;
};

// Main
window.onload = function() {
    var mlbApp = pluto.Main();
    mlbApp.run();
};
