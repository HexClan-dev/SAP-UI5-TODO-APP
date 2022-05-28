sap.ui.define([
        "./BaseController",
        "todoapp/model/formatter"

    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("todoapp.controller.MainView", {


            onItemSelected: function (oEvent) {
                var bReplace = !Device.system.phone;

                const oItem = oEvent.getSource();
                const oBindingContext = oItem.getBindingContext();

                const oModel = this.getView().getModel();
                const Id = oModel.getProperty("Id", oBindingContext);

                this.getRouter().navTo("RouteDetailView", {
                    'id': Id
                }, bReplace);
            }

        });
    }
);