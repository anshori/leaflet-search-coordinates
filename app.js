/* Initial Map */
let tooltip = 'Drag the marker<br>or drag the map<br>to change the coordinates<br>of the location';
let center = [-7.801389645,110.364775452];
let map = L.map('map').setView(center, 15); //lat, long, zoom
map.scrollWheelZoom.disable(); //disable zoom with scroll

/* Tile Basemap */
let basemap = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: 'Google Satellite | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
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
map.addEventListener('move', mapMovement);

function dragMarker (e) {
  let latlng = e.target.getLatLng();

  //Displays coordinates on the form
  document.getElementById("latitude").value = latlng.lat.toFixed(5);
  document.getElementById("longitude").value = latlng.lng.toFixed(5);

  //Change the map center based on the marker location
  map.flyTo(new L.LatLng(latlng.lat.toFixed(9), latlng.lng.toFixed(5)));
  // marker.openTooltip();
}

function mapMovement (e) {
  let mapcenter = map.getCenter();

  //Displays coordinates on the form
  document.getElementById("latitude").value = mapcenter.lat.toFixed(5);
  document.getElementById("longitude").value = mapcenter.lng.toFixed(5);

  //Remove marker
  marker.remove();

  //Create marker
  marker = L.marker([mapcenter.lat.toFixed(5), mapcenter.lng.toFixed(5)], {draggable: true});
  marker.addTo(map);
  marker.bindTooltip(tooltip);
  // marker.openTooltip();
  marker.on('dragend', dragMarker);
}

function mapCenter (e) {
  let mapcenter = map.getCenter();
  let x = document.getElementById("longitude").value;
  let y = document.getElementById("latitude").value;

  map.flyTo(new L.LatLng(y, x), 18);
}