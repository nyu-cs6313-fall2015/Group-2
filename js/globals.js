// Namespace definition
pluto = {};


// available pluto json sets
pluto.availablePlutoNames = ['All', 'Battery Park City', 'Central Park', 'Chelsea', 'Chinatown',
       'Civic Center', 'Ditmars Steinway', 'East Harlem', 'East Village',
       'Financial District', 'Flatiron District', 'Gramercy',
       'Greenwich Village', 'Harlem', "Hell's Kitchen", 'Inwood',
       'Kingsbridge', 'Kips Bay', 'Little Italy', 'Lower East Side',
       'Marble Hill', 'Midtown', 'Morningside Heights', 'Murray Hill',
       'NoHo', 'Nolita', "Randall's Island", 'Roosevelt Island', 'SoHo',
       'Stuyvesant Town', 'Theater District', 'Tribeca', 'Two Bridges',
       'Upper East Side', 'Upper West Side', 'Washington Heights',
       'West Village'];

// available pluto properties
pluto.availableFunctionNames = [undefined,undefined];

// currently selected Pluto dataset
pluto.selectedPlutoName = "All";

// currently selected function view
pluto.selectedFunctionName = "yearbuilt";

// currently selected Pluto dataset
pluto.selectedPlutoCompareName = "All";

// TODO: Do I need to have that? Who cares...
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
