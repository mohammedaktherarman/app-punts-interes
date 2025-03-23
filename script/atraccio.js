import { PuntInteres } from "./puntinteres.js";

class Atraccio extends PuntInteres {
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }

    get preuIva() {
        if (this.preu === 0) {
            return "Entrada gratuïta";
        }

        let iva = Atraccio.IVA[this.pais];

        if (iva === undefined) {
            return this.preu.toFixed(2) + this.moneda + " (no IVA)";
        }

        let preuAmbIva = this.preu * (1 + iva);

        return preuAmbIva.toFixed(2) + this.moneda + " (IVA)";
    }
}

export { Atraccio };
