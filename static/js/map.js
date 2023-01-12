// Set the main coordinates (US coordinates) for our map
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });

   
// Add attribution (the tile layer) to Openstreet map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// URL for fetching the data
var link = '/api/map_data';

// Creating icon objects using GitHub resource
var iconColor;
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Use the d3.json function to read in the data from the url
d3.json(link).then(function(data) {
  
  for (const value of Object.values(data)) {         
    

    // Create the color code for different work_environment
    var job_mode = value['attribute'];
    if (job_mode == 'onsite') iconColor = redIcon;
    else if (job_mode == 'remote') iconColor = greenIcon;    
    else iconColor = goldIcon; 

    // Create a layer with the retrieved data and store it as a variable  
    var marker = L.marker([value['latitude'], value['longitude']], {icon: iconColor});
    
    
    // Bind a popup to the markers with required information
    marker.bindPopup(
      '<h3> Title: ' + value['title'] + '</h3><hr /><hr />Company: ' +
      value['company'] + '<br /><br />Attribute: ' +
      value['attribute'] + '<br /><br />Location: ' + value['location'] 
      + '<br /><br />Posted Date: ' + value['posted_date'] 
      + '<br /><br />Link: ' + value['link']).addTo(myMap);

      // 'Name: <a href="' + url + '" target="trail_stop">'
      // .bindPopup('<a href="value['link']"><h1> Apply Here</h1></a>')
      
      // "<br />'<a href='https://metadatapdxcyclesafety.neocities.org/' target='_blank'>metadata</a>'";
      

    }

})  

// // The function that will determine the color of a popup based on the depth of the work_environment
// function iconColor() {
//     if (value['work_environment'] == 'onsite') {return 'redIcon';}
//     else if (value['work_environment'] == 'remote') {return 'greenIcon';}    
//     else {return 'goldIcon';}
    
//   }
  
 
// // Use this link to get the GeoJSON data
// var link = '../data/sample.json'

// // Getting our GeoJSON data
// d3.json(link).then(function(data) {
//   console.log(data)
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJson(data, {
//         pointToLayer: function(feature, latlng) {
//             return new L.Marker(latlng, {                 
//                 color: 'black',
//                 fillColor: chooseColor(value['work_environment']),
//                 fillOpacity: 0.5,
//                 weight: 0.1    
//             });
//         },

//         // Binding a popup to each layer
//         onEachFeature: function(feature, layer) {
//             layer.bindPopup("<h3> Title:" + feature.properties.title+ "</h3><br /><br />Company: " +
//             feature.properties.company + "<br /><br />Location:" + feature.geometry.location);
//       }

//     }).addTo(myMap);

  //   // Creating legend for the map
  //   var legend = L.control({position: 'bottomright',});

  //   legend.onAdd = function (map) {

  //       var div = L.DomUtil.create('div', 'info legend'),
  //           work_environment = [onsite, remote, hybrid];

  //       // loop through the work_environment range and generate a label with a colored square for each range
  //       for (var i = 0; i < work_environment.length; i++) {
  //           div.innerHTML +=
  //               '<i style="background:' + chooseColor(work_environment[i] + 1) + '"></i> ' +
  //               work_environment[i] + (work_environment[i + 1] ? '&ndash;' + work_environment[i + 1] + '<br>' : '+');
  //       }

  //       return div;  
  //   };
  //   legend.addTo(myMap);   
  // });
