// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.ISBN
// ==========================================================================
/*globals ONRTestApp*/

/** 

   @author Jeff Pittman
*/

ONRTestApp.ISBN = SC.Record.extend(
/** @scope ONRTestApp.ISBN.prototype */ {
  primaryKey:  'key',
  bucket:      'isbn',
  type:        SC.Record.attr(String),
  text:        SC.Record.attr(String),

  version: SC.Record.toOne("ONRTestApp.Version",  { inverse: "isbns", isMaster: NO })

});
