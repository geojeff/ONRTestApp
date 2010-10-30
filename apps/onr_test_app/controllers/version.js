// ==========================================================================
// Project:   ONRTestApp.versionController
// ==========================================================================
/*globals ONRTestApp */

/** @class

  The controller for a single version.

  @extends SC.Object
*/
ONRTestApp.versionController = SC.ObjectController.create(
/** @scope ONRTestApp.versionController.prototype */ {
	contentBinding: "ONRTestApp.versionsController.selection",
	contentBindingDefault: SC.Binding.single(),

	isEditing: NO,

	contentDidChange: function() {
	  if (this.get("content")) this.set("shouldDisplay", YES);
	  else this.set("shouldDisplay", NO);
	}.observes("content"),

	beginEditing: function() {
		this.set("isEditing", YES);
		ONRTestApp.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.bookView.contentView.versionView").beginEditing();
	},

	endEditing: function() {
		this.set("isEditing", NO);
		ONRTestApp.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.bookView.contentView.versionView").commitEditing();
		ONRTestApp.store.commitRecords();
	}

});

