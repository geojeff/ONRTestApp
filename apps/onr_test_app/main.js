// ==========================================================================
// Project:   ONRTestApp
// ==========================================================================
/*globals ONRTestApp */

ONRTestApp.main = function main() {

  // Create the data source if it doesn't exist already. (FORCE)
  var initDS = ONRTestApp.store._getDataSource();
  
  // Call auth. The data source contains a callback to the test() function.
  // test() will initiate data creation steps. 
  ONRTestApp.store.dataSource.connect(ONRTestApp.store,function(){
    ONRTestApp.store.dataSource.authRequest("test","test");
  });

  ONRTestApp.getPath('mainPage.mainPane').append();

	var authors = ONRTestApp.store.find(ONRTestApp.Author);
  var books = ONRTestApp.store.find(ONRTestApp.Book);
  var versions = ONRTestApp.store.find(ONRTestApp.Version);
  var isbns = ONRTestApp.store.find(ONRTestApp.ISBN);

  ONRTestApp.authorsController.set('all', authors);
  ONRTestApp.authorsController.set('content', authors);
  ONRTestApp.booksController.set('content', books);
  ONRTestApp.versionsController.set('content', versions);
  ONRTestApp.isbnsController.set('content', isbns);

} ;

function main() { ONRTestApp.main(); }
