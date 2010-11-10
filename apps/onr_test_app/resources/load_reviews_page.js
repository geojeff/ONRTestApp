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

      layout: { centerX: 0, centerY: 0, width: 400, height: 300 },

      childViews: 'explanation loadReviewsButton'.w(),

      explanation: SC.LabelView.design({
        layout: { left: 60, top: 60, right: 60, height: 200 },
        value: "Sample data is loaded from FIXTURES files, with a twist. The integer key in the data is used to find " +
                "child records when setting relations. Riak will replace this key with its own long string key. " +
                "Review record data will be loaded first, because they have no child records (no toMany relation)."
      }),

      loadReviewsButton: SC.ButtonView.design({
        layout: { right: 60, bottom: 60, width: 120, height: 32 },
        titleMinWidth: 0,
        isDefault: YES,
        title: 'Load Reviews',
        action: 'loadReviews'
      })
    })
  })
});
