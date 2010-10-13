// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.Book
// ==========================================================================
/*globals ONRTestApp*/

/** 

   @author Jeff Pittman
*/

ONRTestApp.Book = SC.Record.extend({
  primaryKey:  'key',
  bucket:      'book',
  title:  SC.Record.attr(String),
  author:       SC.Record.attr(String),
  nationality:     SC.Record.attr(String),

  // computed property (recalculates when author or nationality changes):
  authorship: function(){
    return this.getEach('author', 'nationality').compact().join(' ');
  }.property('author', 'nationality').cacheable(),
  
  // relations:
  versions: SC.Record.toMany("ONRTestApp.Version", 
                             { inverse: "book", isMaster: YES })
});
