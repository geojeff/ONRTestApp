// ==========================================================================
// ONRTestApp.loadVersionsPane
// ==========================================================================
/*globals ONRTestApp*/

/**

   @author Jeff Pittman
*/

ONRTestApp.loadVersionsPane = SC.PanelPane.create({
  layout: { top: 0, bottom: 0, left: 0, right: 0 },
  defaultResponder: 'ONRTestApp.statechart',

  contentView: SC.View.design({

    layout: { centerX: 0, centerY: 0, width: 400, height: 392 },

    childViews: 'explanation1 explanation2 loadVersionsButton'.w(),

    explanation1: SC.LabelView.design({
      layout: { left: 60, top: 60, right: 60, height: 180},
      value: "Review records have been loaded. Examine the console for integer counts printed from the controller " +
             "making the createRecord calls, followed by createRecordResult messages from the ONR datasource. Observe " +
             "the long hash keys set by Riak, along with the original fixtures integer keys and the record data."
    }),

    explanation2: SC.LabelView.design({
      layout: { left: 60, top: 230, right: 60, height: 40 },
      value: "Now we load versions (book versions: paperback, hardback, DVD, etc.)."
    }),

    loadVersionsButton: SC.ButtonView.design({
      layout: { right: 60, bottom: 60, width: 120, height: 32 },
      titleMinWidth: 0,
      isDefault: YES,
      title: 'Load Versions',
      action: 'loadVersions'
    })
  })
});
