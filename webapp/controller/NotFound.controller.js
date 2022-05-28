sap.ui.define([
  "./BaseController"
], function (Controller) {
  "use strict";

  return Controller.extend("todoapp.controller..NotFound", {

    onInit: function () {
      this.getRouter().getTarget("notFound").attachDisplay(this._onNotFoundDisplayed, this);
    },

    _onNotFoundDisplayed: function () {
      console.log("Thisis the  Not found Controller");
    },

    goBack: function () {
      this.onNavBack();
    }

  });
});