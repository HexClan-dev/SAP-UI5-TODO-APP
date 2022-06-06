sap.ui.define([
        "./BaseController",
        "../model/formatter",
        "sap/ui/Device",
        "sap/m/MessageToast",
        "sap/m/Dialog",
        "sap/m/Button",
        "sap/m/Text",
        "sap/m/library"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, Device, MessageToast, Dialog, Button, Text, mobileLibrary) {
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
            },

            onPressDelete: function () {
                var oList = this.byId("mainList");
                var items = oList.getSelectedItems();

                // console.log(items);
                if (items.length === 0) {
                    MessageToast.show('Please select the line you want to delete!');
                    return;
                }


                const oModel = this.getView().getModel();

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var context = item.getBindingContext();

                    // console.log("Context : ", context.sPath);
                    const sPath = context.sPath;

                    var obj = context.getProperty(null, context);
                    // console.log("Object : ", obj);

                    this.onApproveDialogPress("Do you want to delete : " + obj.Title + " ?", function () {
                        oModel.remove(sPath, {
                            success: function (data) {
                                // success handling
                                MessageToast.show('The Todo : ' + obj.Title + " is deleted ! ");
                            },
                        });

                        oModel.submitChanges();
                    }.bind(this), function () {
                        MessageToast.show('The Todo : ' + obj.Title + " is cancelled ! ");
                    }.bind(this));

                }
            }

        })
    });