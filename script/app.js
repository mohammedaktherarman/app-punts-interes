import { PuntInteres } from "./puntinteres.js";
import { Museu } from "./museu.js";
import { Atraccio } from "./atraccio.js";
import { Mapa } from "./mapa.js";
import { PAIS, CODI, CIUTAT, TIPUS, NOM, DIRECCIO, LATITUD, LONGITUD, HORARIS, PREU, DESCRIPCIO, PUNTUACIO, MONEDA } from "./const.js";

let puntInteres = [];

let idPuntInteres = 0;
let idMuseu = 0;
let idAtraccio  = 0;
let esManual = false;

let codiPais;

let ciutat;

let set = new Set();

const mapa = new Mapa();

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
        set.add(dades[TIPUS]);
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
        console.log(dades[NOM]);
    });
    console.log("Lista", puntInteres);
    filtreTipus();
    informacioPais(codiPais, ciutat);
    renderitzarLlista(puntInteres)
}

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


let puntInteresPintat = [];

const pintarEspai = function(obj) {
    const pi = document.createElement("div");
    pi.classList.add("punt");
    pi.style.backgroundColor = "#7FFFD4";  
    pi.id = obj.id;  

    const nombre = document.createElement("h3");
    nombre.textContent = obj.nom; 
    pi.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = `${obj.ciutat} | Tipus: Espai`;
    pi.appendChild(descripcion);

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.id = obj.id;

    eliminarButton.addEventListener("click", () => eliminarPunt(obj.id));

    pi.appendChild(eliminarButton); 
    document.querySelector(".llista").appendChild(pi);
    puntInteresPintat.push(obj); 
};

const pintarMuseu = function(obj) {
    const pi = document.createElement("div");
    pi.classList.add("punt");
    pi.style.backgroundColor = "#FFD37F"; 
    pi.id = obj.id; 

    const nombre = document.createElement("h3");
    nombre.textContent = obj.nom; 
    pi.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = `${obj.ciutat} | Tipus: Museu | Horaris: ${obj.horaris} | Preu: ${obj.preu}`;
    pi.appendChild(descripcion);

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.id = obj.id;

    eliminarButton.addEventListener("click", () => eliminarPunt(obj.id));

    pi.appendChild(eliminarButton); 
    document.querySelector(".llista").appendChild(pi); 
    puntInteresPintat.push(obj); 
};

const pintarAtraccio = function(obj) {
    const pi = document.createElement("div");
    pi.classList.add("punt");
    pi.style.backgroundColor = "#E1FF7F"; 
    pi.id = obj.id; 

    const nombre = document.createElement("h3");
    nombre.textContent = obj.nom; 
    pi.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = `${obj.ciutat} | Tipus: Atraccio`;
    pi.appendChild(descripcion);

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.id = obj.id;

    eliminarButton.addEventListener("click", () => eliminarPunt(obj.id));

    pi.appendChild(eliminarButton); 
    document.querySelector(".llista").appendChild(pi); 
    puntInteresPintat.push(obj);
};

const eliminarPunt = function(id) {
    
    const puntDiv = document.getElementById(id);

    if (puntDiv) {
        puntDiv.remove();
    }

    puntInteres = puntInteres.filter(punt => punt.id !== id);
    puntInteresPintat = puntInteresPintat.filter(punt => punt.id !== id);

    const totalItems = document.getElementById("totalItems");
    totalItems.textContent = `Número total: ${puntInteresPintat.length}`;
};

const renderitzarLlista = function(puntInteres) {
    const llistaDiv = document.querySelector(".llista");

    puntInteresPintat = [];

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

    const pem = document.getElementById("pem");
    if (puntInteresPintat.length > 0) {
        pem.style.display = "none";
    }

    const totalItems = document.getElementById("totalItems");
    totalItems.textContent = `Número total: ${puntInteresPintat.length}`;
};

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