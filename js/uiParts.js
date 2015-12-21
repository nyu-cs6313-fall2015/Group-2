

pluto.UiParts = {};

pluto.UiParts.Button = function(parentDiv, buttonId, glyph, buttonClass){
    // button div element
    var buttonDiv = parentDiv.append("button")
        .classed("btn btn-primary btn-sm", true)
        .attr("type", "button")
        .attr("id", buttonId);

    // button left space
    if(buttonClass)
        buttonDiv.classed("leftSpace", true);

    // icon element
    buttonDiv.append("span")
        .classed(glyph, true)
        .attr("aria-hidden", "true");

    // returns the element
    return buttonDiv;
};

pluto.UiParts.DropDown = function(parentDiv, dropId, dropClass){
    // drop down div element
    var dropDiv = parentDiv.append("div")
        .classed("dropdown", true)
        .attr("id", dropId);

    // button left space
    if(dropClass)
        dropDiv.classed("leftSpace", true);

    // creates the drop down
    dropDiv.append("button")
        .classed("btn btn-primary btn-sm dropdown-toggle", true)
        .attr("type", "button")
        .attr("json-toggle", "dropdown");

    // creates the list
    dropDiv.append("ul")
        .classed("dropdown-menu", true);

    // returns the element
    return dropDiv;
};