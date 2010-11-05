
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

  contentBinding: "ONRTestApp.versionsController.effectiveSelection",
  selection: null,

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
