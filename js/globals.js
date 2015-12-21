// Namespace definition
pluto = {};


// available pluto json sets
pluto.availablePlutoNames = [];

// available pluto properties
pluto.availableFunctionNames = [undefined,undefined];


// currently selected Pluto dataset
pluto.selectedPlutoName = "";

// currently selected function view
pluto.selectedFunctionName = "yearbuilt";


// currently selected Pluto dataset
pluto.selectedPlutoCompareName = "";

// TODO: Do I need to have that?
// currently selected function view
// pluto.selectedFunctionCompareName = "merges";


// currently selected pluto layers (plutoId:pluto.Layer)
pluto.loadedPluto = {};

// currently selected pluto layers (plutoId:rtree)
pluto.loadedIndex = {};

// currently selected function tables (plutoId:crossfilter)
pluto.loadedDataSet = {};


//TODO: Remove?
// number of created cards
pluto.globalCardId = 0;
