sap.ui.define(
    ["./BaseController", "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("todoapp.controller.NewTodo", {

            onInit: function () {
                this.getRouter().getRoute("NewTodo").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function () {
                const oModel = this.getModel();
                // oModel.oHeaders.Accept = "application/atom+xml,application/atomsvc+xml,application/xml";
                oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
            },

            _onMetadataLoaded: function () {

                this.getLastId();
                //Or
                // This Was used Before
                // this.getModel().read("/TODOSet/$count", {
                //     success: this._onNrEntriesFound.bind(this),
                //     error: function () {
                //         MessageToast.show('The backend comunicatione failed', {
                //             closeOnBrowserNavigation: false // This will prevent to be close when we navigate to the next View
                //         });
                //     }
                // });
            },

            _onNrEntriesFound: function (oResult) {
                const nrEntries = parseInt(oResult.Id);
                console.log("Nr of Entries : " + nrEntries);
                // Define default propert when the New entry will be created
                const oProperties = {
                    Id: nrEntries + 1,
                    Status: "1",
                    Title: "Dummy",
                    Description: "",
                    Endtime: ""
                };
                // Create a Context with the properties
                const oContext = this.getModel().createEntry("/TODOSet", {
                    properties: oProperties,
                    success: this._onCreateSuccess.bind(this), // This will be called when you submit to backend and it has ended successfully
                    error: this._onCreateError.bind(this)
                });
                // console.log(oContext);
                // Bind the Context to the actual View
                this.getView().setBindingContext(oContext);
            },



            _onCreateSuccess: function (oProduct) { // The object created will be assigned here
                // console.log("Created: ", oProduct);
                // This will navigate to the details View for the new Object that is Created
                const sId = oProduct.Id;
                // console.log(sId);
                this.getRouter().navTo("RouteDetailView", {
                    id: sId
                }, true);
                // The object is unbinded from the View, to be on the Safe Side
                // this.getView().unbindObject(); // object will no longer will be shown
                // This will get a predefined text from the i18 file
                // const sMessage = this.getResourceBundle().getText("<i18TextPredefined>", [oProduct.Name]);
                MessageToast.show('The TODO is Created!', {
                    closeOnBrowserNavigation: false // This will prevent to be close when we navigate to the next View
                });
            },

            _onCreateError: function (oError) {
                // console.log("Error Service");
                MessageToast.show(oError.message);
            },

            getLastId: function () {
                var oModel = this.getModel();

                oModel.callFunction("/GetLastId", { // function import name
                    method: "GET", // http method
                    success: this._onNrEntriesFound.bind(this), // callback function for success       
                    // success: function (oData, response) {
                    //     // this.getView().setBusy(false);

                    //     console.log("Response: ", response);
                    //     console.log("Function Import Success!");
                    // }, // callback function for success
                    error: function (oError) {
                        console.log("Function Import Error!");
                    } // callback function for error
                });

            },
            onSave: function () {
                this.getModel().submitChanges(); // This will submit the data on backend
            },

            goBack: function () {
                this.onNavBack();
            }

        });
    });