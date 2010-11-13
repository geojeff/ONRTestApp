/**
 *
 * Created by IntelliJ IDEA.
 * User: geojeff
 * Date: Oct 29, 2010
 * Time: 9:19:08 AM
 * To change this template use File | Settings | File Templates.
 */

sc_require('controllers/reviews');
sc_require('controllers/versions');
sc_require('controllers/books');
sc_require('controllers/authors');

ONRTestApp.mixin({

  // Set this to a value greater than the sum of all FIXTURES records
  recordCount: 1000,

  loadedAuthorCount:  0,
  loadedBookCount:    0,
  loadedVersionCount: 0,
  loadedReviewCount:  0,

  nextRecordKey: function() {
    this.set('recordCount', this.get('recordCount')+1);
    return this.get('recordCount');
  },

  bumpAuthorCount: function() {
    var count = this.get('loadedAuthorCount');
    count++;
    this.set('loadedAuthorCount', count);
  },

  bumpBookCount: function() {
    var count = this.get('loadedBookCount');
    count++;
    this.set('loadedBookCount', count);
  },

  bumpVersionCount: function() {
    var count = this.get('loadedVersionCount');
    count++;
    this.set('loadedVersionCount', count);
  },

  bumpReviewCount: function() {
    var count = this.get('loadedReviewCount');
    count++;
    this.set('loadedReviewCount', count);
    console.log(count);
  }

});