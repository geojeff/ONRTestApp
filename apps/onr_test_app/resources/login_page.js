// ==========================================================================
// Project: ONRTestApp.loginPage
//            Reference: https://github.com/suvajitgupta/Tasks login_page.js
// ==========================================================================
/*globals ONRTestApp */

ONRTestApp.loginPanel = SC.PanelPane.create({
  layout: { top: 0, bottom: 0, left: 0, right: 0 },
  defaultResponder: 'ONRTestApp.statechart',

  contentView: SC.View.design({

    layout: { centerX: 0, centerY: 0, width: 400, height: 260 },
    childViews: 'loginNameField passwordField loginErrorMessageLabel loginButton'.w(),

    loginNameField: SC.TextFieldView.design({
      layout: { top: 60, left: 60, right: 60, height: 32 },
      hint: 'login name',
      valueBinding: 'ONRTestApp.loginController.loginName'
    }),

    passwordField: SC.TextFieldView.design({
      layout: { top: 112, left: 60, right: 60, height: 32 },
      isPassword: YES,
      hint: 'password',
      valueBinding: 'ONRTestApp.loginController.password'
    }),

    loginErrorMessageLabel: SC.LabelView.design({
      layout: { top: 164, left: 60, right: 60, height: 20 },
      valueBinding: SC.Binding.oneWay('ONRTestApp.loginController.loginErrorMessage')
    }),

    loginButton: SC.ButtonView.design({
      layout: { bottom: 60, right: 60, width: 80, height: 24 },
      titleMinWidth: 0,
      isEnabledBinding: SC.Binding.oneWay('ONRTestApp.loginController.loginName').bool(),
      isDefault: YES,
      title: 'Log In',
      action: 'authenticate'
    })

  }),

  focus: function() {
    this.contentView.loginNameField.becomeFirstResponder();
  }

});