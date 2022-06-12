sap.ui.define(
  ["./BaseController", "sap/m/MessageToast"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("todoapp.controller.DetailView", {

      onInit: function () {
        this.getRouter().getRoute("RouteDetailView").attachPatternMatched(this._onRouteMatched.bind(this), this);
      },

      _onRouteMatched: function (oEvent) {
        // const oParameters = oEvent.getParameters();
        // const sId = oParameters.arguments.id; // Yay! Our route name!
        // this.id = sId;
        const sId = oEvent.getParameter("arguments").id;
        // console.log("id: " + sId)

        this.getModel().metadataLoaded().then(function () {
          var sObjectPath = this.getModel().createKey("TODOSet", {
            Id: sId
          });

          this._bindView("/" + sObjectPath);
        }.bind(this));
        // const oModel = this.getModel();
        // oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
      },

      /**
       * Binds the view to the object path. Makes sure that detail view displays
       * a busy indicator while data for the corresponding element binding is loaded.
       * @function
       * @param {string} sObjectPath path to the object to be bound to the view.
       * @private
       */
      _bindView: function (sObjectPath) {
        // Set busy indicator during view binding
        // var oViewModel = this.getModel("detailView");
        // // If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
        // oViewModel.setProperty("/busy", false);

        this.getView().bindElement({
          path: sObjectPath,
          events: {
            change: this._onBindingChange.bind(this),
            dataRequested: function (oData) {
              console.log("Data Requested : ", oData);
            },
            dataReceived: function (oData) {
              console.log("Data received : ", oData);
            }
          }
        });
      },

      _onBindingChange: function () {
        var oView = this.getView(),
          oElementBinding = oView.getElementBinding();

        // console.log(oElementBinding);
        // No data for the binding
        if (!oElementBinding.getBoundContext()) {
          //TODO Display that the objecy you want to display does not exist
          this.getRouter().getTargets().display("notFound");
          // if object could not be found, the selection in the list
          // does not make sense anymore.
          // this.getOwnerComponent().oListSelector.clearListListSelection();
          return;
        }

        // const oPage = this.byId('detalInfor');
        // var sPath = oElementBinding.getPath();
        // oObject = oView.getModel().getObject(sPath);
        // oResourceBundle = this.getResourceBundle(),

        // oPage.bindElement(sPath);
        // sObjectId = oObject.Id,
        // sObjectName = oObject.Id,
        // oViewModel = this.getModel("detailView");

        // console.log(oObject);

        // this.getView().setModel(oObject, 'TODO');
        // oViewModel.setProperty("/shareSendEmailSubject",
        //   oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
        // oViewModel.setProperty("/shareSendEmailMessage",
        //   oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
      },

      _onMetadataLoaded: function () {

        // const oContext = this.getView().getBindingContext();
        // console.log(oContext, this.id);

        // const oModel = this.getModel();
        // const oView = this.getView();

        // oModel.read(`/TODOSet(` + this.id + `)`, {
        //   success: function (oData) {
        //     const oModelNew = new sap.ui.model.json.JSONModel(oData);

        //     // console.log(oData, oModelNew);
        //     oView.setModel(oModelNew, 'TODO')
        //   }
        // });

      },

      onChangeStatus: function () {

        var oModel = this.getModel();
        // find a way of getting the ID from the Model
        const oBindingContext = this.getView().getBindingContext();

        if (!oBindingContext) {
          MessageToast.show("Error while getting Binding!");
          return;
        }

        const oBindingObject = oBindingContext.getObject();

        // console.log("Binding Object: ", oBindingObject);
        // this.getView().setBusy(true);
        this.byId('chStatus').setEnabled(false);

        oModel.callFunction("/ChangeStatus", { // function import name
          method: "POST", // http method
          urlParameters: {
            "Id": oBindingObject.Id
          }, // function import parameters        
          success: this._onChangeStatusSuccess.bind(this), // callback function for success
          error: this._onChangeStatusError.bind(this)
        });

      },


      _onChangeStatusError: function (oError) {
        this.byId('chStatus').setEnabled(true);
        MessageToast.show("An Error Occured while chaing the Status !");
      },

      _onChangeStatusSuccess: function (oData, response) {
        this.byId('chStatus').setEnabled(true);
        MessageToast.show("The Status is changed Successfully!");

        // console.log("oData: ", oData)
        // console.log("Response: ", response)
        // console.log("Function Import Success!");
      },

      goBack: function () {
        this.onNavBack();
      },

      getBindingData: function () {
        // // retrieve the i18n resource bundle via the i18n model
        // var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

        // // retrieve the dynamic values from the OData model
        // var sState = this.getView().getModel("ODataModel").getProperty("/state");
        // var sDate = this.getView().getModel("ODataModel").getProperty("/date");

        // // switch the i18n text
        // // set the i18n text to the control via its key
        // // pass the dynamic arguments to the i18n text with parameters
        // this.byId("text2").setText(oResourceBundle.getText("fooBar"));
      }
    });
  }
);