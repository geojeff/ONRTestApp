// ==========================================================================
// ONRTestApp.loginController
//   Reference: https://github.com/suvajitgupta/ONRTestApp login.js
// ==========================================================================
/*globals ONRTestApp*/

ONRTestApp.loginController = SC.ObjectController.create(
/** @scope ONRTestApp.loginController.prototype */ {

    loginErrorMessage: '',
    loginName: '',
    password: '',

    _loginInformationHasChanged: function() {
      this.set('loginErrorMessage', '');
    }.observes('loginName', 'password')

});