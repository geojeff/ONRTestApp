// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.ISBN
// ==========================================================================
/*globals ONRTestApp*/

/** 

   @author Jeff Pittman
*/

ONRTestApp.ISBN = SC.Record.extend({
  primaryKey:  'key',
  bucket:      'isbn',
  type:        SC.Record.attr(String),
  text:        SC.Record.attr(String),

  book: SC.Record.toOne("ONRTestApp.Book", 
                        { inverse: "isbns", isMaster: NO })
});
