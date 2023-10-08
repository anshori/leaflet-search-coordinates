/* Initial Map */
let tooltip = 'Drag the marker or move the map<br>to change the coordinates<br>of the location';
let center = [-7.8013896,110.3647754];
let map = L.map('map').setView(center, 15); //lat, long, zoom
map.scrollWheelZoom.disable(); //disable zoom with scroll

/* Tile Basemap */
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
});
basemap.addTo(map);

/* Display zoom, latitude, longitude in URL */
let hash = new L.Hash(map);

/* Marker */
let marker = L.marker(center, {draggable: true});
marker.addTo(map);

/* Tooltip Marker */
marker.bindTooltip(tooltip);
marker.openTooltip();

//Dragend marker
marker.on('dragend', dragMarker);

//Move Map
map.addEventListener('moveend', mapMovement);

function dragMarker (e) {
  let latlng = e.target.getLatLng();

  //Displays coordinates on the form
  document.getElementById("latitude").value = latlng.lat.toFixed(7);
  document.getElementById("longitude").value = latlng.lng.toFixed(7);

  //Change the map center based on the marker location
  map.flyTo(new L.LatLng(latlng.lat.toFixed(9), latlng.lng.toFixed(7)));
}

function mapMovement (e) {
  let mapcenter = map.getCenter();

  //Displays coordinates on the form
  document.getElementById("latitude").value = mapcenter.lat.toFixed(7);
  document.getElementById("longitude").value = mapcenter.lng.toFixed(7);

  //Create marker
  marker.setLatLng([mapcenter.lat.toFixed(5), mapcenter.lng.toFixed(7)]).update();
  marker.on('dragend', dragMarker);
}

function mapCenter (e) {
  let mapcenter = map.getCenter();
  let x = document.getElementById("longitude").value;
  let y = document.getElementById("latitude").value;

  map.flyTo(new L.LatLng(y, x), 18);
}