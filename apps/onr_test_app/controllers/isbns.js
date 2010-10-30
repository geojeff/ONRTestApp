
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

  contentBinding: "ONRTestApp.versionsController.effectiveSelection",
  selection: null,

  getISBN: function(fixturesKey) {
    return this._tmpRecordCache[fixturesKey];
  },

  generateCheckISBNsFunction: function(isbn){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          // In this loop we will set the key mapping for this controller,
          // readying for the call to createVersions.
          var fixturesKeysToRiakKeysForISBNs = {};
          var isbnRecord;
          for (fixturesKey in me._tmpRecordCache) {
            isbnRecord = me._tmpRecordCache[fixturesKey];
            fixturesKeysToRiakKeysForISBNs[fixturesKey] = isbnRecord.get('key');
          }

          me.set('fixturesKeysToRiakKeys', fixturesKeysToRiakKeysForISBNs);

          //delete me._tmpRecordCache;

          ONRTestApp.versionsController.createVersions();
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createISBNs: function(){
    this._tmpRecordCount = ONRTestApp.ISBN.FIXTURES.get('length');
        
    for (var i=0,len=ONRTestApp.ISBN.FIXTURES.get('length'); i<len; i++){
      var isbn;
      isbn = ONRTestApp.store.createRecord(ONRTestApp.ISBN, {
        "key":  ONRTestApp.ISBN.FIXTURES[i].key,
        "type": ONRTestApp.ISBN.FIXTURES[i].type,
        "text": ONRTestApp.ISBN.FIXTURES[i].text
      });

      this._tmpRecordCache[ONRTestApp.ISBN.FIXTURES[i].key] = isbn;

      isbn.addFiniteObserver('status',this,this.generateCheckISBNsFunction(isbn), this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCache: {},
  _tmpRecordCount: 0

});
