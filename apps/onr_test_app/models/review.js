// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.Review
// ==========================================================================
/*globals ONRTestApp*/

/** 

   @author Jeff Pittman
*/

ONRTestApp.Review = SC.Record.extend(
/** @scope ONRTestApp.Review.prototype */ {
  primaryKey:  'key',
  bucket:      'review',
  text:        SC.Record.attr(String),

  version: SC.Record.toOne("ONRTestApp.Version",  { inverse: "reviews", isMaster: NO })

});
