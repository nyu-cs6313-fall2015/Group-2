

pluto.Ui = function() {
    // exported api object
    var exports = {};

    // creates the add cart button
    function addHistogramCard(parentDiv){
        var buttonId = "addHistCard";

        // adds the button
        var btn = pluto.UiParts.Button(parentDiv,buttonId, "glyphicon glyphicon-stats");

        btn.on('click', function(){
            // avoid errors
            if(!Object.keys(pluto.loadedDataSet).length)
                return;

            // increments the number of active cards
            pluto.globalCardId += 1;

            // creates a new card
            var card = new pluto.HistogramCard();
            // creates the card
            card.initCard();
        });
    }

    // creates the add cart button
    function addTimelineCard(parentDiv){
        
        var buttonId = "addTimelineCard";

        // adds the button
        var btn = pluto.UiParts.Button(parentDiv,buttonId, "glyphicon glyphicon-cloud");

        btn.on('click', function(){
            // avoid errors
            if(!Object.keys(pluto.loadedDataSet).length)
                return;

            // increments the number of active cards
            pluto.globalCardId += 1;

            // creates a new card
            var card = new pluto.TimelineCard();
            // creates the card
            card.initCard();
        });
    }


    // creates the add cart button
    function addScatterCard(parentDiv){
        var buttonId = "addScatterCard";

        // adds the button
        var btn = pluto.UiParts.Button(parentDiv,buttonId, "glyphicon glyphicon-record","leftSpace");

        btn.on('click', function(){
            // avoid errors
            if(!Object.keys(pluto.loadedDataSet).length)
                return;

            // increments the number of active cards
            pluto.globalCardId += 1;

            // creates a new card
            var card = new pluto.ScatterCard();
            // creates the card
            card.initCard(true);
        });
    }

    // creates the pluto Selector
    function plutoSelector(parentDiv){
        var dropId = "plutoSelector";

        // adds the drop down
        var drop = pluto.UiParts.DropDown(parentDiv,dropId,"leftSpace");

        // gets the list
        var ul = drop.select("ul");
        // sets the button label
        drop.select("button").html("Select neighborhood");

        // binds json to items and appends
        ul.selectAll("li")
            .data(pluto.availablePlutoNames)
            .enter()
            .append('li')
            .html(function(d) { return '<a href="#">' + d + '</a>'; });

        // updates the button when selecting an item
        ul.selectAll("li")
            .on('click', function(d){
                d3.select('#'+ dropId +' button').html(d);
                pluto.selectedPlutoName = d;

                // already loaded
                if( !(pluto.selectedPlutoName in pluto.loadedPluto) )
                    __sig__.emit(__sig__.loadDataSet);
                // changes selected
                else
                    __sig__.emit(__sig__.loadDataSetDone);
                
            });
    }

    // creates the pluto Selector
//     function plutoSelectorCompare(parentDiv){
//         var dropId = "plutoSelectorCompare";

//         // adds the drop down
//         var drop = pluto.UiParts.DropDown(parentDiv,dropId,"leftSpace");

//         // gets the list
//         var ul = drop.select("ul");
//         // sets the button label
//         drop.select("button").html("Select one json");

//         // binds json to items and appends
//         ul.selectAll("li")
//             .data(pluto.availablePlutoNames)
//             .enter()
//             .append('li')
//             .html(function(d) { return '<a href="#">' + d + '</a>'; });

//         // updates the button when selecting an item
//         ul.selectAll("li")
//             .on('click', function(d){
//                 d3.select('#'+ dropId +' button').html(d);
//                 pluto.selectedPlutoCompareName = d;

//                 // already loaded
//                 if( !(pluto.selectedPlutoCompareName in pluto.loadedPluto) )
//                     __sig__.emit(__sig__.loadDataSet, false);
//                 // changes selected
//                 else
//                     __sig__.emit(__sig__.loadDataSetDoneNoRender);
//             });
//     }

    // creates the add cart button
    function addProperty(parentDiv){
        var buttonId = "addProp";

        // adds the button
        var btn = pluto.UiParts.Button(parentDiv, buttonId, "glyphicon glyphicon-repeat");

        btn.on('click', function(){
            // send a signal updating colors over the map
            __sig__.emit(__sig__.loadFunctionView);
        });
    }

    // creates the pluto Selector
    function renderFunctionSelector(parentDiv){
        var dropId = "renderFunctionSelector";

        // adds the drop down
        var drop = pluto.UiParts.DropDown(parentDiv,dropId,"leftSpace");

        // gets the list
        var ul = drop.select("ul");
        // sets the button label
        drop.select("button").html("Color dimension");

        // binds json to items and appends
        ul.selectAll("li")
            .data(pluto.availableFunctionNames[0])
            .enter()
            .append('li')
            .html(function(d) { return '<a href="#">' + d + '</a>'; });

        // updates the button when selecting an item
        ul.selectAll("li")
            .on('click', function(d){
                d3.select('#'+ dropId +' button').html(d);
                pluto.selectedFunctionName = d;
            });
    }

    // color pallet
    function addColorPallet(parentDiv){
        var cScale = new pluto.ColorScale();
        cScale.drawColorScale(parentDiv);
    }

    // creates the main menu
    function initMainMenu(){
        // gets the main div
        var mainMenu = d3.select("#mainMenu");

        // creates the add card button
//         addTimelineCard(mainMenu);

        // creates the add card button
        addHistogramCard(mainMenu);

        // creates the add card button
        addScatterCard(mainMenu);
        // creates the pluto selector
        plutoSelector(mainMenu);
    }

    // creates the render menu
    function initRenderMenu(){
        // gets the main div
        var renderMenu = d3.select("#renderMenu");

        // creates the add prop button
        addProperty(renderMenu);
        // creates the pallet
        addColorPallet(renderMenu);
        // creates the pluto selector
        renderFunctionSelector(renderMenu);
    }

    // creates all menus
    exports.initMenus = function(){
        initMainMenu();
        initRenderMenu();
    };

    // load available pluto json names
    exports.loadAvailableNames = function(){
        // gets json to build the interface
        __sig__.emit(__sig__.availableNames);
    };

    // returns the api
    return exports;
};