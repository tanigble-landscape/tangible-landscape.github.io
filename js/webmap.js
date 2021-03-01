// Mapbox map id
var mapId = 'baharmon.019h4lm1';

// Mapbox access token
var accessToken = 'pk.eyJ1IjoiYmFoYXJtb24iLCJhIjoiY2lnaXFwbmE2MDAyaXJxbTAxZGMwcmZneCJ9.M-KRxEOrjKct0rl8hxHJug';

// Map
var map = L.map('map').setView([35.7818,-78.6764], 3);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// maxZoom: 18,
// id: 'mapbox/streets-v11',
// tileSize: 512,
// zoomOffset: -1,
// accessToken: accessToken
// }).addTo(map);

L.tileLayer.provider('Stamen.TonerLite').addTo(map);

// create custom markers
var markerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// load GeoJSON from an external file
$.getJSON("data/tangible-landscape-systems.geojson",function(data){

  // add popups
  function onEachFeature(feature, layer) {
      layer.bindPopup("<b> Name: </b>" + feature.properties.name + "<br>" + "<b>Location: </b>" + feature.properties.location + "<br>" + "<b>Link: </b>" + "<a href=" + feature.properties.website + ">"+ feature.properties.website +"</a>");
  }

  // add GeoJSON layer to the map once the file is loaded
  geojson = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: markerIcon});
		},
    onEachFeature: onEachFeature
  }).addTo(mymap)
  mymap.fitBounds(geojson.getBounds());
});








// // REPLACE feature layers with icons
//
// var systems = 'data/tangible-landscape-systems.geojson';
//
// var demos = 'data/tangible-landscape-demos.geojson';
//
// var featureLayerSystems = L.mapbox.featureLayer();
// 	featureLayerSystems.loadURL(systems);
// 	featureLayerSystems.addTo(map);
//
// var featureLayerDemos = L.mapbox.featureLayer();
// 	featureLayerDemos.loadURL(demos);
// 	featureLayerDemos.addTo(map);
//
// featureLayerSystems.on('ready', function(){
// 	this.eachLayer(function(layer){
//     	layer.setIcon(L.mapbox.marker.icon({
//           "marker-color": "#111",
//           "marker-size": "medium",
//           "marker-symbol": "marker"
//         }))
//     })
//     map.fitBounds(featureLayerSystems.getBounds());
// })
//
// featureLayerDemos.on('ready', function(){
// 	this.eachLayer(function(layer){
//     	layer.setIcon(L.mapbox.marker.icon({
//           "marker-color": "#888",
//           "marker-size": "medium",
//           "marker-symbol": "marker"
//         }))
//     })
// })

// Legend
var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'legend');

	div.innerHTML += 'Systems';
	div.innerHTML += 'Demos';

	return div;
};

legend.addTo(map);

// Sidebar
var clickHandler = function(e){
	$('#info').empty();

  var feature = e.target.feature;

  $('#sidebar').fadeIn(400, function(){
  	var info = '';
  	info += '<div>';
		// info += '<h3 class="map">'+ feature.properties.name + '</h3>';
    if(feature.properties.name){
      info += '<h3 class="map">' + feature.properties.name + '</h3>';
    }
    if(feature.properties.title){
      info += '<h3 class="map">' + feature.properties.title + '</h3>';
    }
    if(feature.properties.event){
      info += '<p>' + feature.properties.event + '</p>';
    }
    if(feature.properties.institution){
      info += '<p>' + feature.properties.institution + '</p>';
    }
    if(feature.properties.department){
      info += '<p>' + feature.properties.department + '</p>';
    }
    if(feature.properties.host){
      info += '<p>' + feature.properties.host + '</p>';
    }
    if(feature.properties.authors){
      info += '<p>' + feature.properties.authors + '</p>';
    }
    if(feature.properties.location){
      info += '<p>' + feature.properties.location + '</p>';
    }
    if(feature.properties.date){
      info += '<p>' + feature.properties.date + '</p>';
    }
    if(feature.properties.website){
			info += '<p><a href="' + feature.properties.website + '">' + feature.properties.website + '</a></p>';
    }
		if(feature.properties.team){
      info += '<br/><p>' + feature.properties.team + '</p>';
    }
    info += '</div>';
    $('#info').append(info);
  })
}

// On click
featureLayerSystems.on('ready', function(){
  this.eachLayer(function(layer){
  	layer.on('click', clickHandler);
  })
})

// On click
featureLayerDemos.on('ready', function(){
  this.eachLayer(function(layer){
  	layer.on('click', clickHandler);
  })
})

map.on('click',function(){
	$('#sidebar').fadeOut(200);
});
