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


} ;

function main() { ONRTestApp.main(); }
