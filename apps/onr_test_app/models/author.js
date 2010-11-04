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
  idFixtures:  null,
  firstName:   SC.Record.attr(String),
  lastName:    SC.Record.attr(String),

  fullName: function(key, value) {
    if (value !== undefined) {
      var parts = value.split(' '); // parse full name
      this.set('firstName', parts[0]);
      this.set('lastName', parts[1]);
    }

    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName').cacheable(),

  books: SC.Record.toMany("ONRTestApp.Book", { inverse: "author", isMaster: YES })

});
