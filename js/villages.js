//NeighborhoodGroup.js
//requires that the google maps geometry library be loaded
//via a "libraries=geometry" parameter on the url to the google maps script

function NeighborhoodGroup(name) {
    this.name = name;
    this.hoods = [];
    //enables toggling markers on/off between different neighborhoods if set to true
    this.toggleBetweenHoods = false;
    //enables panning and zooming to fit the particular neighborhood in the viewport
    this.fitHoodInViewport = true;
    this.selectedHood = null ;
    this.lastSelectedHood = null ;
}

NeighborhoodGroup.prototype.getHood = function(name) {
    for (var i = 0, len = this.hoods.length; i < len; i++) {
        if (this.hoods[i].name == name) {
            return this.hoods[i];
        }
    }
    return null ;
}
;

NeighborhoodGroup.prototype.addNeighborhood = function(name, polygon) {
    var O = this
      , 
    hood = new Neighborhood(name,polygon);
    O.hoods.push(hood);
    google.maps.event.addListener(polygon, 'click', function() {
        if (O.toggleBetweenHoods) {
            O.lastSelectedHood = O.selectedHood;
            O.selectedHood = hood;
            if (O.lastSelectedHood !== null  && O.lastSelectedHood.name != name) {
                O.lastSelectedHood.setMarkersVisible(false);
            }
        }
        hood.setMarkersVisible(!hood.markersVisible);
        if (O.fitHoodInViewport) {
            hood.zoomTo();
        }
    }
    );
}
;

//marker must be a google.maps.Marker object
//addMarker will return true if the marker fits within one
//of this NeighborhoodGroup object's neighborhoods, and
//false if the marker does not fit any of our neighborhoods
NeighborhoodGroup.prototype.addMarker = function(marker) {
    var bool, 
    i = 0, 
    len = this.hoods.length;
    for (; i < len; i++) {
        bool = this.hoods[i].addMarker(marker);
        if (bool) {
            return bool;
        }
    }
    return bool;
}
;

//the Neighborhood constructor is not intended to be called
//by you, is only intended to be called by NeighborhoodGroup.
//likewise for all of it's prototype methods, except for zoomTo
function Neighborhood(name, polygon) {
    this.name = name;
    this.polygon = polygon;
    this.markers = [];
    this.markersVisible = false;
}

//addMarker utilizes googles geometry library!
Neighborhood.prototype.addMarker = function(marker) {
    var isInPoly = google.maps.geometry.poly.containsLocation(marker.getPosition(), this.polygon);
    if (isInPoly) {
        this.markers.push(marker);
    }
    return isInPoly;
}
;

Neighborhood.prototype.setMarkersVisible = function(bool) {
    for (var i = 0, len = this.markers.length; i < len; i++) {
        this.markers[i].setVisible(bool);
    }
    this.markersVisible = bool;
}
;

Neighborhood.prototype.zoomTo = function() {
    var bounds = new google.maps.LatLngBounds()
      , 
    path = this.polygon.getPath()
      , 
    map = this.polygon.getMap();
    path.forEach(function(obj, idx) {
        bounds.extend(obj);
    }
    );
    map.fitBounds(bounds);
}
;
