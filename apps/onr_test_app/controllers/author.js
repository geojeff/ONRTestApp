// ==========================================================================
// Project:   ONRTestApp.authorController
// ==========================================================================
/*globals ONRTestApp */

/** @class

  The controller is bound to the booksController, because the authorsController allows
  multiselection and has the All item, which complicates the setting of its selection.
  This way a book is set here only when there has been a selection of an individual
  book.

  @extends SC.Object
*/
ONRTestApp.authorController = SC.ObjectController.create(
/** @scope ONRTestApp.authorController.prototype */ {
	contentBinding: "ONRTestApp.authorsController.selection",
  bookBinding: "ONRTestApp.booksController.selection.firstObject",
  book: null,

  update: function() {
    if (!SC.none(this.get('book'))) {
      console.log('setting ' + this.get('book'));
      console.log('setting ' + this.get('book').readAttribute('author'));
      this.set('content', this.get('book').readAttribute('author'));
    }
  }.observes('book')

});
