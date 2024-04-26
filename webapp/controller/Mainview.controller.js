sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "zui5eventm/zui5eventm/model/formatter",
    'sap/ui/core/Fragment',
    "sap/ui/table/library",
    'sap/ui/export/library',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/Sorter",
    "sap/makit/Row",
    "sap/m/IconTabFilter",
    "sap/m/Text",
    "sap/ui/table/RowAction",
    "sap/ui/table/RowActionItem",
    "sap/ui/table/RowSettings",
    "sap/ui/core/Messaging",
    "sap/ui/model/ValidateException",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        JSONModel,
        formatter,
        Fragment,
        library,
        exportLibrary,
        Filter,
        FilterOperator,
        Spreadsheet,
        Sorter,
        Row,
        IconTabFilter,
        Text,
        RowAction,
        RowActionItem,
        RowSettings,
        Messaging,
        ValidateException,
        MessageBox,
        MessageToast,
    ) {
        "use strict";
        let SortOrder = library.SortOrder;
        // attach handlers for validation errors
        var oMM = Messaging;
        return Controller.extend("zui5eventm.zui5eventm.controller.Mainview", {
            formatter: formatter,
            Controller: this,
            Messaging: Messaging,
            onInit: function () {
                var visibilityModel = {
                    showFooter: false,
                    gestOrdGroupVisible: true,
                    pemGroupVisible: false,
                    pemDetailGroupVisible: false,
                    pemInAppGroupVisible: false,
                    kpiGroupVisible: false,
                    addPianBtnVisible: false,
                    buttonsPlan: false,
                    buttonsGO: false,
                    dynPageTitleVisible: true,
                    dynPageHeaderVisible: true,
                    fullEditBtnVisible: false,
                    detailRitardoConsegne: false,
                };

                this.getView().setModel(
                    new JSONModel(visibilityModel),
                    "visibilityModel"
                );
                // this.genericTitle = this.getView().byId("idDynamicPageTitle").getHeading();

                var oImgModel = new JSONModel(sap.ui.require("images/ibmcic.png"));
                this.getView().setModel(oImgModel, "img");

                // POPOLARE COMBOBOX TIPO EVENTI

                let data = [{
                    Tipo: "01",
                    Descrizione: "Evento Interno",
                    Organizzatore: "IBM"
                }, {
                    Tipo: "02",
                    Descrizione: "Evento Esterno",
                    Organizzatore: "Vendor"
                }]

                let listaTipiEventi = new JSONModel();
                listaTipiEventi.setData(data);
                this.getView().byId("idSocGOComboBox").setModel(listaTipiEventi, "listaTipiEventi");

                let categorieEvento = [{
                    Cod: "01",
                    Categoria: "Concerto"
                }, {
                    Cod: "02",
                    Categoria: "Teatro"
                },
                {
                    Cod: "03",
                    Categoria: "Attivitá Benefica"
                }
                    , {
                    Cod: "04",
                    Categoria: "Serata"
                }
                    , {
                    Cod: "05",
                    Categoria: "Party IBM"
                }
                    , {
                    Cod: "06",
                    Categoria: "Party"
                }
                    , {
                    Cod: "07",
                    Categoria: "Cena"
                }
                    , {
                    Cod: "08",
                    Categoria: "Mostra/Museo"
                }]

                let listaCategorieEventi = new JSONModel();
                listaCategorieEventi.setData(categorieEvento);
                this.getView().byId("idCategoriaEventoCB").setModel(listaCategorieEventi, "listaCategorieEventi");


                let stati = [{
                    Cod: "01",
                    Descrizione: "Da Approvare"
                },
                {
                    Cod: "02",
                    Descrizione: "Approvato"
                },
                {
                    Cod: "03",
                    Descrizione: "Modificato"
                },
                {
                    Cod: "04",
                    Descrizione: "Annullato"
                },
                {
                    Cod: "05",
                    Descrizione: "Scaduto"
                }
                ]

                let listaStati = new JSONModel();
                listaStati.setData(stati);
                this.getView().byId("idStatoEventoGOComboBox").setModel(listaStati, "listaStati");

                //Istanzia tabella preferiti

                // var oTabellaPreferiti = this.byId("tabPreferiti");
                // // var oToggleButton = oEvent.getSource();
                // var oTemplate = new RowAction({
                //     items: [
                //         new RowActionItem({
                //             type: "Navigation",

                //             visible: true
                //         }),
                //         new RowActionItem({ type: "Delete"})
                //     ]
                // });

                // oTabellaPreferiti.setRowSettingsTemplate(oTemplate);

                var oData = [
                    {
                        "name": "Foo",
                        "age": 30
                    },
                    {
                        "name": "Bee",
                        "age": 20
                    }
                ]
                let listaPreferitiMock = new JSONModel();
                listaPreferitiMock.setData(oData);
                this.getView().byId("tablePreferitiTest").setModel(listaPreferitiMock, "listaPreferitiMock");

                let dataObject = {
                    Name: "",
                    Subject1: "",
                    Subject2: "",
                    Subject3: ""
                };
                let oEventModel = new JSONModel();
                oEventModel.setData(dataObject);
                this.getView().setModel(
                    oEventModel,
                    "oEventModel"
                );

                var oModelTime = new JSONModel();
                oModelTime.setData({
                    "maskMode": {
                        "state": true
                    },
                    "timePickers": {
                        "TP1": {
                            "value": "19:15",
                            "format": "HH:mm",
                            "placeholder": "Enter meeting start time"
                        },
                        "TP2": {
                            "format": "HH:mm:ss",
                            "showCurrentTimeButton": "true",
                            "placeholder": "Enter meeting end time"
                        },
                        // "TP3": {
                        // 	"value": UI5Date.getInstance(),
                        // 	"placeholder" :"Enter daily task deadline"
                        // },
                        "TP4": {
                            "format": "hh:mm:ss a",
                            "placeholder": "Enter time"
                        },
                        // "TP5": {
                        // 	"format": "hh:mm:ss a",
                        // 	"initialFocusedDateValue": UI5Date.getInstance(2017, 8, 9, 10, 11, 12),
                        // 	"placeholder" :"Enter time"
                        // },
                        "TP6": {
                            "format": "HH:mm:ss",
                            "support2400": true,
                            "value": "23:40:50",
                            "placeholder": "Enter meeting start time"
                        }
                    }
                });
                this.getView().setModel(oModelTime);
                this._iEvent = 0;

            }, // fine onInit

            onAzzeraFiltri: function () {
                this.getView().byId("idNumOrdGOMultiInput").destroyTokens(); //Multiinput
                this.getView().byId("idIndirizzoGOInput").setValue(''); // Input
                this.getView().byId("idDataDaGODatePicker").setValue(null); // DatePicker
                this.getView().byId("idSocGOComboBox").setSelectedKey(null);
                this.getView().byId("idCategoriaEventoCB").setSelectedKeys([]); // MultiCombobox
                this.getView().byId("idStatoEventoGOComboBox").setSelectedKey(null); //Combobox
            },
            onTitleInput: function (oEvent) {
                let self = this;
                let oModelEcc = this.getOwnerComponent().getModel(); // prendo il modello 
                oModelEcc.setUseBatch(false); // cosi dico che non voglio fare una chiamata batch, ossia che raggruppa piu chiamate al suo interno
                // let grpMerci = this.getView().byId("serviceInput").getValue().split(" - ")[0];
                // let inputService = this.getView().byId("serviceInput");
                let inputTitle = oEvent.getSource();  // ALTERNATIVA AL RIGO DI SOPRA MA PIU EFFICIENTE
                inputTitle.destroySuggestionItems();
                // inputService.updateSuggestionItems();
                let ITitle = this.addFilter("ITitle", oEvent.getParameters("value").suggestValue);
                oModelEcc.read("/F4EventsSet", { // qui devo mettere il nome dell'entitá ossia quella che sta dopo il servizio nell'url
                    filters: [ITitle],
                    success: function (oResult) {
                        // sap.ui.core.BusyIndicator.hide();
                        // let listaService = new JSONModel();
                        let results = oResult.results;
                        // listaService.setData(oResult.results)
                        // inputService.setModel(listaService,"listaService");
                        for (var i = 0; i < results.length; i++) {
                            inputTitle.addSuggestionItem(new sap.ui.core.Item({ key: results[i].Zeventid, text: results[i].Ztitle }));
                        }
                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            },
            onAddressInput: function (oEvent) {
                let self = this;
                let oModelEcc = this.getOwnerComponent().getModel(); // prendo il modello 
                oModelEcc.setUseBatch(false); // cosi dico che non voglio fare una chiamata batch, ossia che raggruppa piu chiamate al suo interno
                let inputAddress = oEvent.getSource();  // ALTERNATIVA AL RIGO DI SOPRA MA PIU EFFICIENTE
                inputAddress.destroySuggestionItems();
                // inputService.updateSuggestionItems();
                let IAddress = this.addFilter("IAddress", oEvent.getParameters("value").suggestValue);
                oModelEcc.read("/F4AddressSet", { // qui devo mettere il nome dell'entitá ossia quella che sta dopo il servizio nell'url
                    filters: [IAddress],
                    success: function (oResult) {
                        // sap.ui.core.BusyIndicator.hide();
                        // let listaService = new JSONModel();
                        let results = oResult.results;
                        // listaService.setData(oResult.results)
                        // inputService.setModel(listaService,"listaService");
                        for (var i = 0; i < results.length; i++) {
                            inputAddress.addSuggestionItem(new sap.ui.core.Item({ key: results[i].Zeventid, text: results[i].Zaddress }));
                        }
                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            },

            addFilter: function (param, value) {
                return new sap.ui.model.Filter({
                    path: param,
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: value
                });
            },

            onPressNuovoEvento: async function (oEvent) {


                var oView = this.getView();



                oView.setModel(new JSONModel({ titolo: "", location: "" }));
                // create dialog lazily
                this.oDialog ??= await this.loadFragment({
                    name: "zui5eventm.zui5eventm.view.fragment.others.nuovoEvento",
                    controller: this
                });


                //TO-DO --> fare in modo di passare il model che sta nell'OnInit senza duplicarlo, inserirlo nel manifest ????
                let categorieEvento = [{
                    Cod: "01",
                    Categoria: "Concerto"
                }, {
                    Cod: "02",
                    Categoria: "Teatro"
                },
                {
                    Cod: "03",
                    Categoria: "Attivitá Benefica"
                }
                    , {
                    Cod: "04",
                    Categoria: "Serata"
                }
                    , {
                    Cod: "05",
                    Categoria: "Party IBM"
                }
                    , {
                    Cod: "06",
                    Categoria: "Party"
                }
                    , {
                    Cod: "07",
                    Categoria: "Cena"
                }
                    , {
                    Cod: "08",
                    Categoria: "Mostra/Museo"
                }]

                let listaCategorieEventi = new JSONModel();
                listaCategorieEventi.setData(categorieEvento);
                // this.getView().byId("idNewCategoria").setModel(listaCategorieEventi, "listaCategorieEventi");

                oView.addDependent(this.oDialog);

                this.oDialog.open();
                this.getView().byId("idNewCategoria").setModel(listaCategorieEventi, "listaCategorieEventi");
                // this.getView().byId("idNewTipo").setSelectedKey("");
                // attach handlers for validation errors
                // var oMMLocal = oMM;
                // oMMLocal.registerObject(oView.byId("idNewTitolo"), true);
                // oMMLocal.registerObject(oView.byId("idNewCitta"), true);
            },

            onDialogEditOrderRowClose: function (oEvent) {
                this.getView().byId("idNewTitolo").setValueState("None");
                this.getView().byId("idNewTitolo").setValue("");
                this.getView().byId("idNewCitta").setValueState("None");
                this.getView().byId("idNewCitta").setValue("");
                this.getView().byId("idNewData").setValueState("None");
                this.getView().byId("idNewData").setValue("");
                this.getView().byId("idNewOra").setValueState("None");
                this.getView().byId("idNewOra").setValue("");
                this.getView().byId("idNewTipo").setValueState("None");
                this.getView().byId("idNewTipo").setValue("");
                this.getView().byId("idNewCategoria").setValueState("None");
                this.getView().byId("idNewCategoria").setValue("");
                this.oDialog.close();
                // this.oDialog.destroy();
            },

            _validateInput: function (oInput) {
                var sValueState = "None";
                var bValidationError = false;
                var oBinding = oInput.getBinding("value");
                var oMyData = oBinding.getValue();
                try {
                    if (oMyData.length === 0) {
                        sValueState = "Error";
                        bValidationError = true;
                    }
                } catch (oException) {
                    sValueState = "Error";
                    bValidationError = true;
                }

                oInput.setValueState(sValueState);

                return bValidationError;
            },

            convertTimeToDuration: function (timeString) {
                // Split the time string into hours, minutes, and seconds
                const [hours, minutes, seconds] = timeString.split(':');

                // Construct the duration string in the desired format
                const durationString = `PT${hours}H${minutes}M${seconds}S`;

                return durationString;
            },
            convertiFormatoData: function (dataInterna) {
                // Estrarre i componenti della data
                var giorno = dataInterna.substring(0, 2);
                var mese = dataInterna.substring(2, 4);
                var anno = dataInterna.substring(4, 8);

                // Creare una nuova data nel formato yyyyMMdd
                var nuovaData = new Date(anno, parseInt(mese) - 1, giorno);

                // Formattare la nuova data come stringa nel formato yyyyMMdd
                var annoNuovaData = nuovaData.getFullYear();
                var meseNuovaData = (nuovaData.getMonth() + 1).toString().padStart(2, '0');
                var giornoNuovaData = nuovaData.getDate().toString().padStart(2, '0');

                return annoNuovaData + meseNuovaData + giornoNuovaData;
            },
            onDialogNewEventConferma: async function (oEvent) {

                var oView = this.getView(),
                    aInputs = [
                        oView.byId("idNewTitolo"),
                        oView.byId("idNewCitta"),
                        oView.byId("idNewData"),
                        oView.byId("idNewOra"),
                        // oView.byId("idNewTipo"),
                        oView.byId("idNewCategoria"),
                    ],
                    bValidationError = false;

                // Check that inputs are not empty.
                // Validation does not happen during data binding as this is only triggered by user actions.
                aInputs.forEach(function (oInput) {
                    bValidationError = this._validateInput(oInput) || bValidationError;
                }, this);

                if (!bValidationError) {

                    let newTitle = this.getView().byId("idNewTitolo").getValue();
                    let newCitta = this.getView().byId("idNewCitta").getValue();
                    let newData = this.getView().byId("idNewData").getValue();
                    let newOra = this.getView().byId("idNewOra").getValue();
                    let newOraString = newOra.toString();
                    newOraString = this.convertTimeToDuration(newOraString);
                    let newTipo = this.getView().byId("idNewTipo").getSelectedKey();
                    let newSitoWeb = this.getView().byId("idNewSitoWeb").getValue();
                    let newNote = this.getView().byId("idNewNote").getValue();
                    let newCategoria = this.getView().byId("idNewCategoria").getSelectedKey();

                    // Al backend serve

                    var userRequestBody = {
                        ITitle: newTitle,
                        IDate: newData,
                        IAddress: newCitta,
                        ICategory: newCategoria,
                        INote: newNote,
                        ITime: newOraString,
                        IType: newTipo,
                        // communications: []  // contain multiple communications 
                    };
                    // var oInput = oEvent.getSource(); // prendo il componente
                    // let val = oEvent.getParameters("value").suggestValue; // leggo il valore "value" quindi

                    let oModelEcc = this.getOwnerComponent().getModel(); // prendo il modello 

                    oModelEcc.setUseBatch(false); // cosi dico che non voglio fare una chiamata batch, ossia che raggruppa piu chiamate al suo interno
                    // let grpMerci = this.getView().byId("serviceInput").getValue().split(" - ")[0];
                    // let inputService = this.getView().byId("serviceInput");
                    let run = oEvent.getSource();  // ALTERNATIVA AL RIGO DI SOPRA MA PIU EFFICIENTE
                    // run.setBusy(true); // mette il busy sul pulsante
                    sap.ui.core.BusyIndicator.show(0);
                    // inputService.destroySuggestionItems();
                    // inputService.updateSuggestionItems();
                    // let ISrvNum = this.addFilter("Isrvnum", oEvent.getParameters("value").suggestValue);
                    oModelEcc.create("/CreateEventSet", userRequestBody, { // qui devo mettere il nome dell'entitá ossia quella che sta dopo il servizio nell'url
                        // filters: [ISrvNum],
                        success: function (oResult) {
                            // sap.ui.core.BusyIndicator.hide();
                            // let listaService = new JSONModel();
                            let results = oResult.results;
                            console.log("create completata!");
                            sap.ui.core.BusyIndicator.hide();
                            oEvent.getSource().getParent().close(); //Chiudi DIALOG FRAGMENT!!
                            // for (var i = 0; i < results.length; i++) {

                            //     inputService.addSuggestionItem(new sap.ui.core.Item({ key: results[i].SrvNumber, text: results[i].SrvNumber }));

                            // }
                        },
                        error: function (oError) {
                            sap.ui.core.BusyIndicator.hide();
                        }
                    });
                    MessageToast.show("Evento Creato, ora é in attesa di approvazione.");
                } else {
                    MessageBox.alert("Inserire i campi obbligatori, poi riprovare.");
                }
            },


            onPressImage: function () {
                // 			this.getView().getModel("img").setProperty('/products/pic1', "https://www.google.it");
                window.open("https://www.google.it", "_blank");
            },



            onSearchEvents: function (oEvent) {
                // this.getView().byId("btnEscludi").setVisible(true);
                // this.getView().byId("btnIncludi").setVisible(false);

                let self = this;
                let filters = [];
                let table = this.getView().byId("tabListaEventi");

                let lt_events = this.getView().byId("idNumOrdGOMultiInput").getTokens()
                let sData = lt_events.map(function (oToken) {
                    return oToken.getKey();
                }).join(",");
                if (sData.length > 0) {
                    let separatedData = sData.split(',');
                    for (var i = 0; i < separatedData.length; i++) {
                        let IEvent = this.addFilter("IEvent", separatedData[i]);
                        filters.push(IEvent);
                    }
                }

                let lt_date = this.getView().byId("idDataDaGODatePicker").getValue()
                if (lt_date != "") {
                    lt_date = this.convertiFormatoData(lt_date) //Converto data in formato SAP
                    let IDate = this.addFilter("IDate", lt_date);
                    filters.push(IDate);
                }

                // sData = lt_date.map(function (oToken) {
                //     return oToken.getKey();
                // }).join(",");
                // if (sData.length > 0) {
                //     let IDate = this.addFilter("IDate", sData);
                //     filters.push(IDate);
                // }

                let lt_address = this.getView().byId("idIndirizzoGOInput").getValue()
                if (lt_address != "") {
                    let IAddress = this.addFilter("IAddress", lt_address);
                    filters.push(IAddress);
                }

                let lt_tipo_evento = this.getView().byId("idSocGOComboBox").getSelectedKey()
                if (lt_tipo_evento != "") {
                    let IType = this.addFilter("IType", lt_tipo_evento);
                    filters.push(IType);
                }

                let lt_status = this.getView().byId("idStatoEventoGOComboBox").getSelectedKey()
                if (lt_status != "") {
                    let IStatus = this.addFilter("IStatus", lt_status);
                    filters.push(IStatus);
                }

                let lt_categoria = this.getView().byId("idCategoriaEventoCB").getSelectedKeys()
                if (lt_categoria != "") {
                    // let separatedDataCategories = sData.split(',');
                    for (var i = 0; i < lt_categoria.length; i++) {
                        let ICategory = this.addFilter("ICategory", lt_categoria[i]);
                        filters.push(ICategory);
                    }
                }
                // sData = lt_address.map(function (oToken) {
                //     return oToken.getKey();
                // }).join(",");
                // if (sData.length > 0) {
                //     let IAddress = this.addFilter("IAddress", sData);
                //     filters.push(IAddress);
                // }

                // let iClose = this.getView().byId("checkboxDaApprovare").getSelected()
                // if (iClose === true) {
                //     let IClose = this.addFilter("SClose", 'X');
                //     filters.push(IClose);
                // }
                if (filters.length === 0) {
                    sap.m.MessageBox.warning("Non è stato selezionato alcun filtro.\nE' necessario impostare almeno 1 filtro per iniziare la ricerca.", {
                        actions: ["OK"],
                        emphasizedAction: "OK",
                        onClose: function (sAction) {
                        }
                    });
                    return;
                }
                table.setBusy(true);
                // this.resetSortingState();
                let oModelEcc = this.getOwnerComponent().getModel();
                oModelEcc.setUseBatch(false);
                oModelEcc.read("/GetEventsSet", {
                    filters: filters,
                    success: function (oRetrievedResult) {
                        table.setBusy(false);
                        let listaEventi = new JSONModel();
                        let tempData = oRetrievedResult.results;

                        for (var i = 0; i < tempData.length; i++) {
                            tempData[i].Ztime = self._msToHMS(tempData[i].Ztime.ms)
                        }

                        listaEventi.setSizeLimit(tempData.length);
                        listaEventi.setData(tempData);
                        table.setModel(listaEventi, "listaEventi");
                        // listaServizi.setData(data);
                        // this.getView().byId("tabListaServices").setModel(listaServizi, "listaServizi");
                        self.byId("labelNumIniziative").setText("Eventi trovati " + tempData.length);

                        if (tempData.length > 12) {
                            table.setVisibleRowCount(12);
                        } else {
                            table.setVisibleRowCount(tempData.length);
                        }

                    },
                    error: function (oError) {
                        table.setBusy(false);
                    }
                });

            },
            sortDialogOpen: function (oEvent) {
                if (!this.sortTable) {
                    this.sortTable = sap.ui.xmlfragment("zui5eventm.zui5eventm.view.fragment.others.SortingTable", this);
                    this.getView().addDependent(this.sortTable);
                }
                this.manageSortItems();
                this.sortTable.open();
            },

            manageSortItems: function () {
                this.sortTable.removeAllSortItems();
                var item;
                item = this.createSortingItem("Evento", "Ztitle", false);
                this.sortTable.addSortItem(item);
                item = this.createSortingItem("Data", "Zdate", false);
                this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Società", "columnButxt", false);
                // this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Fornitore", "columnName1", false);
                // this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Descrizione", "columnMaktx", false);
                // this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Unità Prezzo", "columnPriceunit", false);
                // this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Lead Time", "columnLeadTime", false);
                // this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Lotto Minimo (pezzi)", "columnMinord", false);
                // this.sortTable.addSortItem(item);
                // item = this.createSortingItem("Stato", "columnStato", false);
                // this.sortTable.addSortItem(item);
                // /*item = this.createSortingItem("Minimo Ordine (€)", "columnMinOrdEuro", false);
                // this.sortTable.addSortItem(item);*/
                // item = this.createSortingItem("Prezzo", "columnPrezzo", false);
                // this.sortTable.addSortItem(item);
            },

            createSortingItem: function (text, key, isSelected) {
                var item = new sap.m.ViewSettingsItem({
                    text: text,
                    key: key,
                    selected: isSelected
                });
                return item;
            },

            confirmSortingTable: function (oEvent) {
                var oTable = this.getView().byId("tabListaEventi");
                var mParams = oEvent.getParameters();
                let sortingV = SortOrder.Ascending;
                if (mParams.sortDescending) {
                    sortingV = SortOrder.Descending;
                }
                let key = mParams.sortItem.getProperty("key");
                if (key === "columnPriceunit" || key === "columnLeadTime" || key === "columnPrezzo" || key === "columnMinord" || key === "columnMinOrdEuro") {
                    let model = oTable.getModel("listaCodiciMaterialiModel");
                    let dd = model.getData();

                    key = key.replace("column", ""); // Fai diventare la chiava del json
                    if (sortingV === SortOrder.Ascending) {
                        dd.sort(function (x, y) {
                            if (Number(x[key]) < Number(y[key])) {
                                return -1;
                            }
                            if (Number(x[key]) > Number(y[key])) {
                                return 1;
                            }
                            return 0;
                        });
                    } else {
                        dd.sort(function (x, y) {
                            if (Number(x[key]) > Number(y[key])) {
                                return -1;
                            }
                            if (Number(x[key]) < Number(y[key])) {
                                return 1;
                            }
                            return 0;
                        });
                    }

                    model.setData(dd);
                    oTable.setModel(model, "listaCodiciMaterialiModel");
                } else {
                    let model = oTable.getModel("listaEventi");
                    let dd = model.getData();

                    key = key.replace("column", ""); // Fai diventare la chiava del json
                    if (sortingV === SortOrder.Ascending) {
                        dd.sort(function (x, y) {
                            if (x[key] < (y[key])) {
                                return -1;
                            }
                            if ((x[key]) > (y[key])) {
                                return 1;
                            }
                            return 0;
                        });
                    } else {
                        dd.sort(function (x, y) {
                            if ((x[key]) > (y[key])) {
                                return -1;
                            }
                            if ((x[key]) < (y[key])) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                    model.setData(dd);
                    oTable.setModel(model, "listaEventi");
                }
            },

            _msToHMS: function (ms) {
                // 1- Convert to seconds:
                var seconds = ms / 1000;
                // 2- Extract hours:
                var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
                seconds = seconds % 3600; // seconds remaining after extracting hours
                // 3- Extract minutes:
                var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
                // 4- Keep only seconds not extracted to minutes:
                seconds = seconds % 60;
                var finalTime = (hours + ":" + minutes + ":" + seconds);
                return finalTime;
            },



            onIconTabHeaderSelect: function (oEvent) {
                var visibilityModel = this.getView().getModel("visibilityModel");
                var selectedTab = oEvent.getParameter("key");
                visibilityModel.setProperty("/dynPageTitleVisible", true);
                visibilityModel.setProperty("/dynPageHeaderVisible", true);
                // resetto il titolo generico nel caso in cui clicco su un header mentre sono su una pagina di dettaglio

                switch (selectedTab) {
                    case "preferiti":
                        // this.getView().byId("idDynamicPageTitle").setHeading(this.genericTitle);
                        visibilityModel.setProperty("/gestOrdGroupVisible", false);
                        visibilityModel.setProperty("/pemGroupVisible", true);
                        // visibilityModel.setProperty("/pemDetailGroupVisible", false);
                        // visibilityModel.setProperty("/kpiGroupVisible", false);
                        // visibilityModel.setProperty("/dynPageTitleVisible", true);
                        // visibilityModel.setProperty("/dynPageHeaderVisible", true);
                        // visibilityModel.setProperty("/pemInAppGroupVisible", false);
                        // this.getView().byId("tabellaPem").setModel(new JSONModel(), "listaPemModel");
                        // this.getView().byId("titlePem").setText("PEM (0)");
                        // this.getView().byId("tabellaPem").setVisibleRowCount(0);
                        break;
                    case "eventi":
                        // this.getView().byId("idDynamicPageTitle").setHeading(this.genericTitle);
                        visibilityModel.setProperty("/pemGroupVisible", false);
                        visibilityModel.setProperty("/gestOrdGroupVisible", true);
                        // visibilityModel.setProperty("/pemDetailGroupVisible", false);
                        // visibilityModel.setProperty("/kpiGroupVisible", false);
                        // visibilityModel.setProperty("/dynPageTitleVisible", true);
                        // visibilityModel.setProperty("/dynPageHeaderVisible", true);
                        // visibilityModel.setProperty("/pemInAppGroupVisible", false);
                        // this.getView().byId("idGestOrdTable").setVisibleRowCount(0);
                        // this.getView().getModel("GOTableModel").setData([]);
                        // this.getView().getModel("GOTableModel").refresh();
                        // visibilityModel.setProperty("/detailRitardoConsegne", false);
                        break;
                }
            },
            openLegendaStati: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                if (!this.legendaPopover) {
                    this.legendaPopover = Fragment.load({
                        id: oView.getId(),
                        name: "zui5eventm.zui5eventm.view.fragment.others.Legenda",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                // let currentData = this.getView().byId("tabListaServices").getModel("listaListiniModel").getData()
                // this.byId("labelNumIniziative").setText("Servizi trovati " + currentData.length);

                this.legendaPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },

            liveSearch: function (oEvent) {
                var sQuery = oEvent.getSource().getValue();
                this._oGlobalFilter = null;
                if (sQuery) {
                    this._oGlobalFilter = new sap.ui.model.Filter([
                        new sap.ui.model.Filter("Ztitle", sap.ui.model.FilterOperator.Contains, sQuery),
                        new sap.ui.model.Filter("Zcategory", sap.ui.model.FilterOperator.Contains, sQuery),
                        new sap.ui.model.Filter("Zaddress", sap.ui.model.FilterOperator.Contains, sQuery),
                    ], false);
                }
                this._filter();

            },

            _filter: function () {
                var oFilter = null;
                if (this._oGlobalFilter && this._oPriceFilter) {
                    oFilter = new Filter([this._oGlobalFilter, this._oPriceFilter], true);
                } else if (this._oGlobalFilter) {
                    oFilter = this._oGlobalFilter;
                } else if (this._oPriceFilter) {
                    oFilter = this._oPriceFilter;
                }

                this.getView().byId("tabListaEventi").getBinding().filter(oFilter);
            },

            exportToExcel: function () {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
                if (!this._oTable) {
                    this._oTable = this.byId('tabListaEventi');
                }

                oTable = this._oTable;
                oRowBinding = oTable.getBinding();
                aCols = this.createColumnConfig();
                oSettings = {
                    workbook: {
                        columns: aCols,
                        context: {
                            sheetName: "Events"
                        }
                    },
                    // dataSource: this.managePrice(this.getView().byId("tabListaServices").getModel("listaServizi").getData()),
                    dataSource: oRowBinding,
                    fileName: "Events" + '.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            },
            createColumnConfig: function () {
                var aCols = [];
                let EdmType = exportLibrary.EdmType;
                aCols.push({
                    label: "Stato",
                    type: EdmType.Enumeration, //il valueMap funziona solo con type Enumeration
                    property: "Zstatus",
                    // type: EdmType.String,
                    width: "18",
                    valueMap: {
                        "01": 'Da Approvare',
                        '02': 'Approvato',
                        '03': 'Modificato',
                        '04': 'Annullato',
                        '05': 'Scaduto',
                    },
                });
                aCols.push({
                    label: "Evento",
                    property: "Ztitle",
                    // type: EdmType.String,
                    width: "18"
                });
                aCols.push({
                    label: "Tipo Evento",
                    type: EdmType.Enumeration,
                    property: "Ztype",
                    // type: EdmType.String,
                    width: "15",
                    valueMap: {
                        '01': 'Interno IBM',
                        '02': 'Esterno'
                    },
                });
                aCols.push({
                    label: "Categoria",
                    type: EdmType.Enumeration,
                    property: "Zcategory",
                    // type: EdmType.String,
                    width: "18",
                    valueMap: {
                        '01': 'Concerto',
                        '02': 'Teatro',
                        '03': 'Attivitá Benefica',
                        '04': 'Serata',
                        '05': 'Party IBM',
                        '06': 'Party',
                        '07': 'Cena',
                        '08': 'Mostra/Museo',
                    },
                });
                aCols.push({
                    label: "Location",
                    property: "Zaddress",
                    width: "15",
                });
                aCols.push({
                    label: 'Data',
                    type: EdmType.Date,
                    property: 'Zdate',
                    format: 'dd/mm/yyyy',
                    width: 25
                });
                aCols.push({
                    label: 'Ora',
                    type: EdmType.Time,
                    property: 'Ztime',
                    format: 'hh:MM:ss',
                    width: 25
                });
                // aCols.push({
                //     label: "Posizione",
                //     property: "Ebelp",
                //     type: EdmType.String,
                //     width: "10"
                // });
                // aCols.push({
                //     label: "Società",
                //     property: "Butxt",
                //     type: EdmType.String,
                //     width: "15"
                // });
                // aCols.push({
                //     label: "Codice SAP Fornitore",
                //     property: "Lifnr",
                //     type: EdmType.String,
                //     width: "15"
                // });
                // aCols.push({
                //     label: "Fornitore Descrizione",
                //     property: "Name1",
                //     type: EdmType.String,
                //     width: "45"
                // });
                // aCols.push({
                //     label: "Gruppo Merci",
                //     property: "Matkl",
                //     type: EdmType.String,
                //     width: "18"
                // });
                // /*
                // aCols.push({
                //     label: "Gruppo Merci",
                //     property: "Maktx",
                //     type: EdmType.String,
                //     width: "25"
                // });
                // */
                // aCols.push({
                //     label: "Unità di prezzo",
                //     property: "Priceunit",
                //     type: EdmType.Number,
                //     width: "15"
                // });
                // aCols.push({
                //     label: "Lead Time",
                //     property: "LeadTime",
                //     type: EdmType.Number,
                //     width: "15"
                // });
                // aCols.push({
                //     label: "Confezionamento(pezzi)",
                //     property: "Confez",
                //     type: EdmType.Number,
                //     width: "15"
                // });
                // aCols.push({
                //     label: "Lotto Minimo (pezzi)",
                //     property: "Minord",
                //     type: EdmType.Number,
                //     width: "25"
                // });
                // aCols.push({
                //     label: "Stato",
                //     property: "Stato",
                //     type: EdmType.Enumeration,
                //     width: "25",
                //     valueMap: {
                //         "": "DA CARICARE",
                //         "1": "DA CARICARE",
                //         "2": "DA INVIARE",
                //         "3": "IN APPROVAZIONE",
                //         "4": "APPROVATO"
                //     }
                // });
                /*
                aCols.push({
                    label: "Minimo Ordine (€)",
                    property: "MinOrdEuro",
                    type: EdmType.Number,
                    width: "15"
                });
                */
                // aCols.push({
                //     label: "Prezzo",
                //     property: "Prezzo",
                //     type: EdmType.Number,
                //     width: "15"
                // });
                // aCols.push({
                //     label: "Destinazione",
                //     property: "Destinazione",
                //     type: EdmType.String,
                //     width: "25"
                // });
                return aCols;
            },
        });
    });
