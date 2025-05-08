sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  return Controller.extend("converted.productcatalogview_497fview.controller.ProductCatalogView_497fView", {

    onInit: function () {
      // Initialize the view
      this._initializeView();

      // Set message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [{
          type: MessageType.Success,
          title: "System Information",
          description: "Application converted successfully from WebDynpro",
          subtitle: "Conversion complete",
          counter: 1
        }]
      });
      this.getView().setModel(oMessageModel, "messages");
    },

    /**
     * Initializes the view by setting up the necessary models.
     * @private
     */
    _initializeView: function () {
      // Load products data from mock data
      var oProductsModel = new JSONModel();
      oProductsModel.loadData("./model/mockData/products.json");
      this.getView().setModel(oProductsModel, "products");

      // Set device model (if not already set in Component.js)
      if (!this.getOwnerComponent().getModel("device")) {
        var oDeviceModel = new JSONModel(sap.ui.Device);
        oDeviceModel.setDefaultBindingMode("OneWay");
        this.getOwnerComponent().setModel(oDeviceModel, "device");
      }
    },

    /**
     * Handles the search functionality.
     * @param {sap.ui.base.Event} oEvent The search event object.
     */
    onSearch: function (oEvent) {
      var sSearchTerm = this.getView().byId("searchField").getValue();
      MessageToast.show("Searching for: " + sSearchTerm);

      // Implement your search logic here. For example, you can filter the product list based on the search term.
    },

    /**
     * Handles adding a product to the cart.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onAddToCart: function (oEvent) {
      var oProduct = oEvent.getSource().getBindingContext("products").getObject();
      MessageToast.show("Adding product to cart: " + oProduct.ProductID);

      // Implement your add to cart logic here.
    },

    /**
     * Handles navigating to the previous page.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onPreviousPage: function (oEvent) {
      MessageToast.show("Navigating to previous page");

      // Implement your pagination logic here.
    },

    /**
     * Handles navigating to the next page.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onNextPage: function (oEvent) {
      MessageToast.show("Navigating to next page");

      // Implement your pagination logic here.
    },

    /**
     * Opens the message popover.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    },

    /**
     * Closes a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    closeDialog: function (oEvent) {
      var oDialog = oEvent.getSource().getParent();
      oDialog.close();
    },

    /**
     * Handles the confirmation of a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onDialogConfirm: function (oEvent) {
      MessageToast.show("Dialog confirmed");
      this.closeDialog(oEvent);
    },

    /**
     * Handles the cancellation of a dialog.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onDialogCancel: function (oEvent) {
      this.closeDialog(oEvent);
    }
  });
});
