// ==========================================================================
// Project:   ONRTestApp.bookController
// ==========================================================================
/*globals ONRTestApp */

/** @class

  The controller for a single book.

  @extends SC.Object
*/
ONRTestApp.bookController = SC.ObjectController.create(
/** @scope ONRTestApp.bookController.prototype */ {
	contentBinding: "ONRTestApp.booksController.selection",
	contentBindingDefault: SC.Binding.single(),

	isEditing: NO,

	contentDidChange: function() {
	  if (this.get("content")) this.set("shouldDisplay", YES);
	  else this.set("shouldDisplay", NO);
	}.observes("content"),

	beginEditing: function() {
		this.set("isEditing", YES);
		ONRTestApp.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.bookView.contentView.form").beginEditing();
	},

	endEditing: function() {
		this.set("isEditing", NO);
		ONRTestApp.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.bookView.contentView.form").commitEditing();
		ONRTestApp.store.commitRecords();
	},

//  hasCharacterInTitleFunctionCreator: function(char){
//    var title = this.get('content').get('title');
//    return function(){
//      return (title.indexOf(char)!= -1);
//    }
//  },
//
//  hasBookTypeFunctionCreator: function(type){
//    var versions = this.get('content').get('versions');
//    return function(){
//      versions.forEach(function(version) {
//        if (version.get('format') === type) {
//          return YES;
//        }
//      });
//
//      return NO;
//    }
//  },
//
//  hasHardbackVersion: this.hasBookTypeFunctionCreator('hardback'),
//  hasPaperbackVersion: this.hasBookTypeFunctionCreator('paperback'),
//  hasMediaVersion: this.hasBookTypeFunctionCreator('media'),
//
//  hasColonInTitle: this.hasCharacterInTitleFunctionCreator(':'),
//  hasOpenParenthesisInTitle: this.hasCharacterInTitleFunctionCreator('(')
});

