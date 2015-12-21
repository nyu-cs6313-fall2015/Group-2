
pluto.Map = function() {
    // map object
    var map = undefined;
    var thr = undefined;
    
    // exported api
    var exports = {};
    
    // create a new pluto layer
    function createNewPluto(render) {
        // default value
        render = typeof render !== 'undefined' ? render : true;
        // data set name
        var dataName = render ? pluto.selectedPlutoName : pluto.selectedPlutoCompareName;
        
        // crossfilter set
        var dataSet = pluto.loadedDataSet[dataName];
        
        // creates the layers
        var layer = new pluto.Layer();
        // create layer.
        layer.loadStrokeLayer(thr, dataSet, render);
        
        // store loaded layer
        pluto.loadedPluto[dataName] = layer;
    }
    
    // create a new pluto layer
    function createNewFunctionView() {
        // json set
        var dataSet = pluto.loadedDataSet[pluto.selectedPlutoName];
        
        // gets the pluto
        var layer = pluto.loadedPluto[pluto.selectedPlutoName];
        // create layer.
        layer.loadFillLayer(thr, pluto.selectedFunctionName, dataSet);
    }
    
    // Three.js layer cleanup
    exports.initGL = function(glCanvas) {
        // resets the scene
        glCanvas.scene = new THREE.Scene();
    }
    ;
    
    //
    exports.initPlutoNoRender = function() {
        // previously loaded layer
        if (pluto.selectedPlutoCompareName in pluto.loadedPluto)
            return;
        
        // creates a new layer
        createNewPluto(false);
    }
    ;
    
    // Three.js pluto render creatioz
    exports.initPluto = function() {
        // clears the scene
        thr.clearScene();
        
        // previously loaded layer
        if (pluto.selectedPlutoName in pluto.loadedPluto) {
            // loads the corresponding pluto
            var geom = pluto.loadedPluto[pluto.selectedPlutoName].getGeometry();
            thr.loadObject(geom);
        } 
        else {
            // creates a new layer
            createNewPluto();
        }
        // redraw
        thr.draw();
    }
    ;
    
    // Three.js function render creation
    exports.initFunctionView = function() {
        // only load functions if selected is available
        if (!(pluto.selectedPlutoName in pluto.loadedPluto))
            return;
        
        // clears the scene
        thr.clearScene();
        
        // creates the function
        createNewFunctionView();
        
        // loads the corresponding pluto
        var geom = pluto.loadedPluto[pluto.selectedPlutoName].getGeometry();
        thr.loadObject(geom);
        
        // redraw
        thr.draw();
    }
    ;
    
    // map creation
    exports.createMap = function() {
        
        // get the container
        var container = document.getElementById("gmaps");
        // creates the map
        var map = new google.maps.Map(container,
        {
            zoom: 16,
            mapTypeControl: false,
            streetViewControl: false,
            center: new google.maps.LatLng(40.756119,-73.983159),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: pluto.styles,
        });
        
        // creates the three.js layer
        thr = new ThreejsLayer({
            map: map
        },exports.initGL);
    
    };
    
    // return the public api
    return exports;
}
;
