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
        console.log(fitxer);
    }
    reader.onerror = () => {
        showMessage("error")
    }
    reader.readAsText(file, "UTF-8")
}

const map = new Mapa();

