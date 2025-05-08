sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, JSONModel) {
  "use strict";

  return UIComponent.extend("converted.productcatalogview_497fview.Component", {

    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app
     */
    init: function () {
      // Call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // Set device model
      this.setModel(new JSONModel({
        isTouch: Device.support.touch,
        isNoTouch: !Device.support.touch,
        isPhone: Device.system.phone,
        isNotPhone: !Device.system.phone,
        listMode: Device.system.phone ? "None" : "SingleSelectMaster",
        listItemType: Device.system.phone ? "Active" : "Inactive"
      }), "device");

      // Load product data from mock data
      var oProductsModel = new JSONModel();
      oProductsModel.loadData("./model/mockData/products.json");
      this.setModel(oProductsModel, "products");


      // Create the views based on the url/hash
      this.getRouter().initialize();
    }
  });
});
