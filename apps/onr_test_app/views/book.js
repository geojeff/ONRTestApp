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
  childViews: "versionsView versionView reviewsView".w(),
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
    if (this.get("versionView") && !this.get("versionView").isClass) {
      this.adjust("minHeight", this.getPath("versionView.layout").minHeight + 40);
    }
  },

  versionsView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { top: 10, height: 100, left: 10, width: 150 },
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

  reviewsView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: { left: 10, bottom: 10, height: 400, right: 10 },
    backgroundColor: 'white',
    contentView: SC.ListView.design({
      contentBinding: 'ONRTestApp.reviewsController.arrangedObjects',
      selectionBinding: 'ONRTestApp.reviewsController.selection',
      contentValueKey: "text",
      canEditContent: YES,
      canReorderContent: YES,
      canDeleteContent: YES,
      destroyOnRemoval: YES,
      rowHeight: 21
    })
  }),

  versionView: SC.FormView.design({
    layout: { top: 10, height: 500, left: 170, width: 300 },
    contentBinding: ".parentView.content",
    //rowPadding: 5,
    childViews: "publisher publicationDate format language rank height width depth isbn10 isbn13".w(),

//    publisherHeader: SC.LabelView.design({
//      layout: { width: 200, height: 21 },
//      value: "Publisher"
//    }),

    publisher: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Publisher"
      //isSpacer: YES,
      //autoHide: YES
    })),

    publicationDate: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Date"
      //isSpacer: YES,
      //autoHide: YES
    })),

//    detailsHeader: SC.LabelView.design({
//      layout: { width: 200, height: 21 },
//      classNames: "header".w(),
//      value: "Details for this version"
//    }),

    format: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Format"
      //isSpacer: YES,
      //autoHide: YES
    })),

    pages: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Pages"
      //isSpacer: YES,
      //autoHide: YES
    })),

    language: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Language"
      //isSpacer: YES,
      //autoHide: YES
    })),

//    spacer1: SC.View.design({
//      layout: { left: 0, width: 150, height: 14, centerY: 0},
//      value: "",
//      flowSize: { widthPercentage: 1 }
//    }),

    rank: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Rank"
      //isSpacer: YES,
      //autoHide: YES
    })),

    height: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Height"
      //isSpacer: YES,
      //autoHide: YES
    })),

    width: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Width"
      //isSpacer: YES,
      //autoHide: YES
    })),

    depth: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "Depth"
      //isSpacer: YES,
      //autoHide: YES
    })),

//    spacer2: SC.View.design({
//      layout: { left: 0, width: 150, height: 14, centerY: 0},
//      value: "",
//      flowSize: { widthPercentage: 1 }
//    }),

    isbn10: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "ISBN (10)"
      //isSpacer: YES,
      //autoHide: YES
    })),

    isbn13: SC.FormView.row(SC.TextFieldView.design({
      layout: { left: 0, width: 150, height: 21, centerY: 0},
      value: "ISBN (13)"
      //isSpacer: YES,
      //autoHide: YES
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

