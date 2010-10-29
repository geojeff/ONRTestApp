// ==========================================================================
// Project:   ONRTestApp.authorsController
// ==========================================================================
/*globals ONRTestApp */

/** @class

  The controller for a list of authors.

  @extends SC.ArrayController
*/
ONRTestApp.authorsController = SC.ArrayController.create(SC.CollectionViewDelegate,
/** @scope ONRTestApp.authorsController.prototype */ {
	allowMultipleSelection: YES,
	all: null,
	selection: null,
	_observingAuthors: [],
	allDidChange: function(){
	  if (!this.get("selection")) {
      this.set("effectiveSelection", this.get("all"));
      this.set("allIsSelected", YES);
    } else {
      this.recalculateFromAuthors();
    }
	}.observes("all", "[]"),

	selectAllAuthorsItem: function(){
	  this.set("selection", null);
	  this.set("effectiveSelection", this.get("all"));
	  this.set("allIsSelected", YES);
	},

	selectionDidChange: function() {
	  this.recalculateFromAuthors();
	}.observes("selection"),

	recalculateFromAuthors: function() {
	  if (this.get("selection") && this.get("selection").get("length") > 0) {
	    var result = SC.Set.create();
      var books = [];
	    this.get("selection").forEach(function(author){
        console.log('author: ' + author.get('lastName') + ' books.length: ' + author.get('books').get('length'));
        books.pushObjects(author.get("books"));
	      result.addEach(author.get("books"));
	    });

      books.forEach(function(book) {
        console.log('title: ' + book.get('title'));
      });
	    this.set("effectiveSelection", books);
      //this.set("effectiveSelection", result.toArray());
	    this.set("allIsSelected", NO);
    }
	},

	collectionViewDeleteContent: function(view, content, indexes) {
	  this._pendingOperation = { action: "deleteAuthors", indexes: indexes  };
	  SC.AlertPane.warn(
	    "Be Careful!",
	    "Are you sure you want to delete these " + indexes.get("length") + " authors?",
	    null,
	    "Keep Authors",
	    "Delete Authors",
	    null,
	    this
	  );
	},

	deleteAuthors: function(op)
	{
	  var indexes = op.indexes;
	  var records = indexes.map(function(idx) {
	    return this.objectAt(idx);
	  }, this);
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

	addAuthor: function() {
	  var author;
	  author = ONRTestApp.store.createRecord(ONRTestApp.Author, { "firstName": "New", "lastName": "Author" });
	  this.selectObject(author);
	  this.invokeLater(function(){
	    var contentIndex = this.indexOf(author);
	    var list = ONRTestApp.mainPage.getPath("mainPane.splitter.topLeftView.authorList.contentView");
	    var listItem = list.itemViewForContentIndex(contentIndex);
	    listItem.beginEditing();
	  });
	},

	removeBooks: function(books) {
	  var sel = this.get("selection");
	  if (!sel) return;

	  sel.forEach(function(item) {
	    item.get("books").removeObjects(books);
	  });
	  ONRTestApp.store.commitRecords();
	},

	addNewBook: function(book) {
	  var sel = this.get("selection");
	  if (!sel) return;
	  var pa = [];
	  sel.forEach(function(item) {
	    pa.push(item);
	  });
	  book.set("pendingAuthors", pa);
	},

  checkAuthorsFunction: function(book){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          // In this loop we will use the key mapping from the bookController
          // to set the relations into authors, while at the same time, preparing
          // key mappings for this controller, for symmetry with the other controllers,
          // (in case there is a need in the future).
          var fixturesKeysToRiakKeysForBooks = ONRTestApp.booksController.get('fixturesKeysToRiakKeys');
          var fixturesKeysToRiakKeysForAuthors = {};
          var authorRecord;
          for (fixturesKey in me._tmpRecordCache) {
            authorRecord = me._tmpRecordCache[fixturesKey];
            fixturesKeysToRiakKeysForAuthors[fixturesKey] = authorRecord.get('key');

            var booksInAuthor = authorRecord.get('books');
            // fixturedKeys are integers, and we can use them as indices to into FIXTURES arrays.
            ONRTestApp.Author.FIXTURES[fixturesKey-1].books.forEach(function(bookFixturesKey) {
              var bookRiakKey = fixturesKeysToRiakKeysForBooks[bookFixturesKey];
              booksInAuthor.pushObject(ONRTestApp.store.find(SC.Query.local(ONRTestApp.Book, bookRiakKey)));
            });
          }

          me.set('fixturesKeysToRiakKeys', fixturesKeysToRiakKeysForAuthors);

          delete me._tmpRecordCache;

          ONRTestApp.store.commitRecords();
        }
        return YES;
      }
      else return NO;
    };
  },

  createAuthors: function(){
    this._tmpRecordCount = ONRTestApp.Author.FIXTURES.get('length');
    for (var i=0,len=ONRTestApp.Author.FIXTURES.get('length'); i<len; i++){
      var author;
      author = ONRTestApp.store.createRecord(ONRTestApp.Author, {
        "key":       ONRTestApp.Author.FIXTURES[i].key,
        "firstName": ONRTestApp.Author.FIXTURES[i].firstName,
        "lastName":  ONRTestApp.Author.FIXTURES[i].lastName,
      });

      this._tmpRecordCache[ONRTestApp.Author.FIXTURES[i].key] = author;

      author.addFiniteObserver('status',this,this.checkAuthorsFunction(author),this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCache: {},
  _tmpRecordCount: 0

}) ;
