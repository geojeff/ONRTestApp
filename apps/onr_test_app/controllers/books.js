// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.booksController
// ==========================================================================
/*globals ONRTestApp*/

/** 

This controller manages book data.

   @extends SC.ArrayController
   @author Jeff Pittman
*/
ONRTestApp.booksController = SC.ArrayController.create(
/** @scope ONRTestApp.booksController.prototype */ {

  contentBinding: "ONRTestApp.authorsController.effectiveSelection",
  selection: null,
  effectiveSelection: null,
  canAddContent: YES,
  canReorderContent: NO,
  canRemoveContent: YES,
  isEditable: YES,

  // deleting books is handled by booksController.
  // removing books from authors is handled by the authorController.
  inAll: YES, // can be NO or YES. If YES, the parent controller is called to remove items.
  inAllBinding: "ONRTestApp.authorsController.allIsSelected",

  selectionDidChange: function() {
	  this.recalculateFromBooks();
	}.observes("selection"),

	recalculateFromBooks: function() {
	  if (this.get("selection") && this.get("selection").get("length") > 0) {
	    var result = SC.Set.create();
	    this.get("selection").forEach(function(book){
	      book.get("versions").forEach(function(version) {
          result.add(version);
        });
	    });

      this.set("effectiveSelection", result.toArray());
    }
	},

  collectionViewDeleteContent: function(view, content, indexes) {
    // get records first for safety :)
    var records = indexes.map(function(idx) {
      return this.objectAt(idx);
    }, this);

    // we only handle deletion if in "All" category.
    if (!this.get("inAll")) {
      ONRTestApp.authorsController.removeBooks(records);
      return;
    }

    // process OUR WAY!
    this._pendingOperation = { action: "deleteBooks", records: records, indexes: indexes  };

    // calculate text
    var text = "";
    var name = "Book";
    var len = indexes.get("length");
    if (len > 1) {
      name += "s";
      text = "Are you sure you want to delete these " + len + " books?";
    } else {
      text = "Are you sure you want to delete this book?";
    }

    // show warning
    SC.AlertPane.warn(
      "Be Careful!",
      text,
      null,
      "Keep " + name,
      "Delete " + name,
      null,
      this
    );
  },

  deleteBooks: function(op) {
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

  addBook: function() {
    var book;
    book = ONRTestApp.store.createRecord(ONRTestApp.Book, { title: "" });

    // add book to current author if needed
    if (!this.get("inAll")) ONRTestApp.authorsController.addNewBook(book);

    this.selectObject(book);
    this.invokeLater(function(){
      ONRTestApp.bookController.beginEditing();
    });

    book.commitRecord();
  },

  getBook: function(fixturesKey) {
     return this._tmpRecordCache[fixturesKey];
   },

  checkBooksFunction: function(book){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          // In this loop we will use the key mapping from the versionController
          // to set the relations into books, while at the same time, preparing
          // key mappings for this controller, readying for the call to createAuthors.
          var fixturesKeysToRiakKeysForVersions = ONRTestApp.versionsController.get('fixturesKeysToRiakKeys');
          var fixturesKeysToRiakKeysForBooks = {};
          var bookRecord;
          for (fixturesKey in me._tmpRecordCache) {
            bookRecord = me._tmpRecordCache[fixturesKey];
            fixturesKeysToRiakKeysForBooks[fixturesKey] = bookRecord.get('key');

            var versionsInBook = bookRecord.get('versions');
            // fixturedKeys are integers, and we can use them as indices to into FIXTURES arrays.
            ONRTestApp.Book.FIXTURES[fixturesKey-1].versions.forEach(function(versionFixturesKey) {
              //var versionRiakKey = fixturesKeysToRiakKeysForVersions[versionFixturesKey];
              //versionsInBook.pushObject(ONRTestApp.store.find(SC.Query.local(ONRTestApp.Version, versionRiakKey)));
              versionsInBook.pushObject(ONRTestApp.versionsController.getVersion(versionFixturesKey));
            });
          }

          me.set('fixturesKeysToRiakKeys', fixturesKeysToRiakKeysForBooks);

          //delete me._tmpRecordCache;

          ONRTestApp.store.commitRecords();

          ONRTestApp.authorsController.createAuthors();
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createBooks: function(){
    this._tmpRecordCount = ONRTestApp.Book.FIXTURES.get('length');

    for (var i=0,len=ONRTestApp.Book.FIXTURES.get('length'); i<len; i++){
      var book;
      book = ONRTestApp.store.createRecord(ONRTestApp.Book, {
        "key":      ONRTestApp.Book.FIXTURES[i].key,
        "title":    ONRTestApp.Book.FIXTURES[i].title,
      });

      this._tmpRecordCache[ONRTestApp.Book.FIXTURES[i].key] = book;
      
      // The book record has been created, and its versions and the reviews of those versions.
      // Once the book records come back READY_CLEAN, create authors in the final step.
      book.addFiniteObserver('status',this,this.checkBooksFunction(book),this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCache: {},
  _tmpRecordCount: 0

});

