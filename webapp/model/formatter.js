sap.ui.define([], function () {
    "use strict";
    return {


        getStatusColor: function (value) {
            if (value === "2") {
                return "Success";
            } else {
                return "Error";
            }
        },

        getStatusText: function (value) {
            if (value === "2") {
                return "Done";
            } else {
                return "TODO";
            }
        },


        getStatus: function (value) {
            // console.log(value);
            if (value === "1") {
                return "sap-icon://lateness";
                // return "sap-icon://decline";
            } else if (value === "2") {
                return "sap-icon://accept";
            } else {
                return "sap-icon://lock"
            }
        }
    };
});