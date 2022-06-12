sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "todoapp/model/formatter",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/library"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param {typeof sap.ui.core.routing.History} History
   * @param {typeof sap.ui.core.UIComponent} UIComponent
   */
  function (Controller, History, UIComponent, formatter, Dialog, Button, Text, mobileLibrary) {
    "use strict";

    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

    return Controller.extend("todoapp.controller.BaseController", {
      formatter: formatter,

      onInit: function () {
        // this._initI18n();
      },

      _initI18n: function () {
        debugger; // break-point;

        // This will be useful to create a Translation file for each page/controller
        // The i18n folder must be created inside the controller folder
        var i18n = "i18n";
        //create bundle descriptor for this controllers i18n resource data
        var metadata = this.getMetadata(this);
        var nameParts = metadata.getName().split(".");
        nameParts.pop();
        nameParts.push(i18n);
        nameParts.push(i18n);
        var bundleData = {
          bundleName: nameParts.join(".")
        };

        //Use the bundledata to create or enhance the i18n model
        var i18nModel = this.getModel(i18n);
        if (i18nModel) {
          i18nModel.enhance(bundleData);
        } else {
          i18nModel = new ResourceModel(bundleData);
        }
        //set this i18n model.
        this.setModel(i18nModel, i18n);
      },

      /**
       * Convenience method for getting the view model by name in every controller of the application.
       * @public
       * @param {string} sName the model name
       * @returns {sap.ui.model.Model} the model instance
       */
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      /**
       * Convenience method for setting the view model in every controller of the application.
       * @public
       * @param {sap.ui.model.Model} oModel the model instance
       * @param {string} sName the model name
       * @returns {sap.ui.core.mvc.View} the view instance
       */
      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },

      /**
       * Convenience method for getting the resource bundle.
       * @public
       * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
       */
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      /**
       * Method for navigation to specific view
       * @public
       * @param {string} psTarget Parameter containing the string for the target navigation
       * @param {Object.<string, string>} pmParameters? Parameters for navigation
       * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
       */
      navTo: function (psTarget, pmParameters, pbReplace) {
        this.getRouter().navTo(psTarget, pmParameters, pbReplace);
      },

      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      onNavBack: function () {
        const sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          this.getRouter().navTo("RouteMainView", {}, true /* no history*/ );
        }
      },

      onApproveDialogPress: function (message, approve = () => {}, cancel = () => {}) {
        if (!this.oApproveDialog) {
          this.oApproveDialog = new Dialog({
            type: DialogType.Message,
            title: "Confirm",
            content: new Text({
              text: message
            }),
            beginButton: new Button({
              type: ButtonType.Emphasized,
              text: "Continue",
              press: function () {
                approve();
                this.oApproveDialog.close();
              }.bind(this)
            }),
            endButton: new Button({
              text: "Cancel",
              press: function () {
                cancel();
                this.oApproveDialog.close();
              }.bind(this)
            })
          });
        }

        this.oApproveDialog.open();
      },

      geti18Text: function (key, parameters = []) {
        if (!key) {
          return '';
        }

        // // retrieve the i18n resource bundle via the i18n model
        // var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
        // // retrieve the control via its id "button-id" from the controller's view
        // var oButton = this.byId("button-id");
        // // retrieve the i18n text via its key "bar" from the resource bundle
        // // and set it to the control
        // oButton.setText(oResourceBundle.getText("bar"));

        // This will get a predefined text from the i18 file
        return this.getResourceBundle().getText(key, parameters);
      }

    });
  }
);