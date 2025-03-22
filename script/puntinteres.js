class PuntInteres {
    
    #id;
    #esManual = false;

    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
        this.#id = id;
        this.#esManual = esManual;
        this.pais = pais;
        this.ciutat = ciutat;
        this.nom = nom;
        this.direccio = direccio;
        this.tipus = tipus;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get esManual() {
        return this.#esManual;
    }

    set esManual(value) {
        this.#esManual = value;
    }

    static obtenirTotalElements() {

    }
}

export { PuntInteres };