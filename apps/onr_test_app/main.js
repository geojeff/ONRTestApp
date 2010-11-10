// ==========================================================================
// Project:   ONRTestApp
// ==========================================================================
/*globals ONRTestApp */

ONRTestApp.main = function main() {

  // Create the data source if it doesn't exist already. (FORCE)
  var initDS = ONRTestApp.store._getDataSource();

  ONRTestApp.statechart.initStatechart();

};

function main() { ONRTestApp.main(); }
