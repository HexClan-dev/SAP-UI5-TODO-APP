sap.ui.define(
  ["./BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("todoapp.controller.DetailView", {

      id: '',

      onInit: function () {
        this.getRouter().getRoute("RouteDetailView").attachPatternMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {

        // const oParameters = oEvent.getParameters();
        // const sId = oParameters.arguments.id; // Yay! Our route name!
        // this.id = sId;

        var sId = oEvent.getParameter("arguments").id;

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
            dataRequested: function () {
              console.log("Data Requested");
            },
            dataReceived: function () {
              console.log("Data received");
            }
          }
        });
      },

      _onBindingChange: function () {
        var oView = this.getView(),
          oElementBinding = oView.getElementBinding();

        console.log(oElementBinding);
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

      goBack: function () {
        this.onNavBack();
      }

    });
  }
);