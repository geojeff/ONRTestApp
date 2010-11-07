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

  contentBinding: "ONRTestApp.authorsController.gatheredBooks",
  selection: null,
  gatheredVersions: null,
  canAddContent: YES,
  canReorderContent: NO,
  canRemoveContent: YES,
  isEditable: YES,

  // deleting books is handled by booksController.
  // removing books from authors is handled by the authorController.
  inAll: YES, // can be NO or YES. If YES, the parent controller is called to remove items.
  inAllBinding: "ONRTestApp.authorsController.allIsSelected",

  selectionDidChange: function() {
    this.gatherVersions();
	}.observes("selection"),

	gatherVersions: function() {
    var books, versions;

    books= this.get("selection");
	  if (!SC.none(books)) {
	    versions = SC.Set.create();
	    books.forEach(function(book){
	      book.get("versions").forEach(function(version) {
          versions.add(version);
        });
	    });

      this.set("gatheredVersions", versions.toArray());
      var fo = versions.firstObject();
      if (!SC.none(fo)) {
        fo.addFiniteObserver('status',this,this.generateSelectVersionFunction(fo),this);
      }
    }
	},

  generateSelectVersionFunction: function(version) {
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        if (!ONRTestApp.versionsController.hasSelection()) {
          ONRTestApp.versionsController.selectObject(version);
        }
      }
    };
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
    if (this.get("inAll") || !ONRTestApp.authorsController.isSingleSelection()) return;

    var book, bookKey = ONRTestApp.nextRecordKey();

    book = ONRTestApp.store.createRecord(ONRTestApp.Book, {
      //"key":         bookKey,
      "fixturesKey": bookKey,
      "title":       'title'
    });

    ONRTestApp.store.commitRecords();
    
    // Once the book records come back READY_CLEAN, add book to current author.
    book.addFiniteObserver('status',this,this.generateCheckBookFunction(book),this);
  },

  generateCheckBookFunction: function(book) {
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        ONRTestApp.authorsController.addNewBook(book);

        me.selectObject(book);

        me.invokeLater(function(){
          // Editing of a book title is not done in the book list, but in the panel on the right.
          ONRTestApp.bookController.beginEditing();
        });

        // this has already been done, eh?
        //book.commitRecord();
      }
    }
  },

  generateCheckBooksFunction: function(book){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        ONRTestApp.bumpBookCount();
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          var bookRecords = ONRTestApp.store.find(ONRTestApp.Book);
          var versionRecords = ONRTestApp.store.find(ONRTestApp.Version);
          bookRecords.forEach(function(bookRecord) {
            var fixturesKey = bookRecord.readAttribute('fixturesKey');

            //var versionRecords = ONRTestApp.store.find(SC.Query.local({
              //recordType: ONRTestApp.Version,
              //conditions: "fixturesKey ANY {id_fixtures_array}",
              //parameters: { id_fixtures_array: ONRTestApp.Book.FIXTURES[fixturesKey-1].versions }
            //}));

            var versionRecordsForBook = [];
            versionRecords.forEach(function(versionRecord) {
              if (ONRTestApp.Book.FIXTURES[fixturesKey-1].versions.indexOf(versionRecord.readAttribute('fixturesKey')) !== -1) {
                versionRecordsForBook.pushObject(versionRecord);
              }
            });

            bookRecord.get('versions').pushObjects(versionRecordsForBook);
          });

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
        //"key":         ONRTestApp.Book.FIXTURES[i].key,
        "fixturesKey": ONRTestApp.Book.FIXTURES[i].key,
        "title":       ONRTestApp.Book.FIXTURES[i].title
      });

      this._tmpRecordCache.push(ONRTestApp.Book.FIXTURES[i].id);
      
      // The book record has been created, and its versions and the reviews of those versions.
      // Once the book records come back READY_CLEAN, create authors in the final step.
      book.addFiniteObserver('status',this,this.generateCheckBooksFunction(book),this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCache: [],
  _tmpRecordCount: 0

});

