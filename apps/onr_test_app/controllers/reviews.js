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

  addReview: function() {
    var version;

    review = ONRTestApp.store.createRecord(ONRTestApp.Review, {
      "text": "Say what you think."
    });

    ONRTestApp.store.commitRecords();

    // Once the book records come back READY_CLEAN, add review to current version.
    review.addFiniteObserver('status', this, this.generateCheckReviewFunction(review), this);
  },

  generateCheckReviewFunction: function(review) {
    var me = this;
    return function(val) {
      if (val & SC.Record.READY_CLEAN) {
        ONRTestApp.versionsController.addNewReview(review);

        me.selectObject(review);

        me.invokeLater(function() {
          ONRTestApp.versionController.beginEditing();
        });

        // this has already been done, eh?
        //version.commitRecord();
      }
    };
  },

  generateCheckReviewsFunction: function(review) {
    var me = this;
    return function(val) {
      if (val & SC.Record.READY_CLEAN) {
        me._tmpRecordCount--;

        ONRTestApp.bumpReviewCount();

        if (me._tmpRecordCount === 0) {
          delete me._tmpRecordCount;

          ONRTestApp.statechart.sendEvent('reviewsDidLoad');
        }
        return YES;
      }
      else return NO;
    };
  },

  alertPaneDidDismiss: function(pane, status) {
    if (!this._pendingOperation) return;
    switch (status) {
      case SC.BUTTON1_STATUS:
        this[this._pendingOperation.action].call();
        this._pendingOperation = null;
        break;
      case SC.BUTTON2_STATUS:
        break;
    }
  },

  loadReviews: function() {
    var len =  ONRTestApp.Review.FIXTURES.get('length');
    this._tmpRecordCount = len;

    for (var i=0; i<len; i++) {
      var review;
      review = ONRTestApp.store.createRecord(ONRTestApp.Review, {
        "fixturesKey":  ONRTestApp.Review.FIXTURES[i].key,
        "text":         ONRTestApp.Review.FIXTURES[i].text
      });

      review.addFiniteObserver('status', this, this.generateCheckReviewsFunction(review), this);
    }

    ONRTestApp.store.commitRecords();
  },

  _tmpRecordCount: 0

});
