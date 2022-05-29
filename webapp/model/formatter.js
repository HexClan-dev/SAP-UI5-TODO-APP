sap.ui.define([], function () {
    "use strict";
    return {
        getStatus: function (value) {
            console.log(value);
            if (value === "1") {
                return "sap-icon://decline";
            } else if (value === "2") {
                return "sap-icon://accept";
            } else {
                return "sap-icon://lock"
            }
        }
    };
});