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

  //  2 authors
  //  5 books
  //  6 versions
  // 12 reviews
  // ------------
  // 25 total records
  recordCount: 25,

  loadedRecordCount: 0,

  initiateDataCreation: function() {
    ONRTestApp.reviewsController.createReviews();
  }

});