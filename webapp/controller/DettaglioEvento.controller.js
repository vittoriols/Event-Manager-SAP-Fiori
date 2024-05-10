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