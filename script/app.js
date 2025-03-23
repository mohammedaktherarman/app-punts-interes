import { PuntInteres } from "./puntinteres.js";
import { Museu } from "./museu.js";
import { Atraccio } from "./atraccio.js";
import { Mapa } from "./mapa.js";
import { PAIS, CODI, CIUTAT, TIPUS, NOM, DIRECCIO, LATITUD, LONGITUD, HORARIS, PREU, DESCRIPCIO, PUNTUACIO, MONEDA } from "./const.js";

// mapa
const mapa = new Mapa();

let puntInteres = [];

let idPuntInteres = 0;
let idMuseu = 0;
let idAtraccio  = 0;

let esManual = false;

let codiPais;

let ciutat;

// menu desplegable Tipus
let set = new Set();

const dropZoneObj = document.querySelector(".dropZone");

let fitxer = [];

dropZoneObj.addEventListener("dragover", function(event){
    event.preventDefault();
    console.log("dragover")
});

dropZoneObj.addEventListener("drop", function(event){
    event.preventDefault();
    console.log("drop")
    const files =event.dataTransfer.files;
    loadFile(files)
});

const loadFile= function(files){
    if(files && files.length>0){
        const file = files[0];
        const extensio = file.name.split(".")[1];
        if(extensio.toLowerCase() === "csv"){
            console.log("El fitxer es csv")
            readCsv(file)
        }else{
            console.log("El fitxer no és correcte")
        }
        console.log(file)
    }
}

const readCsv = function(file){
    const reader = new FileReader();
    reader.onload = () => {
        fitxer = reader.result.trim().split("\n").slice(1);
        loadData(fitxer)
        console.log(fitxer);
    }
    reader.onerror = () => {
        showMessage("error")
    }
    reader.readAsText(file, "UTF-8")
}


const loadData = function (fitxer){
    // itera cada linia del fitxer
    fitxer.forEach((linia) => {
        const dades = linia.split(";")

        // menu desplegable Tipus
        set.add(dades[TIPUS]);

        // carregar informació del país
        codiPais = dades[CODI];
        ciutat = dades[CIUTAT];

        switch(dades[TIPUS].toLowerCase()){
            case "espai":
                console.log("instancia objecte PuntInteres creat");
                idPuntInteres++;
                const espaiObj = new PuntInteres(idPuntInteres, esManual, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], dades[TIPUS], dades[LATITUD], dades[LONGITUD], dades[PUNTUACIO]);
                puntInteres.push(espaiObj);
                break;
            case "museu":
                console.log("instancia objecte Museu creat");
                idMuseu++;
                const museuObj = new Museu(idMuseu, esManual, dades[PAIS],dades[CIUTAT], dades[NOM], dades[DIRECCIO], dades[TIPUS], dades[LATITUD], dades[LONGITUD], dades[PUNTUACIO], dades[HORARIS], dades[PREU], dades[MONEDA], dades[DESCRIPCIO]);
                puntInteres.push(museuObj);
                break;
            case "atraccio":
                console.log("instancia objecte Atraccio creat");
                idAtraccio++;
                const atraccioObj = new Atraccio(idAtraccio, esManual, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], dades[TIPUS], dades[LATITUD], dades[LONGITUD], dades[PUNTUACIO], dades[HORARIS], dades[PREU], dades[MONEDA]);
                puntInteres.push(atraccioObj);
                break;
            default:
                throw new Error("Has afegit un tipus que no és correcte");
        }
    });

    // menu desplegable Tipus
    filtreTipus();

    // carregar informació del país
    informacioPais(codiPais, ciutat);

    renderitzarLlista(puntInteres)
}

// menu desplegable Tipus
const filtreTipus = function() {
    const select = document.getElementById("type");
    const option = document.createElement("option");
    option.value = "tots"; 
    option.textContent = "Tots";
    select.appendChild(option);

    set.forEach((tipus) => {
        const option = document.createElement("option");
        option.textContent = tipus
        option.value = tipus;
        select.appendChild(option);
    });
};

// carregar informació del país
const informacioPais = function(codiPais, ciutat) {
    const url = "https://restcountries.com/v3.1/alpha/" + codiPais
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('error: ' + response.status);
        }
        return response.json(); 
    })
    .then(data => {
        const div = document.getElementById("informacioPais")
        div.hidden = false;
        const p = document.createElement("p")
        p.textContent = `Pais (${data[0].flag}) ${ciutat}`;
        div.appendChild(p);
        console.log(data);

        const lat = data[0].latlng[0];
        const lon = data[0].latlng[1]; 

        mapa.actualizarPosInitMapa(lat, lon)
    })
    .catch(error => {
        console.error('error', error);
    });
}

let puntInteresPintat = [];
let contador = 0;

const actualizarContador = function () {
    let totalItems = document.getElementById("totalItems");
    let div = document.querySelector(".contenedor3");

    if (!totalItems) {
        totalItems = document.createElement("div");
        totalItems.id = "totalItems";
        div.appendChild(totalItems); 
    }

    totalItems.textContent = `Numero total: ${contador}`;

    if (contador === 0) {
        document.getElementById("frase").style.display = "block";
    } else {
        document.getElementById("frase").style.display = "none";
    }
};

const eliminarPunt = function(lat, lon, div) {
    if (confirm("Estàs segur que vols eliminar el punt d’interès?")) {
        div.remove();
        contador--;

        mapa.borrarMarcador(lat, lon);

        actualizarContador();

        if (contador === 0) {
            document.getElementById("frase").style.display = "block";
        }
    }
};

const existeix = function(lat, lon) {
    for (let i = 0; i < puntInteresPintat.length; i++) {
        if (puntInteresPintat[i].latitud === lat && puntInteresPintat[i].longitud === lon) {
            return true; 
        }
    }
    return false;
};



const pintarEspai = function (obj) {

    if (existeix(obj.latitud, obj.longitud)) {
        return;
    }

    const div = document.createElement("div");
    div.classList.add("punt");
    div.style.backgroundColor = "#7FFFD4";

    const nombre = document.createElement("h3");
    nombre.textContent = obj.nom;
    div.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = `${obj.ciutat} | Tipus: Espai`;
    div.appendChild(descripcion);

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.addEventListener("click", function() {
        eliminarPunt(obj.latitud, obj.longitud, div);
    });

    div.appendChild(eliminarButton);
    document.querySelector(".llista").appendChild(div);
    
    puntInteresPintat.push(obj);
    contador++;

    actualizarContador();

    mapa.mostrarPunt(obj.latitud, obj.longitud, `<h3>${obj.nom}</h3><p>${obj.direccio}</p><p>Puntuació: ${obj.puntuacio}</p>`);
};

const pintarMuseu = function (obj) {

    if (existeix(obj.latitud, obj.longitud)) {
        return;
    }

    const div = document.createElement("div");
    div.classList.add("punt");
    div.style.backgroundColor = "#FFD37F";

    const nombre = document.createElement("h3");
    nombre.textContent = obj.nom;
    div.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = `${obj.ciutat} | Tipus: Museu | Horaris: ${obj.horaris} | Preu: ${obj.preu}`;
    div.appendChild(descripcion);

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.addEventListener("click", function() {
        eliminarPunt(obj.latitud, obj.longitud, div);
    });

    div.appendChild(eliminarButton);
    document.querySelector(".llista").appendChild(div);
    
    puntInteresPintat.push(obj);
    contador++;

    actualizarContador();

    mapa.mostrarPunt(obj.latitud, obj.longitud, `<h3>${obj.nom}</h3><p>${obj.direccio}</p><p>Puntuació: ${obj.puntuacio}</p>`);
};

const pintarAtraccio = function (obj) {

    if (existeix(obj.latitud, obj.longitud)) {
        return;
    }

    const div = document.createElement("div");
    div.classList.add("punt");
    div.style.backgroundColor = "#E1FF7F";

    const nombre = document.createElement("h3");
    nombre.textContent = obj.nom;
    div.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = `${obj.ciutat} | Tipus: Atraccio`;
    div.appendChild(descripcion);

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.addEventListener("click", function() {
        eliminarPunt(obj.latitud, obj.longitud, div);
    });
    

    div.appendChild(eliminarButton);
    document.querySelector(".llista").appendChild(div);
    
    puntInteresPintat.push(obj);
    contador++;

    actualizarContador();

    mapa.mostrarPunt(obj.latitud, obj.longitud, `<h3>${obj.nom}</h3><p>${obj.direccio}</p><p>Puntuació: ${obj.puntuacio}</p>`);
};

const renderitzarLlista = function (puntInteres) {

    document.getElementById("frase").style.display = "none";

    puntInteres.forEach((item) => {
        switch (item.tipus.toLowerCase()) {
            case "espai":
                pintarEspai(item);
                break;
            case "museu":
                pintarMuseu(item);
                break;
            case "atraccio":
                pintarAtraccio(item);
                break;
            default:
                alert("Has afegit un tipus que no és correcte.");
        }
    });
};
