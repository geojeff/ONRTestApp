// ==========================================================================
// ONRTestApp.loadReviewsPane
// ==========================================================================
/*globals ONRTestApp*/

/**

   @author Jeff Pittman
*/

ONRTestApp.loadReviewsPage = SC.Page.design({

  panel: SC.PanelPane.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    defaultResponder: 'ONRTestApp.statechart',

    contentView: SC.View.design({

      layout: { centerX: 0, centerY: 0, width: 400, height: 400 },

      childViews: 'explanation loadVersionsButton'.w(),

      explanation: SC.LabelView.design({
        layout: { left: 60, top: 60, right: 60, height: 320 },
        value: "Sample data is being loaded from FIXTURES files, with a twist. The integer key in the FIXTURES data is used to find " +
                "child records when setting relations. As records are created in the store, Riak will replace FIXTURES keys with its own long string keys. " +
                "Review record data has just been loaded first, because these records have no child records (They have no toMany relations), so can be" +
                "created without complication. Now we are ready to create book version records."
      }),

      loadVersionsButton: SC.ButtonView.design({
        layout: { right: 60, bottom: 60, width: 120, height: 32 },
        titleMinWidth: 0,
        isDefault: YES,
        title: 'Load Versions',
        action: 'loadVersions'
      })
    })
  })
});
