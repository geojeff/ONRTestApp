// ==========================================================================
// ONRTestApp.loadBooksPane
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

      layout: { centerX: 0, centerY: 0, width: 400, height: 400 },

      childViews: 'explanation loadBooksButton'.w(),

      explanation: SC.LabelView.design({
        layout: { left: 60, top: 60, right: 60, height: 200 },
        value:  "%@ version records have been loaded (They have status === READY_CLEAN). Next, we load book versions.".fmt(ONRTestApp.get('loadedVersionCount'))
      }),

      loadBooksButton: SC.ButtonView.design({
        layout: { right: 60, bottom: 60, width: 120, height: 32 },
        titleMinWidth: 0,
        isDefault: YES,
        title: 'Load Books',
        action: 'loadBooks'
      })
    })
  })
});
