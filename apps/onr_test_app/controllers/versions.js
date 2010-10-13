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

  // This is a closure, that will create an unauthord function, for checking
  // for completion of versions records. The generator function
  // has title, version as passed-in variables which are in 
  // scope for the generated function. The 'var me = this;' line sets me so
  // that there is also a reference to the controller within the generated
  // function.
  generateCheckVersionsFunction: function(title,version){
    var me = this;
    return function(val){
      //console.log('checking Versions ' + title + '/' + val);
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCache[title].pushObject(version);
        ONRTestApp.dataController.get('content')[title]['records']['versions'].pushObject(version);
        //console.log(SC.inspect(ONRTestApp.dataController.get('content')[title]['records']['versions']));
        me._tmpRecordCacheCount[title]--;
        //console.log('checking Versions ' + title + '/' + me._tmpRecordCacheCount[title]);
        if (me._tmpRecordCacheCount[title] === 0){
          delete me._tmpRecordCache[title]; // delete the old contents
          delete me._tmpRecordCacheCount[title];
          ONRTestApp.bookController.createBook(title);
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createVersions: function(title){
    //console.log('createVersions ' + title);
    var versions = ONRTestApp.dataController.get('content')[title]['versions'];
  
    this._tmpRecordCache[title] = [];
    this._tmpRecordCacheCount[title] = versions.length;
        
    for (var i=0,len=versions.length; i<len; i++){
      var version;
      version = ONRTestApp.store.createRecord(ONRTestApp.Version, {
        "key":      versions[i].key,
        "format":   versions[i].format,
        "language": versions[i].language,
        "rank":     versions[i].rank,
        "height":   versions[i].height,
        "width":    versions[i].width,
        "depth":    versions[i].depth});

      // this.generateCheckVersionsFunction is provided to create the function that
      // checks for READY_CLEAN for all versions for a given book. When all such 
      // versions are READY_CLEAN, in turn, createBook(), the last step in 
      // the data creation scheme, is fired.
      version.addFiniteObserver('status',this,this.generateCheckVersionsFunction(title,version),this);

      ONRTestApp.store.commitRecords();
    }
  },

  // _tmpRecordCache are for versions that have been created. _tmpRecordCacheCount is
  // initially set to the number of versions that should be created for the given book.
  // Then, as versions are created, the count is decremented. The count is checked, so
  // that, when 0, the next step in the data creation scheme is fired (createISBNs()).
  _tmpRecordCache: {},
  _tmpRecordCacheCount: {}

});
        
