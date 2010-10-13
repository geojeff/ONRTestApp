// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.DataSource
// ==========================================================================
/* globals ONRTestApp onr */

/** 

This controller manages the creation of data.

   @extends SC.ObjectController
   @author Jeff Pittman
*/

//sc_require('SC.ONRWebsocketDataSource');

ONRTestApp.DataSource =  SC.ONRWebsocketDataSource.extend({
  authSuccessCallback: function(){
    ONRTestApp.dataController.initiateDataCreation();
  }
});

