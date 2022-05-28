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

        const oParameters = oEvent.getParameters();
        const sId = oParameters.arguments.id; // Yay! Our route name!
        this.id = sId;

        const oModel = this.getModel();
        oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
      },

      _onMetadataLoaded: function () {

        // const oContext = this.getView().getBindingContext();
        // console.log(oContext, this.id);

        const oModel = this.getModel();
        const oView = this.getView();

        oModel.read(`/TODOSet(` + this.id + `)`, {
          success: function (oData) {
            const oModelNew = new sap.ui.model.json.JSONModel(oData);

            // console.log(oData, oModelNew);
            oView.setModel(oModelNew, 'TODO')
          }
        });

      },

      goBack: function () {
        this.onNavBack();
      }

    });
  }
);