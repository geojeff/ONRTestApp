// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.booksController
// ==========================================================================
/*globals ONRTestApp*/

/** 

This controller manages the creation of book data.

   @extends SC.ArrayController
   @author Jeff Pittman
*/
ONRTestApp.booksController = SC.ArrayController.create(
/** @scope ONRTestApp.booksController.prototype */ {

  // See comments in the other controllers about the use of closures.
  generateSetRelationsFunction: function(title){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        //console.log('setting relations for Book ' + title);
        me._tmpRecordCache[title].pushObject(book);
        me._tmpRecordCacheCount[title]--;
        if (me._tmpRecordCacheCount[title] === 0){
          delete me._tmpRecordCache[title]; // delete the old contents
          delete me._tmpRecordCacheCount[title];

          var book = ONRTestApp.dataController.get('content')[title]['records']['book'];

          var versions = ONRTestApp.dataController.get('content')[title]['records']['versions'];
          var versionsInBook = book.get('versions');
          versionsInBook.pushObjects(versions);

          ONRTestApp.store.commitRecords();
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createBook: function(title){
    //console.log('createBook ' + title);
    var key = ONRTestApp.dataController.get('content')[title]['key'];
    var authorship = ONRTestApp.dataController.get('content')[title]['authorship'];

    this._tmpRecordCache[title] = [];
    this._tmpRecordCacheCount[title] = 1;
        
    var book;
    book = ONRTestApp.store.createRecord(ONRTestApp.Book, {
      "key":         key,
      "title":       title,
      "author":      authorship.author,
      "nationality": authorship.nationality
    });

    ONRTestApp.store.commitRecords();

    ONRTestApp.dataController.get('content')[title]['records']['book'] = book;

    // The book record has been created, and its versions and the isbns of those
    // versions, so all that is left is the setting of relations between them,
    // once the book record comes back READY_CLEAN.
    book.addFiniteObserver('status',this,this.generateSetRelationsFunction(title),this);

    return book;
  },

  // See comments in other controllers about the use of these variables.
  _tmpRecordCache: {},
  _tmpRecordCacheCount: {}

});

