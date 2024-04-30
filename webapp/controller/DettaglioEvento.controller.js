sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "zui5eventm/zui5eventm/model/formatter",
    "sap/m/MessageBox",
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library',
    'sap/viz/ui5/controls/common/feeds/FeedItem'
], function(
	Controller, JSONModel, formatter, MessageBox, FlattenedDataset, Spreadsheet, exportLibrary, FeedItem
) {
	"use strict";
    let navModel;
    let fornitoreF4;
    let elencoContrattiXMatForn;
    let newContract;
    let currentMatSelected;
    let changesNotSaved;
    let itemNotSaveToRemove;
    let EdmType = exportLibrary.EdmType;
    let listaStringaFornitori;
    let oVizFrameNew;
    let urlPath;
	return Controller.extend("zui5eventm.zui5eventm.controller.DettaglioEvento", {
        formatter: formatter,

        onInit: function () {
            // navModel = sap.ui.getCore().getModel("navModel").getData();
            urlPath = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;
            try {
                oVizFrameNew = new sap.viz.ui5.controls.VizFrame("chartStackedColumn");
                oVizFrameNew.setVizType('line');
                oVizFrameNew.setVizProperties({ categoryAxis: { title: { visible: true, text: "Periodo" } }, valueAxis: { title: { visible: true, text: "Prezzo" } }, title: { visible: false, text: "" } });
            } catch (err) { }
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("DettaglioEvento").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // this.getView().byId("fornitoreInput").destroyTokens();
            // sap.ui.core.BusyIndicator.hide(0);
            // fornitoreF4 = "";
            // newContract = [];
            // itemNotSaveToRemove = [];
            // changesNotSaved = false;
            navModel = sap.ui.getCore().getModel("navModel").getData();
            this.byId("detailTitle").setText(navModel.Ztitle);
            this.byId("detailAddress").setText(navModel.Zaddress);
            this.byId("detailCreateUser").setText(navModel.ZcreateUser);
            this.byId("detailDate").setText(formatter.formatData(navModel.Zdate));
            // this.byId("statoLabel").setText(navModel.Zeventid);
            this.byId("detailNote").setValue(navModel.Znote);
            this.byId("detailStatus").setText(formatter.formatDescrizioneStato(navModel.Zstatus));
            this.byId("detailTime").setText(navModel.Ztime);
            this.byId("detailType").setText(formatter.formatTipo(navModel.Ztype));

            this.byId("detailCategory").setText(formatter.formatCategoria(navModel.Zcategory));
            this.byId("detailSitoWeb").setText(navModel.Zsitoweb);

            // elencoContrattiXMatForn = navModel.elencoContrattiXMatForn;
            // elencoContrattiXMatForn = elencoContrattiXMatForn.filter(d => d.Stato !== "3");
            // for (var i = 0; i < elencoContrattiXMatForn.length; i++) {
            //     elencoContrattiXMatForn[i].IndexOggetto = i;
            // }

            // currentMatSelected = JSON.parse(JSON.stringify(navModel.materialeSelected));
            // fornitoreF4 = currentMatSelected.Lifnr;
            // this.getView().byId("descrizioneMaterialeLabel").setText(navModel.materialeSelected.Matnr + " - " + navModel.materialeSelected.Maktx);
            // this.getView().byId("gruppoMercilabel").setText(navModel.materialeSelected.Matkl);
            // if (navModel.materialeSelected.Lifnr.length > 0) {
            //     //this.getView().byId("fornitoreLabel").setText(navModel.materialeSelected.Lifnr + " - " + navModel.materialeSelected.Name1);
            //     this.getView().byId("textFornitore").setText(navModel.materialeSelected.Lifnr + " " + navModel.materialeSelected.Name1);
            //     this.getView().byId("textFornitore").setHref(urlPath + "#XK03-display?FORNITORE=" + navModel.materialeSelected.Lifnr)

            // } else {
            //     this.getView().byId("textFornitore").setText("");
            // }
            // this.getView().byId("statoLabel").setText(navModel.materialeSelected.StatoDescr);

            // this.getView().byId("fornitoreInput").setEditable(false);
            // if (navModel.materialeSelected.Lifnr.length > 0) {
            //     this.getView().byId("fornitoreInput").setValue(navModel.materialeSelected.Lifnr + " - " + navModel.materialeSelected.Name1);
            // } else {
            //     this.getView().byId("fornitoreInput").setValue("");
            // }
            // this.getView().byId("unitaPrezzoModInput").setEditable(false);
            // this.getView().byId("unitaPrezzoModInput").setValue(Number(navModel.materialeSelected.Priceunit));
            // this.getView().byId("leadTimeModInput").setEditable(false);
            // this.getView().byId("leadTimeModInput").setValue(Number(navModel.materialeSelected.LeadTime));
            // this.getView().byId("confezModInput").setEditable(false);
            // this.getView().byId("confezModInput").setValue(Number(navModel.materialeSelected.Confez));
            // this.getView().byId("minOrdModInput").setEditable(false);
            // this.getView().byId("minOrdModInput").setValue(Number(navModel.materialeSelected.Minord));
            // this.getView().byId("destiModSel").setEditable(false);
            // let listaDestinazioniModel = sap.ui.getCore().getModel("listaDestinazioniModel");
            // this.getView().byId("destiModSel").setModel(listaDestinazioniModel, "listaDestinazioniModel");
            // this.getView().byId("destiModSel").setSelectedKey(navModel.materialeSelected.Destinazione);
            // this.getView().byId("prezzoInput").setEditable(false);
            // this.getView().byId("prezzoInput").setValue(navModel.materialeSelected.Prezzo);

            // let listaContrattiDettMatModel = new JSONModel();
            // listaContrattiDettMatModel.setData(elencoContrattiXMatForn);
            // this.getView().byId("listaContrattiXMatForn").setModel(listaContrattiDettMatModel, "listaContrattiDettMatModel");
            // this.getView().byId("titleTable").setText("Contratti Applicativi (" + elencoContrattiXMatForn.length + ")");
            // if (elencoContrattiXMatForn.length > 11) {
            //     this.getView().byId("listaContrattiXMatForn").setVisibleRowCount(11);
            // } else {
            //     this.getView().byId("listaContrattiXMatForn").setVisibleRowCount(elencoContrattiXMatForn.length);
            // }

            // this.getView().byId("dataFinePeriodo").setDateValue(new Date());
            // let today = new Date();
            // today.setFullYear(Number(today.getFullYear()) - 1);
            // this.getView().byId("dataInizioPeriodo").setDateValue(today);
            // this.caricaNoteStatistiche();
            // if (navModel.goto === "REPORT") {
            //     this.getView().byId("tabBarDettMat").setSelectedKey("report");
            // } else {
            //     this.getView().byId("tabBarDettMat").setSelectedKey("info");
            // }
            // if (currentMatSelected.Stato === "2") {
            //     this.getView().byId("inAppBtn").setEnabled(true);
            // } else {
            //     this.getView().byId("inAppBtn").setEnabled(false);
            // }

            // this.getView().byId("segButtStast").setSelectedKey("chart");
            // this.getView().byId("boxStats").setVisible(true);
            // this.getView().byId("boxStatsTable").setVisible(false);
        },

        onAbilitaEditInfo: function (oEvent) {
            this.getView().byId("fornitoreInput").setEditable(true);
            this.getView().byId("unitaPrezzoModInput").setEditable(true);
            this.getView().byId("leadTimeModInput").setEditable(true);
            this.getView().byId("confezModInput").setEditable(true);
            this.getView().byId("minOrdModInput").setEditable(true);
            this.getView().byId("destiModSel").setEditable(true);
            this.getView().byId("prezzoInput").setEditable(true);
        },

        addFilter: function (param, value) {
            return new sap.ui.model.Filter({
                path: param,
                operator: sap.ui.model.FilterOperator.EQ,
                value1: value
            });
        },

        onNavBack: function (oEvent) {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if (changesNotSaved) {
                MessageBox.warning("Attenzione. Ci sono modifiche non salvate.\nSe prosegui i dati modificati verranno persi.\nProseguire?", {
                    actions: ["PROSEGUIRE", "ANNULLA"],
                    emphasizedAction: "PROSEGUIRE",
                    onClose: function (sAction) {
                        if (sAction === "PROSEGUIRE") {
                            oRouter.navTo("RouteMainview");
                        }
                    }
                });
                return;
            } else {
                oRouter.navTo("RouteMainview");
            }
        },
	});
});