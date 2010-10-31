// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.Book
// ==========================================================================
/*globals ONRTestApp*/

/**

 @author Jeff Pittman
 */

ONRTestApp.Book = SC.Record.extend(
/** @scope ONRTestApp.Book.prototype */ {
  primaryKey:  'key',
  bucket:      'book',
  id:          SC.Record.attr(Number),
  idFixtures:  null,
  title:       SC.Record.attr(String),

  // relations:
  author:   SC.Record.toOne("ONRTestApp.Author", { inverse: "book", isMaster: NO }),
  versions: SC.Record.toMany("ONRTestApp.Version", { inverse: "book", isMaster: YES }),

	searchRelevance: 0, // a property that others may use
	searchTitle: "", // has things like <strong>The</strong> Search Term.

	/* Sync stuff */
	destroy: function() {
	  this.get("authors").forEach(function(author){
	    author.get("books").removeObject(this);
	    author.commitRecord();
	  }, this);
	  sc_super();
	},

	pendingAuthors: [],
	storeDidChangeProperties: function() {
	  sc_super();
	  if (this.get("guid")) {
	    if (this.get("pendingAuthors") && this.get("pendingAuthors").get("length") > 0) {
	      this.get("pendingAuthors").forEach(function(item){
	        item.get("books").pushObject(this);
	      }, this);
	      this.set("pendingAuthors", []);
	      ONRTestApp.store.commitRecords();
	    }
	  }
	}
});
