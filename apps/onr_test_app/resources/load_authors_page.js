// ==========================================================================
// ONRTestApp.loadAuthorsPane
// ==========================================================================
/*globals ONRTestApp*/

/**

   @author Jeff Pittman
*/

ONRTestApp.loadAuthorsPage = SC.Page.create({

  panel: SC.PanelPane.design({
    layout: { top: 0, bottom: 0, left: 0, right: 0 },
    defaultResponder: 'ONRTestApp.statechart',

    contentView: SC.View.design({

      layout: { centerX: 0, centerY: 0, width: 400, height: 280 },

      childViews: 'explanation loadAuthorsButton'.w(),

      explanation: SC.LabelView.design({
        layout: { left: 0, top: 0, width: 400, height: 200 },
        textAlign: SC.ALIGN_CENTER,
        value: "%@ book records have been loaded (They have status === READY_CLEAN). Next, we load authors.".fmt(ONRTestApp.get('loadedBookCount'))
      }),

      loadAuthorsButton: SC.ButtonView.design({
        layout: { right: 60, bottom: 60, width: 120, height: 32 },
        titleMinWidth: 0,
        isDefault: YES,
        title: 'Load Authors',
        action: 'loadAuthors'
      })
    })
  })
});
