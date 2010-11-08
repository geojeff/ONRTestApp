
// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.reviewsController
// ==========================================================================
/*globals ONRTestApp*/

/** 

This controller manages the creation of review data.

   @extends SC.ArrayController
   @author Jeff Pittman
*/
ONRTestApp.reviewsController = SC.ArrayController.create(
/** @scope ONRTestApp.reviewsController.prototype */ {

  contentBinding: "ONRTestApp.versionsController.gatheredReviews",
  selection: null,

  deleteReviews: function(op) {
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

  addReview: function() {
    var version;

    review = ONRTestApp.store.createRecord(ONRTestApp.Review, {
      "text": "Say what you think."
    });

    ONRTestApp.store.commitRecords();

    // Once the book records come back READY_CLEAN, add review to current version.
    review.addFiniteObserver('status',this,this.generateCheckReviewFunction(review),this);
  },

  generateCheckReviewFunction: function(review) {
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        ONRTestApp.versionsController.addNewReview(review);

        me.selectObject(review);

        me.invokeLater(function(){
          ONRTestApp.versionController.beginEditing();
        });

        // this has already been done, eh?
        //version.commitRecord();
      }
    }
  },

  generateCheckReviewsFunction: function(review){
    var me = this;
    return function(val){
      if (val & SC.Record.READY_CLEAN){
        me._tmpRecordCount--;
        ONRTestApp.bumpReviewCount();
        if (me._tmpRecordCount === 0){
          delete me._tmpRecordCount;

          ONRTestApp.versionsController.createVersions();
        }
        return YES;
      }
      else return NO;
    };
  },
 
  createReviews: function(){
    this._tmpRecordCount = ONRTestApp.Review.FIXTURES.get('length');
        
    for (var i=0,len=ONRTestApp.Review.FIXTURES.get('length'); i<len; i++){
      var review;
      review = ONRTestApp.store.createRecord(ONRTestApp.Review, {
        //"key":          ONRTestApp.Review.FIXTURES[i].key,
        "fixturesKey":  ONRTestApp.Review.FIXTURES[i].key,
        "type":         ONRTestApp.Review.FIXTURES[i].type,
        "text":         ONRTestApp.Review.FIXTURES[i].text
      });

      review.addFiniteObserver('status',this,this.generateCheckReviewsFunction(review), this);
    }
    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCount: 0

});
