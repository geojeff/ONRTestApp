// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.DataSource
// ==========================================================================
/* globals ONRTestApp ONR */

/** 

This controller manages the creation of data.

   @extends SC.ObjectController
   @author Jeff Pittman
*/

//sc_require('ONRWebsocketDataSource');

ONRTestApp.DataSource =  ONRWebsocketDataSource.extend({
  authSuccessCallback: function(){
    ONRTestApp.dataController.initiateDataCreation();
  }
});

