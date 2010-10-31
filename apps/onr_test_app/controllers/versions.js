// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.versionsController
// ==========================================================================
/*globals ONRTestApp*/

/** 

This controller manages the creation of version data.

   @extends SC.ArrayController
   @author Jeff Pittman
*/
ONRTestApp.versionsController = SC.ArrayController.create(
/** @scope ONRTestApp.versionsController.prototype */ {

  contentBinding: "ONRTestApp.booksController.effectiveSelection",
  effectiveSelection: null,
  selection: null,

  selectionDidChange: function() {
    this.recalculateFromVersions();
  }.observes("selection"),

  recalculateFromVersions: function() {
    if (this.get("selection") && this.get("selection").get("length") > 0) {
      var result = SC.Set.create();
      this.get("selection").forEach(function(version){
        version.get("reviews").forEach(function(review) {
          result.add(review);
        });
      });

      this.set("effectiveSelection", result.toArray());
    }
  },

  getVersion: function(fixturesKey) {
     return this._tmpRecordCache[fixturesKey];
   },

  // This is a closure, that will create an unnamed function, for checking
  // for completion of versions records. The generator function has version
  // as a passed-in argument, in scope for the generated function. The
  // 'var me = this;' line sets me so that there is also a reference to the
  // controller within the generated function.
  generateCheckVersionsFunction: function(version){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        ONRTestApp.bumpVersionCount();
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          // In this loop we will use the key mapping from the isbnController
          // to set the relations into versions, while at the same time, preparing
          // key mappings for this controller, readying for the call to createBooks.
          var versionRecord;
          for (fixturesKey in me._tmpRecordCache) {
            versionRecord = me._tmpRecordCache[fixturesKey];

            var reviewsInVersion = versionRecord.get('reviews');
            // fixturesKeys are integers, and we can use them as indices to into FIXTURES arrays.
            ONRTestApp.Version.FIXTURES[fixturesKey-1].reviews.forEach(function(isbnFixturesKey) {
              reviewsInVersion.pushObject(ONRTestApp.reviewsController.getReview(isbnFixturesKey));
            });
          }

          ONRTestApp.store.commitRecords();

          ONRTestApp.booksController.createBooks();
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createVersions: function(){
    this._tmpRecordCount = ONRTestApp.Version.FIXTURES.get('length');

    for (var i=0,len=ONRTestApp.Version.FIXTURES.get('length'); i<len; i++){
      var fixturesKey = ONRTestApp.Version.FIXTURES[i].key;
      var version;
      version = ONRTestApp.store.createRecord(ONRTestApp.Version, {
        "key":             ONRTestApp.Version.FIXTURES[i].key,
        "publisher":       ONRTestApp.Version.FIXTURES[i].publisher,
        "publicationDate": ONRTestApp.Version.FIXTURES[i].publicationDate,
        "format":          ONRTestApp.Version.FIXTURES[i].format,
        "pages":           ONRTestApp.Version.FIXTURES[i].pages,
        "language":        ONRTestApp.Version.FIXTURES[i].language,
        "rank":            ONRTestApp.Version.FIXTURES[i].rank,
        "height":          ONRTestApp.Version.FIXTURES[i].height,
        "width":           ONRTestApp.Version.FIXTURES[i].width,
        "depth":           ONRTestApp.Version.FIXTURES[i].depth,
        "isbn10":          ONRTestApp.Version.FIXTURES[i].isbn10,
        "isbn13":          ONRTestApp.Version.FIXTURES[i].isbn13
      });

      this._tmpRecordCache[fixturesKey] = version;

      // this.generateCheckVersionsFunction is provided to create the function that
      // checks for READY_CLEAN for all versions for a given book. When all such 
      // versions are READY_CLEAN, in turn, createBook(), the last step in 
      // the data creation scheme, is fired.
      version.addFiniteObserver('status',this,this.generateCheckVersionsFunction(version),this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCache: {},
  _tmpRecordCount: 0

});
        
