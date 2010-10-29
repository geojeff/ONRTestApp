// ==========================================================================
// Project:   ONRTestApp.BookView
// ==========================================================================
/*globals ONRTestApp Forms */

/** @class

        (Document Your View Here)

 @extends SC.View
 */

//SC.Animatable.defaultTimingFunction = SC.Animatable.TRANSITION_EASE_IN_OUT;

ONRTestApp.BookView = SC.View.extend(SC.Animatable,
  /** @scope ONRTestApp.BookView.prototype */ {
  layout: {left:0, right:0},
  classNames: ["book-view"],
  childViews: "versionsView versionView".w(),
  backgroundColor: "white",
  contentBindingDefault: SC.Binding.single(),

  transitions: {
    opacity: {
      duration: 0.25,
      timing: SC.Animatable.TRANSITION_EASE_IN_OUT,
      action: function(){
        if (this.style.opacity === 0) this._call_when_done();
      }
    }
  },

  layoutDidChangeFor: function(what) {
    sc_super();
    if (this.get("form") && !this.get("form").isClass) {
      this.adjust("minHeight", this.getPath("form.layout").minHeight + 40);
    }
  },

  versionsView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { top: 136, height: 400, left: 240, width: 200 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
      contentBinding: 'ONRTestApp.versionsController.arrangedObjects',
      selectionBinding: 'ONRTestApp.versionsController.selection',
      contentValueKey: "format",
      canEditContent: YES,
      canReorderContent: YES,
      canDeleteContent: YES,
      destroyOnRemoval: YES,
      rowHeight: 21
    })
  }),

  versionView: SC.FormView.design({
    layout: { top: 136, height: 500, left: 460, width: 200 },
    //rowPadding: 5,
    childViews: "publisherHeader publisherTitle publicationDate spacer1 detailsHeader format language rank height width depth spacer2 isbnsView".w(),

    publisherHeader: SC.LabelView.design({
      layout: { width: 200, height: 21 },
      value: "Publisher"
    }),

    publisherTitle: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Publisher",
      isSpacer: YES
    })),

    publicationDate: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Date",
      isSpacer: YES
    })),

    spacer1: SC.View.design({
      layout: { left: 0, width: 150, height: 14, centerY: 0},
      value: "",
      flowSize: { widthPercentage: 1 }
    }),

    detailsHeader: SC.LabelView.design({
      layout: { width: 200, height: 21 },
      classNames: "header".w(),
      value: "Details for this version"
    }),

    format: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Format",
      isSpacer: YES
    })),

    language: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Language",
      isSpacer: YES
    })),

    rank: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Rank",
      isSpacer: YES
    })),

    height: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Height",
      isSpacer: YES
    })),

    width: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Width",
      isSpacer: YES
    })),

    depth: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Depth",
      isSpacer: YES
    })),

    spacer2: SC.View.design({
      layout: { left: 0, width: 150, height: 14, centerY: 0},
      value: "",
      flowSize: { widthPercentage: 1 }
    }),

    isbnsView: SC.FormView.row(SC.ScrollView.design({
      hasHorizontalScroller: NO,
      layout: { left: 0, width: 150, height: 64, centerY: 0},
      backgroundColor: 'white',
      contentView: SC.ListView.design({
        contentBinding: 'ONRTestApp.isbnsController.arrangedObjects',
        selectionBinding: 'ONRTestApp.isbnsController.selection',
        contentValueKey: "text",
        canEditContent: YES,
        canReorderContent: YES,
        canDeleteContent: YES,
        destroyOnRemoval: YES,
        rowHeight: 21
      })
    }))
  }),

  /* This stuff goes at the end because it is entirely to test animation. So there. */
  append: function() {
    this.disableAnimation();
    this.adjust("opacity", 1).updateLayout();
    this.enableAnimation();
    sc_super();
  },

  remove: function() {
    this._call_when_done = arguments.callee.base;
    this.adjust("opacity", 0);
  },

  index: 0
});

