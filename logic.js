
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var myMap = L.map("map", {
    center: [10, 0],
    zoom: 2.4
  });
  

var darkmap=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.dark",
accessToken: API_KEY
}).addTo(myMap);


d3.json(queryUrl, function(data) {
  
  console.log(data);
  createFeatures(data.features);

});



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1,2,3,4,5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);





function getColor(d) {
    return d > 5 ? '#800026' :
           d > 4  ? '#BD0026' :
           d > 3  ? '#E31A1C' :
           d > 2  ? '#FC4E2A' :
           d > 1  ? '#FD8D3C' :
                      '#FEB24C';
}

function createFeatures(earthquakeData) {

    // console.log(earthquakeData.features.properties);

    // var geojsonMarkerOptions = {
    //     radius: feature.properties.mag,
    //     fillColor: "#ff7800",
    //     color: "#000",
    //     weight: 1,
    //     opacity: 1,
    //     fillOpacity: 0.8
    // };

  var earthquakes = L.geoJSON(earthquakeData,{
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: (feature.properties.mag*3),
            fillColor:  getColor(feature.properties.mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    }}).addTo(myMap);

 
}

