
sap.ui.define([], function () {
    "use strict";
    return {

        formatDescrizioneStato: function (oVal) {
            // console.log("Formatter Raggiunto");
            if (oVal === "01") {
                return "Da Approvare"; //Stato da APPROVARE 01 --> Arancione
            } else if (oVal === "02") {
                return "Approvato"; //Stato Approvato(Attivo) 02 --> Verde
            } else if (oVal === "03") {
                return "Modificato"  //Stato Modificato(Attivo) 03 --> Blue  
            } else if (oVal === "04") {
                return 'Annullato'  //Stato Annullato 04 --> Grigio
            } else if (oVal === "05") {
                return 'Scaduto'  //Stato Scaduto 05 --> Rosso
            }
            else {
                return "Altro Stato"  //Altri Stati --> Grigio
            }
        },

        formatCategoria: function (oVal) {
            if (oVal === "01") {
                return "Concerto";
            } else if (oVal === "02") {
                return "Teatro";
            } else if (oVal === "03") {
                return "Attivitá Benefica"
            } else if (oVal === "04") {
                return 'Serata'
            } else if (oVal === "05") {
                return 'Party IBM'
            }
            else if (oVal === "06") {
                return 'Party'
            }
            else if (oVal === "07") {
                return 'Cena'
            }
            else {
                return "Mostra/Museo"
            }
        },

        formatData: function (oVal) {
            if (oVal != "" && oVal != null) {
                var oGiorno = oVal.getDate();
                var oMese = oVal.getMonth() +1;
                var oAnno = oVal.getFullYear();
                return oGiorno + "/" + oMese + "/" + oAnno
            }
            else {
                return ""
            }
        },

        formatColorStato: function (oVal) {
            if (oVal === "01") {
                return "#ffa500"; //Stato da APPROVARE 01 --> Arancione
            } else if (oVal === "02") {
                return "#2C962C"; //Stato Approvato(Attivo) 02 --> Verde
            } else if (oVal === "03") {
                return "#0F52BA"  //Stato Modificato(Attivo) 03 --> Blue  
            } else if (oVal === "04") {
                return '#b3b5b6'  //Stato Annullato 04 --> Grigio
            } else if (oVal === "05") {
                return '#FF0000'  //Stato Scaduto 05 --> Rosso
            }
            else {
                return "#b3b5b6"  //Altri Stati --> Grigio
            }
        },

        formatTipo: function (oVal) {
            if (oVal === "01") {
                return "Interno IBM"
            } else if (oVal === "02") {
                return "Esterno"
            } else {
                return ""  
            }
        },

        setVisibleStato01: function (oVal) {
            if (oVal === "01") {
                return true;
            } else {
                return false;
            }
        },

        setVisibleManager: function (oStatus,oStato) {
            if (oStatus === "01" && oStato) {
                return true;
            } else {
                return false;
            }
        },

        setVisibleStato02: function (oVal) {
            if (oVal === "02") {
                return true;
            } else {
                return false;
            }
        },

        setVisibleStato03: function (oVal) {
            if (oVal === "03") {
                return true;
            } else {
                return false;
            }
        },

        setVisibleAction: function (oVal) {
            if (oVal === "Approvato") {
                return false;
            } else {
                return true;
            }
        },


    }
})