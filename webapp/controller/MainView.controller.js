sap.ui.define([
        "./BaseController",
        "../model/formatter",
        "sap/ui/Device",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, Device) {
        "use strict";

        return Controller.extend("todoapp.controller.MainView", {

            formatter: formatter,

            onItemSelected: function (oEvent) {
                var bReplace = !Device.system.phone;

                const oItem = oEvent.getSource();
                const oBindingContext = oItem.getBindingContext();

                const oModel = this.getView().getModel();
                const Id = oModel.getProperty("Id", oBindingContext);

                this.getRouter().navTo("RouteDetailView", {
                    'id': Id
                }, bReplace);
            },

            onNewTODO: function () {
                this.getRouter().navTo('NewTodo');
            }

        });
    }
);