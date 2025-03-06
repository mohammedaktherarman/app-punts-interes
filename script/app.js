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
        switch(dades[TIPUS].toLowerCase()){
            case "espai":
                console.log("instancia objecte PuntInteres");
                const espaiObj = new PuntInteres(dades[PAIS], dades[CODI]);
                puntInteres.push(espaiObj);
                break;
            case "museu":
                console.log("instancia objecte Museu");
                const museuObj = new Museu(dades[PAIS], dades[CODI]);
                puntInteres.push(museuObj);
                break;
            case "atraccio":
                console.log("instancia objecte Atraccio");
                const atraccioObj = new Atraccio(dades[PAIS], dades[CODI]);
                puntInteres.push(atraccioObj);
                break;
            default:
                throw new Error("Has afegit un tipus que no és correcte");
        }
        console.log(dades[NOM]);
    });
}

