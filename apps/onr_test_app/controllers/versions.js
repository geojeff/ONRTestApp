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

  contentBinding: "ONRTestApp.booksController.gatheredVersions",
  gatheredReviews: null,
  selection: null,

  selectionDidChange: function() {
    this.gatherReviews();
  }.observes("selection"),

  gatherReviews: function() {
    var versions, reviews;

    versions = this.get("selection");
    if (!SC.none(versions)) {
      reviews = SC.Set.create();
      this.get("selection").forEach(function(version){
        version.get("reviews").forEach(function(review) {
          reviews.add(review);
        });
      });

      this.set("gatheredReviews", reviews.toArray());
    }
  },

  deleteVersions: function(op) {
    var records = op.records, indexes = op.indexes;
    records.invoke('destroy');

    var selIndex = indexes.get('min') - 1;
    if (selIndex < 0) selIndex = 0;
    this.selectObject(this.objectAt(selIndex));

    ONRTestApp.store.commitRecords();
  },

  alertPaneDidDismiss: function(pane, status) {
    if (!this._pendingOperation) return;
    switch (status) {
      case SC.BUTTON2_STATUS:
        this[this._pendingOperation.action].call(this, this._pendingOperation);
        this._pendingOperation = null;
        break;
      case SC.BUTTON1_STATUS:
        break;
    }
  },

  addVersion: function() {
    var version;

    version = ONRTestApp.store.createRecord(ONRTestApp.Version, {
      "title":       'title'
    });

    ONRTestApp.store.commitRecords();

    // Once the book records come back READY_CLEAN, add book to current book.
    version.addFiniteObserver('status',this,this.generateCheckVersionFunction(book),this);
  },

  generateCheckVersionFunction: function(version) {
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        ONRTestApp.booksController.addNewVersion(version);

        me.selectObject(version);

        me.invokeLater(function(){
          ONRTestApp.versionController.beginEditing();
        });

        // this has already been done, eh?
        //version.commitRecord();
      }
    }
  },

  addNewReview: function(review) {
    var sel = this.get("selection");
    if (!sel) return;
    review.set("version", sel.firstObject());
    sel.firstObject().get('reviews').pushObject(review);

    this.gatherReviews();
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

          var versionRecords = ONRTestApp.store.find(ONRTestApp.Version);
          var reviewRecords = ONRTestApp.store.find(ONRTestApp.Review);
          versionRecords.forEach(function(versionRecord) {
            var fixturesKey = versionRecord.readAttribute('fixturesKey');

            console.log('fixturesKey ' + fixturesKey);
            //var reviewRecords = ONRTestApp.store.find(SC.Query.local({
              //recordType: ONRTestApp.Review,
              //conditions: "fixturesKey ANY {id_fixtures_array}",
              //parameters: { id_fixtures_array: ONRTestApp.Version.FIXTURES[fixturesKey-1].reviews }
            //}));
            var reviewRecordsForVersion = [];
            reviewRecords.forEach(function(reviewRecord) {
              if (ONRTestApp.Version.FIXTURES[fixturesKey-1].reviews.indexOf(reviewRecord.readAttribute('fixturesKey')) !== -1) {
                reviewRecordsForVersion.pushObject(reviewRecord);
              }
            });

//            reviewRecordsForVersion.forEach(function(reviewRecord) {
//              console.log('rr = ' + SC.inspect(reviewRecord));
//            });
//            console.log('reviewRecords set ' + reviewRecordsForVersion.get('length'));
            versionRecord.get('reviews').pushObjects(reviewRecordsForVersion);
          });

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
        //"key":             fixturesKey,
        "fixturesKey":     fixturesKey,
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

      // this.generateCheckVersionsFunction is provided to create the function that
      // checks for READY_CLEAN for all versions for a given book. When all such 
      // versions are READY_CLEAN, in turn, createBook(), the last step in 
      // the data creation scheme, is fired.
      version.addFiniteObserver('status',this,this.generateCheckVersionsFunction(version),this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCount: 0

});
        
