
// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.isbnsController
// ==========================================================================
/*globals ONRTestApp*/

/** 

This controller manages the creation of isbn data.

   @extends SC.ArrayController
   @author Jeff Pittman
*/
ONRTestApp.isbnsController = SC.ArrayController.create(
/** @scope ONRTestApp.isbnsController.prototype */ {

  // See comment in the versions controller about the creation of a closure.
  // The same logic applies here, except for isbns this time.  Once isbn 
  // records for a book have been created, the final step, creation of the actual book 
  // record, is fired.
  generateCheckISBNsFunction: function(title,isbn){
    var me = this;
    return function(val){
      //console.log('checking ISBNs ' + title);
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCache[title].pushObject(isbn);
        ONRTestApp.dataController.get('content')[title]['records']['isbns'].pushObject(isbn);
        me._tmpRecordCacheCount[title]--;
        if (me._tmpRecordCacheCount[title] === 0){
          delete me._tmpRecordCache[title]; // delete the old contents
          delete me._tmpRecordCacheCount[title];
          ONRTestApp.versionsController.createVersions(title);
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createISBNs: function(title){
    //console.log('createISBNs ' + title);
    var isbns = ONRTestApp.dataController.get('content')[title]['isbns'];

    this._tmpRecordCache[title] = [];
    this._tmpRecordCacheCount[title] = isbns.length;
        
    for (var i=0,len=isbns.length; i<len; i++){
      var isbn;
      isbn = ONRTestApp.store.createRecord(ONRTestApp.ISBN, {
        "key":  isbns[i].key,
        "type": isbns[i].type,
        "text": isbns[i].text
      });

      ONRTestApp.store.commitRecords();

      // this.generateCheckISBNsFunction() is provided here to fire createVersions as the next
      // step in data creation, which will create versions of the book.
      isbn.addFiniteObserver('status',this,this.generateCheckISBNsFunction(title,isbn),this);
    }
  },

  // See comment above, in the versions controller, about the use of _tmpRecordCache,Count.
  _tmpRecordCache: {},
  _tmpRecordCacheCount: {}

});
