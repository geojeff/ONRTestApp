// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.Version
// ==========================================================================
/*globals ONRTestApp*/

/** 

   @author Jeff Pittman
*/

ONRTestApp.Version = SC.Record.extend(
/** @scope ONRTestApp.Version.prototype */ {
  primaryKey:  'key',
  bucket:      'version',
  format:      SC.Record.attr(String),
  language:    SC.Record.attr(String),
  rank:        SC.Record.attr(Number),
  height:      SC.Record.attr(Number),
  width:       SC.Record.attr(Number),
  depth:       SC.Record.attr(Number),

  // Relations
  version: SC.Record.toOne("ONRTestApp.Version",  { inverse: "versions", isMaster: NO }),
  isbns: SC.Record.toMany("ONRTestApp.ISBN", { inverse: "book", isMaster: YES })
});
