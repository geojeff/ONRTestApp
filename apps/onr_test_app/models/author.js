// ==========================================================================
// Project:   ONRTestApp.Author
// ==========================================================================
/*globals ONRTestApp */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
ONRTestApp.Author = SC.Record.extend(
/** @scope ONRTestApp.Author.prototype */ {
  primaryKey:  'key',
  bucket:      'author',
  firstName:   SC.Record.attr(String),
  lastName:    SC.Record.attr(String),

  fullName: function() {
    var val = (this.get("firstName") || "") + " " + (this.get("lastName") || "");
    return val;
  }.property('firstName', 'lastName').cacheable(),

  books: SC.Record.toMany("ONRTestApp.Book", { inverse: "author", isMaster: YES })

});
