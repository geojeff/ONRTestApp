// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.DataSource
// ==========================================================================
/* globals ONRTestApp ONR */

/** 

This controller manages the creation of data.

   @extends SC.ObjectController
   @author Jeff Pittman
*/

sc_require('onr/datasources/ONRWebsocketDataSource');

ONRTestApp.DataSource = ONR.ONRWebsocketDataSource.extend({
  authSuccessCallback: function(){
    ONRTestApp.statechart.resumeGotoState();
    ONRTestApp.statechart.sendEvent('authSuccess');
  },

  authFailureCallback: function(){
    ONRTestApp.statechart.resumeGotoState();
    ONRTestApp.statechart.sendEvent('authFailure');
  }
});

