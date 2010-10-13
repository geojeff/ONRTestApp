// ==========================================================================
// Project:   onr
// ==========================================================================
/*globals ONR */

/** @namespace

  OrionNodeRiak Client Framework
  
  @extends SC.Object
*/

sc_require('ONRDataSource');
sc_require('ONRWebsocketDataSource');
sc_require('ONRXHRPollingDataSource');

ONR = SC.Object.create(
  /** @scope onr.prototype */ {

  NAMESPACE: 'ONR',
  VERSION: '0.1.0'

  // TODO: Add global constants or singleton objects needed by your app here.

}) ;
