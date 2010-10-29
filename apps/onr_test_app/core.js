// ==========================================================================
// Project:   ONRTestApp
// ==========================================================================
/*globals ONRTestApp */

/** @authorspace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
ONRTestApp = SC.Application.create(
  /** @scope ONRTestApp.prototype */ {

  NAMESPACE: 'ONRTestApp',
  VERSION: '0.1.0',

  store: SC.Store.create().from('ONRTestApp.DataSource')
  //store: SC.Store.create().from(SC.Record.fixtures)

}) ;
