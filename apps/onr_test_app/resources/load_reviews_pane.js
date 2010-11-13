// ==========================================================================
// ONRTestApp.loadReviewsPane
// ==========================================================================
/*globals ONRTestApp*/

/**

   @author Jeff Pittman
*/

ONRTestApp.loadReviewsPane = SC.PanelPane.create({
  layout: { top: 0, bottom: 0, left: 0, right: 0 },
  defaultResponder: 'ONRTestApp.statechart',

  contentView: SC.View.design({

    layout: { centerX: 0, centerY: 0, width: 400, height: 380 },

    childViews: 'explanation loadReviewsButton'.w(),

    explanation: SC.LabelView.design({
      layout: { left: 60, top: 60, right: 60, height: 320 },
      value: "Sample data will be loaded from FIXTURES files, with a twist, wherein the integer key in the FIXTURES data is used temporarily to find " +
              "child records when setting relations. Then, as records are created in the store, the Riak backend will replace integer FIXTURES keys with its own long string keys. " +
              "Review record data will be loaded first, because these records have no child records (They have no toMany relations), so can be " +
              "created without complication -- without the need to set relations to other records."
    }),

    loadReviewsButton: SC.ButtonView.design({
      layout: { right: 60, bottom: 60, width: 120, height: 32 },
      titleMinWidth: 0,
      isDefault: YES,
      title: 'Load Reviews',
      action: 'loadReviews'
    })
  })
});
