// define the map starting position
const mapCenter = [41.3851, 2.1734]; 

// zoom
const zoomLevel = 13; 


// renderiza el mapa
let map = L.map('map').setView(mapCenter, zoomLevel); 
let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }); tileLayer.addTo(map); 


// define the marker position 
let markerPosition = [41.3870, 2.1699]; 

let markerPosition2 = [41.3860, 2.1690];


// Create a marker and add it to the map 
let marker = L.marker(markerPosition).addTo(map); 

let marker2 = L.marker(markerPosition2).addTo(map); 


// add a popup to the marker
let popupText = "This is a marker in Barcelona!"; 
marker.bindPopup(popupText).openPopup(); 

let popupText2 = '<h1>hola</h1>'; 
marker2.bindPopup(popupText2).openPopup();  

