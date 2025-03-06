class Mapa {

    #map;

    constructor() {

        const mapCenter = [41.3851, 2.1734]; 
        const zoomLevel = 13; 

        // inicialitza el mapa
        this.#map = L.map('map').setView(mapCenter, zoomLevel); 
        let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }); 
        tileLayer.addTo(this.#map); 

        this.#getPosicioActual();
    }

    mostrarPuntInicial() {
        
    }

    actualizarPosInitMapa(lat, lon) {
        
    }

    mostrarPunt() {
       
    }

    borrarPunt() {
       
    }

    #getPosicioActual() {
 
        if (navigator.geolocation) {
            // geolocalitzacio per obtenir la posicio
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const mapCenter = [lat, lon]; 
                const zoomLevel = 13; 

                // marcador
                L.marker([lat, lon]).addTo(this.#map)
                    .bindPopup("Estás aquí").openPopup();

                // centrar el mapa
                this.#map.setView(mapCenter, zoomLevel);

            }, (error) => {
                console.error("Error en la geolocalización:", error);
            });
        } else {
            console.error("La geolocalización no está disponible en este navegador.");
        }
    }

}


// APUNTS
// // map starting position
// const mapCenter = [41.3851, 2.1734]; 

// // zoom
// const zoomLevel = 13; 


// // renderiza el mapa
// let map = L.map('map').setView(mapCenter, zoomLevel); 
// let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }); tileLayer.addTo(map); 


// // marker position 
// let markerPosition = [41.3870, 2.1699]; 

// let markerPosition2 = [41.3860, 2.1690];


// // create a marker and add it to the map 
// let marker = L.marker(markerPosition).addTo(map); 

// let marker2 = L.marker(markerPosition2).addTo(map); 


// // add a popup to the marker
// let popupText = "This is a marker in Barcelona!"; 
// marker.bindPopup(popupText).openPopup(); 

// let popupText2 = 'This is a marker in Barcelona!'; 
// marker2.bindPopup(popupText2).openPopup();  


// // geolocalitzacio
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         var lat = position.coords.latitude;
//         var lng = position.coords.longitude;


//         // Coloca un marcador en la ubicación actual del usuario
//         L.marker([lat, lng]).addTo(map)
//             .bindPopup("Estás aquí").openPopup();


//         // Centra el mapa en la ubicación actual
//         map.setView([lat, lng], 13);
//     }, function (error) {
//         console.error("Error en la geolocalización:", error);
//     });
// } else {
//     console.error("La geolocalización no está disponible en este navegador.");
// }
