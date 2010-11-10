// ==========================================================================
// ONRTestApp.loadVersionsPane
// ==========================================================================
/*globals ONRTestApp*/

/**

   @author Jeff Pittman
*/

ONRTestApp.loadVersionsPage = SC.Page.create({

  panel: SC.PanelPane.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    defaultResponder: 'ONRTestApp.statechart',

    contentView: SC.View.design({

      layout: { centerX: 0, centerY: 0, width: 400, height: 280 },

      childViews: 'explanation loadVersionsButton'.w(),

      explanation: SC.LabelView.design({
        layout: { left: 0, top: 0, width: 400, height: 200 },
        textAlign: SC.ALIGN_CENTER,
        value:  "%@ review records have been loaded (They have status === READY_CLEAN). Next, we load book versions.".fmt(ONRTestApp.get('loadedReviewCount'))
      }),

      loadVersionsButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 10, width: 80, height: 32 },
        titleMinWidth: 0,
        isDefault: YES,
        title: 'Load Versions',
        action: 'loadVersions'
      })
    })
  })
});
