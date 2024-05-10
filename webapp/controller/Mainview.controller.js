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
    "sap/ui/model/ValidateException",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/MenuItem"
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
        ValidateException,
        MessageBox,
        MessageToast,
        MenuItem
    ) {
        "use strict";
        let SortOrder = library.SortOrder;
        let pathMoreAction;
        let userType = 'USER'
        // attach handlers for validation errors
        return Controller.extend("zui5eventm.zui5eventm.controller.Mainview", {
            Controller: this,
            formatter: formatter,
            onInit: function () {
                var oRootPath = jQuery.sap.getModulePath("zui5eventm.zui5eventm");
                var oImageModel = new sap.ui.model.json.JSONModel({
                    path: oRootPath,
                });
                this.getView().setModel(oImageModel, "imageModel");

                var visibilityModel = {
                    // showFooter: false,
                    groupVisibleEventi: true,
                    groupVisiblePreferiti: false,

                };

                var managerCheck = { authorization: false };

                this.getView().setModel(
                    new JSONModel(managerCheck),
                    "managerCheck"
                );

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

                var oData = [
                    {
                        "Ztitle": "Foo",
                        "Zstatus": "01"
                    },
                    {
                        "Ztitle": "Bee",
                        "Zstatus": "02"
                    }
                ]
                let listaPreferitiModel = new JSONModel();

                // listaPreferitiModel.setData(listaPreferitiModel);
                // this.getView().byId("tabListaPreferiti").setModel(listaPreferitiModel, "listaPreferitiModel");
                this.aggiornaPreferiti();
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
                var that = this;
                /// VERIFICA RUOLO UTENTE //////////////////////////////////
                sap.ui.core.BusyIndicator.show(0);
                let oModelEcc = this.getOwnerComponent().getModel();
                oModelEcc.setUseBatch(false);
                oModelEcc.read("/ManagerCheckSet", {
                    success: function (oRetrievedResult) {

                        let listaEventi = new JSONModel();
                        let tempData = oRetrievedResult.results;

                        if (tempData.length > 0 && tempData[0].Zactive === "X") {
                            userType = 'MANAGER';
                            managerCheck.authorization = true;
                            console.log("Utente MANAGER");
                        } else {
                            console.log("Utente NORMALE");
                        }

                    },
                    error: function (oError) {
                    }
                });
                sap.ui.core.BusyIndicator.hide();
                ////////////////////////////////////////////////////////////
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

            aggiornaPreferiti: async function (oEvent) {
                // this.getView().byId("tabListaPreferiti").setModel(listaPreferitiModel, "listaPreferitiModel");
                var that = this;
                let oModelEcc = this.getOwnerComponent().getModel();
                oModelEcc.setUseBatch(false);
                oModelEcc.read("/GetFavouritesSet", {
                    success: function (oRetrievedResult) {
                        let listaPreferitiModel = new JSONModel();
                        let tempData = oRetrievedResult.results;

                        for (var i = 0; i < tempData.length; i++) {
                            tempData[i].Ztime = that._msToHMS(tempData[i].Ztime.ms)
                        }

                        listaPreferitiModel.setData(tempData);
                        that.getView().byId("tabListaPreferiti").setModel(listaPreferitiModel, "listaPreferitiModel");
                        that.getView().getModel().refresh(true);
                        // that.getView().byId("tabListaPreferiti").getBinding("rows").refresh();
                        // listaPreferitiModel.refresh();
                        if (tempData.length > 0) {
                            that.byId("labelNumPreferiti").setText("Preferiti: " + tempData.length);
                        } else {
                            that.byId("labelNumPreferiti").setText("Nessun Preferito");
                        };

                    },
                    error: function (oError) {
                        // table.setBusy(false);
                    }
                });
            },

            onPressNuovoEvento: async function (oEvent) {


                var oView = this.getView();
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


                oView.setModel(new JSONModel({ titolo: "", location: "" }));
                // create dialog lazily
                // this.oDialog ??= await this.loadFragment({
                this.oDialog ??= await Fragment.load({
                    name: "zui5eventm.zui5eventm.view.fragment.others.nuovoEvento",
                    controller: this,
                }).then(function(oContent){
                    this.oDialog = oContent;
                    // this.getView().byId("idNewCategoria").setModel(listaCategorieEventi, "listaCategorieEventi");
                    sap.ui.getCore().byId("idNewCategoria").setModel(listaCategorieEventi, "listaCategorieEventi");
                    oView.addDependent(this.oDialog);
                    oContent.open();
                }.bind(this));

                //  oView.addDependent(this.oDialog);

                // this.oDialog.open();
                // this.getView().byId("idNewCategoria").setModel(listaCategorieEventi, "listaCategorieEventi");

            },

            onDialogEditOrderRowClose: function (oEvent) {
                var that = sap.ui.getCore();
                that.byId("idNewTitolo").setValueState("None");
                that.byId("idNewTitolo").setValue("");
                that.byId("idNewCitta").setValueState("None");
                that.byId("idNewCitta").setValue("");
                that.byId("idNewData").setValueState("None");
                that.byId("idNewData").setValue("");
                that.byId("idNewOra").setValueState("None");
                that.byId("idNewOra").setValue("");
                that.byId("idNewTipo").setValueState("None");
                that.byId("idNewTipo").setValue("");
                that.byId("idNewCategoria").setValueState("None");
                that.byId("idNewCategoria").setValue("");
                that.byId("idNewNote").setValue("");
                that.byId("idNewSitoWeb").setValue("");
                var oDialog = that.byId("NewEventDialog");
                oDialog.close();
                oDialog.destroy();
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
                // var oViewOldUIVersion = oEvent.getSource().getParent().getParent();
                // var oView = this.getView();
                var oView = sap.ui.getCore(),
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
                    var that = sap.ui.getCore();
                    let newTitle = that.byId("idNewTitolo").getValue();
                    let newCitta = that.byId("idNewCitta").getValue();
                    let newData = that.byId("idNewData").getValue();
                    let newOra = that.byId("idNewOra").getValue();
                    let newOraString = newOra.toString();
                    newOraString = this.convertTimeToDuration(newOraString);
                    let newTipo = that.byId("idNewTipo").getSelectedKey();
                    let newSitoWeb = that.byId("idNewSitoWeb").getValue();
                    let newNote = that.byId("idNewNote").getValue();
                    let newCategoria = that.byId("idNewCategoria").getSelectedKey();

                    var userRequestBody = {
                        ITitle: newTitle,
                        IDate: newData,
                        IAddress: newCitta,
                        ICategory: newCategoria,
                        INote: newNote,
                        ITime: newOraString,
                        IType: newTipo,
                        ISitoweb: newSitoWeb,
                        // communications: []  // contain multiple communications 
                    };

                    let oModelEcc = this.getOwnerComponent().getModel(); 

                    oModelEcc.setUseBatch(false); 
                    let run = oEvent.getSource();  // ALTERNATIVA AL RIGO DI SOPRA MA PIU EFFICIENTE
                    sap.ui.core.BusyIndicator.show(0);

                    oModelEcc.create("/CreateEventSet", userRequestBody, { 
                        // filters: [ISrvNum],
                        success: function (oResult) {
                            let results = oResult.results;
                            console.log("create completata!");
                            sap.ui.core.BusyIndicator.hide();
                            // oEvent.getSource().getParent().close(); //Chiudi DIALOG FRAGMENT!!
                            sap.ui.getCore().byId("NewEventDialog").close();
                            MessageToast.show("Evento Creato, ora é in attesa di approvazione.");
                        },
                        error: function (oError) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageBox.alert("Inserire i campi obbligatori, poi riprovare.");
                        }
                    });
                    // MessageToast.show("Evento Creato, ora é in attesa di approvazione.");
                } else {
                    MessageBox.alert("Inserire i campi obbligatori, poi riprovare.");
                }
            },


            onPressImage: function () {
                // 			this.getView().getModel("img").setProperty('/products/pic1', "https://www.google.it");
                window.open("https://ibm.box.com/s/tki03pjm5180m9jwhjo339mwc9s2pysc", "_blank");
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
                    // sap.ui.getCore().addDependent(this.sortTable);
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
                // }
            },

            _msToHMS: function (ms) {
                // 1- Convert to seconds:
                var seconds = ms / 1000;
                
                // 2- Extract hours:
                var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
                if (hours.toString().length === 1) {
                    hours = "0" + hours;
                }
                seconds = seconds % 3600; // seconds remaining after extracting hours
                
                // 3- Extract minutes:
                var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
                if (minutes.toString().length === 1) {
                    minutes = "0" + minutes;
                }
                // 4- Keep only seconds not extracted to minutes:
                seconds = seconds % 60;
                if (seconds.toString().length === 1) {
                    seconds = "0" + seconds;
                }
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
                        visibilityModel.setProperty("/groupVisibleEventi", false);
                        visibilityModel.setProperty("/groupVisiblePreferiti", true);
                        break;
                    case "eventi":
                        // this.getView().byId("idDynamicPageTitle").setHeading(this.genericTitle);
                        visibilityModel.setProperty("/groupVisiblePreferiti", false);
                        visibilityModel.setProperty("/groupVisibleEventi", true);
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

                this.legendaPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },

            onAddFavourite: async function (oEvent) {
                var that = this;
                // let oRiga = oEvent.getSource().getParent().getParent().getRowBindingContext(); // OTTIENI RIGA
                let oIndice = oEvent.getSource().getParent().getParent().getIndex()
                let oRiga = oEvent.getSource().getParent().getParent().getParent().getBinding().getModel().getData()[oIndice]

                // let favEventId = oRiga.getProperty("Zeventid");
                let favEventId = oRiga.Zeventid;
                let favUser = 'Default';
                let favAction = 'I';

                // Al backend serve

                var userRequestBody = {
                    IEvent: favEventId,
                    IUser: favUser,
                    IAction: favAction
                };
                let oModelEcc = this.getOwnerComponent().getModel(); // prendo il modello 

                oModelEcc.setUseBatch(false); // cosi dico che non voglio fare una chiamata batch, ossia che raggruppa piu chiamate al suo interno
                let run = oEvent.getSource();
                run.setBusy(true); // mette il busy sul pulsante
                // sap.ui.core.BusyIndicator.show(0);
                oModelEcc.create("/ManageFavouriteSet", userRequestBody, { // qui devo mettere il nome dell'entitá ossia quella che sta dopo il servizio nell'url
                    success: function (oResult) {
                        let results = oResult.results;
                        run.setBusy(false);
                        that.aggiornaPreferiti();
                        MessageToast.show("Evento aggiunto ai preferiti");
                    },
                    error: function (oError) {
                        MessageToast.show("Errore");
                        // sap.ui.core.BusyIndicator.hide();
                        run.setBusy(false);
                    }
                });

            },
            onDelFavourite: async function (oEvent) {
                let that = this;
                // let oRiga = oEvent.getSource().getParent().getParent().getRowBindingContext(); // OTTIENI RIGA
                let oIndice = oEvent.getSource().getParent().getParent().getIndex()
                let oRiga = oEvent.getSource().getParent().getParent().getParent().getBinding().getModel().getData()[oIndice]


                // let favEventId = oRiga.getProperty("Zeventid");
                let favEventId = oRiga.Zeventid;
                let favUser = 'Default';
                let favAction = 'D';

                let oModelEcc = this.getOwnerComponent().getModel();
                oModelEcc.setUseBatch(false);
                let run = oEvent.getSource();
                run.setBusy(true); // mette il busy sul pulsante

                let oPath = () => oModelEcc.createKey("/ManageFavouriteSet", {
                    IAction: favAction, // gets encoded as 'leer%20zeich'
                    IEvent: favEventId,
                    IUser: favUser
                });

                oModelEcc.remove(oPath(), { // qui devo mettere il nome dell'entitá ossia quella che sta dopo il servizio nell'url
                    success: function (oResult) {
                        // let results = oResult.results;
                        run.setBusy(false);
                        MessageToast.show("Evento rimosso");
                        that.aggiornaPreferiti();
                    },
                    error: function (oError) {
                        MessageToast.show("Errore");
                        // sap.ui.core.BusyIndicator.hide();
                        run.setBusy(false);
                    }
                });

                // this.aggiornaPreferiti();
            },

            onEnterDetailFav: function (oEvent) {
                
                // let oRiga = oEvent.getSource().getParent().getParent().getRowBindingContext(); // OTTIENI RIGA OLD
                let oIndice = oEvent.getSource().getParent().getParent().getIndex()
                let oRiga = oEvent.getSource().getParent().getParent().getParent().getBinding().getModel().getData()[oIndice]
                let dataEvento = this.getView().byId("tabListaPreferiti").getModel("listaPreferitiModel").getData();
                // let rowSelected = JSON.parse(JSON.stringify(dataEvento[pathMoreAction]));
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                let navModel = new JSONModel();
                navModel.setData({
                    Ztitle: oRiga.Ztitle,
                    Zaddress: oRiga.Zaddress,
                    ZcreateUser: oRiga.ZcreateUser,
                    Zdate: oRiga.Zdate,
                    Zeventid: oRiga.Zeventid,
                    Znote: oRiga.Znote,
                    Zstatus: oRiga.Zstatus,
                    Ztime: oRiga.Ztime,
                    Ztype: oRiga.Ztype,
                    Zcategory: oRiga.Zcategory,
                    Zsitoweb: oRiga.Zsitoweb,
                })
                sap.ui.getCore().setModel(navModel, "navModel");
                // sap.ui.core.BusyIndicator.show(0);


                oRouter.navTo("DettaglioEvento");
            },

            onEnterDetail: function (oEvent) {

                // let oRiga = oEvent.getSource().getParent().getParent().getRowBindingContext(); // OTTIENI RIGA OLD
                let oIndice = oEvent.getSource().getParent().getParent().getIndex()
                let oRiga = oEvent.getSource().getParent().getParent().getParent().getBinding().getModel().getData()[oIndice]
                
                let dataEvento = this.getView().byId("tabListaEventi").getModel("listaEventi").getData();
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                let navModel = new JSONModel();
                // navModel.setData({
                //     Ztitle: oRiga.getProperty("Ztitle"),
                //     Zaddress: oRiga.getProperty("Zaddress"),
                //     ZcreateUser: oRiga.getProperty("ZcreateUser"),
                //     Zdate: oRiga.getProperty("Zdate"),
                //     Zeventid: oRiga.getProperty("Zeventid"),
                //     Znote: oRiga.getProperty("Znote"),
                //     Zstatus: oRiga.getProperty("Zstatus"),
                //     Ztime: oRiga.getProperty("Ztime"),
                //     Ztype: oRiga.getProperty("Ztype"),
                //     Zcategory: oRiga.getProperty("Zcategory"),
                //     Zsitoweb: oRiga.getProperty("Zsitoweb"),
                // })
                navModel.setData({
                    Ztitle: oRiga.Ztitle,
                    Zaddress: oRiga.Zaddress,
                    ZcreateUser: oRiga.ZcreateUser,
                    Zdate: oRiga.Zdate,
                    Zeventid: oRiga.Zeventid,
                    Znote: oRiga.Znote,
                    Zstatus: oRiga.Zstatus,
                    Ztime: oRiga.Ztime,
                    Ztype: oRiga.Ztype,
                    Zcategory: oRiga.Zcategory,
                    Zsitoweb: oRiga.Zsitoweb,
                })
                sap.ui.getCore().setModel(navModel, "navModel");
                // sap.ui.core.BusyIndicator.show(0);


                oRouter.navTo("DettaglioEvento");
            },

            onMenuAction: function (oEvent) {
                var oItem = oEvent.getParameter("item"),
                    sItemPath = "";

                while (oItem instanceof MenuItem) {
                    sItemPath = oItem.getText() + " > " + sItemPath;
                    oItem = oItem.getParent();
                }

                sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));

                ///////////////////
                let self = this;
                let action = "";
                let oPulsante = oEvent.getSource().getParent();

                // let oRiga = oEvent.getSource().getParent().getParent().getParent().getRowBindingContext(); // OTTIENI RIGA
                // let oIndice = oRiga.getPath().replace("/", "");

                // let oIndice = oEvent.getSource().getParent().getParent().getIndex()
                let oIndice = oEvent.getSource().getParent().getParent().getParent().getIndex();
                let oRiga = oEvent.getSource().getParent().getParent().getParent().getParent().getBinding().getModel().getData()[oIndice];
                let dataEvento = this.getView().byId("tabListaEventi").getModel("listaEventi").getData();
                // let rowSelected = JSON.parse(JSON.stringify(dataEvento[pathMoreAction]));
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                if (sItemPath === "Approva") {
                    action = 'A';
                } else if (sItemPath === "Rifiuta") {
                    action = 'R';
                }
                if (action !== "") {
                    // let eventId = oRiga.getProperty("Zeventid");
                    let eventId = oRiga.Zeventid;

                    let filters = [];
                    let IEvent = this.addFilter("IEvent", eventId);
                    filters.push(IEvent);

                    let IAction = this.addFilter("IAction", action);
                    filters.push(IAction);

                    let oModelEcc = this.getOwnerComponent().getModel();
                    oPulsante.setBusy(true); // mette il busy sul pulsante
                    oModelEcc.setUseBatch(false);
                    oModelEcc.read("/EventApprovalSet", {
                        filters: filters,
                        success: function (oRetrievedResult) {
                            if (action === 'A') {
                                MessageToast.show("Evento approvato");
                            } else {
                                MessageToast.show("Evento rifiutato");
                            }
                            oPulsante.setBusy(false);
                        },
                        error: function (oError) {
                            MessageToast.show("Errore");
                            oPulsante.setBusy(false);
                        }
                    });

                    ///////////////////
                }
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

            liveSearchFav: function (oEvent) {
                var sQuery = oEvent.getSource().getValue();
                this._oGlobalFilter = null;
                if (sQuery) {
                    this._oGlobalFilter = new sap.ui.model.Filter([
                        new sap.ui.model.Filter("Ztitle", sap.ui.model.FilterOperator.Contains, sQuery),
                        new sap.ui.model.Filter("Zcategory", sap.ui.model.FilterOperator.Contains, sQuery),
                        new sap.ui.model.Filter("Zaddress", sap.ui.model.FilterOperator.Contains, sQuery),
                    ], false);
                }
                this._filterFav();

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

            _filterFav: function () {
                var oFilter = null;
                if (this._oGlobalFilter && this._oPriceFilter) {
                    oFilter = new Filter([this._oGlobalFilter, this._oPriceFilter], true);
                } else if (this._oGlobalFilter) {
                    oFilter = this._oGlobalFilter;
                } else if (this._oPriceFilter) {
                    oFilter = this._oPriceFilter;
                }

                this.getView().byId("tabListaPreferiti").getBinding().filter(oFilter);
            },

            exportToExcel: function () {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
                // if (!this._oTable) {
                this._oTable = this.byId('tabListaEventi');
                // }

                oTable = this._oTable;
                // oRowBinding = oTable.getBinding();
                oRowBinding = oTable.getBinding().getModel().getData();
                aCols = this.createColumnConfig();
                oSettings = {
                    workbook: {
                        columns: aCols,
                        context: {
                            sheetName: "Eventi"
                        }
                    },
                    // dataSource: this.managePrice(this.getView().byId("tabListaServices").getModel("listaServizi").getData()),
                    dataSource: oRowBinding,
                    fileName: "Eventi" + '.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            },

            exportToExcelFav: function () {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
                // if (!this._oTableFav) {
                this._oTableFav = this.byId('tabListaPreferiti');
                // }

                oTable = this._oTableFav;
                // oRowBinding = oTable.getBinding();
                oRowBinding = oTable.getBinding().getModel().getData(); 
                aCols = this.createColumnConfigFav();
                oSettings = {
                    workbook: {
                        columns: aCols,
                        context: {
                            sheetName: "Preferiti"
                        }
                    },
                    // dataSource: this.managePrice(this.getView().byId("tabListaServices").getModel("listaServizi").getData()),
                    dataSource: oRowBinding,
                    fileName: "Preferiti" + '.xlsx',
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
                    // type: EdmType.Time,
                    property: 'Ztime',
                    // format: 'hh:MM:ss',
                    width: 25
                });

                return aCols;
            },

            createColumnConfigFav: function () {
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
                    // type: EdmType.Time,
                    property: 'Ztime',
                    // format: 'hh:MM:ss',
                    width: 25
                });

                return aCols;
            },
        });
    });
