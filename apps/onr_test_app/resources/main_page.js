// ==========================================================================
// Project:   ONRTestApp - mainPage
//            UI modified from Alex Iskander's Contacts app:
//                http://github.com/ialexi/Contacts
// ==========================================================================
/*globals ONRTestApp Forms Animation */
require("views/book");

// This page describes the main user interface for your application.  
ONRTestApp.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'toolbar splitter'.w(),

    toolbar: SC.ToolbarView.design({
      classNames: ["hback", "toolbar"],
      layout: { left: 0, top: 0, right: 0, height: 32 },
      childViews: "appLabel recordCount".w(),

      appLabel: SC.LabelView.design({
        layout: { left: 10, width: 200, height: 20, centerY: 0 },
        textAlign: SC.ALIGN_CENTER,
        tagName: "h1",
        value: "Welcome to ONRTestApp!"
      }),

      recordCount: SC.LabelView.design({
        layout: { right: 10, width: 30, height: 20, centerY: 0 },
        valueBinding: "ONRTestApp.recordCount",
      })
    }), // toolbar

    // splitter, with authors list on the left, and books list and view on the right.
    splitter: SC.SplitView.design({
      layout: { left: 0, top: 32, right: 0, bottom: 0 },
      defaultThickness: 200,
      dividerThickness: 1,

      topLeftView: SC.View.design({
        childViews: "allAuthorsItem authorList toolbar".w(),
        classNames: "authors".w(),

        allAuthorsItem: SC.View.design({
          childViews: "label separator".w(),
          layout: { left: 0, right: 0, top: 0, height: 32 },

          selectedBinding: "ONRTestApp.authorsController.allIsSelected",
          displayProperties: ["selected"],
          render: function(context){
            sc_super();
            if (this.get("selected")) context.addClass("hback list-big-selection selected");
          },

          click: function() {
            ONRTestApp.authorsController.selectAllAuthorsItem();
            return YES;
          },

          label: SC.LabelView.design({
            layout: { height: 18, centerY: 0, left: 10, right: 10 },
            value: "All",
            fontWeight: SC.FONT_BOLD
          }),

          separator: SC.SeparatorView.design({
            layoutDirection: SC.LAYOUT_HORIZONTAL,
            layout: { bottom:0, left:0, right:0, height: 1}
          })
        }), // allAuthorsItem

        authorList: SC.ScrollView.design({
          layout: { left:0, right:0, top: 32, bottom:32},
          borderStyle: SC.BORDER_NONE,
          hasHorizontalScroller: NO,
          contentView: SC.ListView.design({
            contentBinding: "ONRTestApp.authorsController.arrangedObjects",
            selectionBinding: "ONRTestApp.authorsController.selection",
            contentValueKey: "fullName",
            canEditContent: YES,
            canDeleteContent: YES,
            rowHeight:24,
            exampleView: SC.View.design({
              childViews: "label".w(),

              label: SC.LabelView.design({
                layout: {left:10, right:10, height:18,centerY:0},
                contentBinding: ".parentView.content",
                contentValueKey: "fullName",
                isEditable: YES,
                fontWeight: SC.FONT_WEIGHT_BOLD,
                inlineEditorDidEndEditing: function(){
                  sc_super();
                  ONRTestApp.store.commitRecords();
                }
              }),

              beginEditing: function(){ this.label.beginEditing(); },

              isSelected: NO,

              isSelectedDidChange: function() {
                this.displayDidChange();
              }.observes("isSelected"),

              render: function(context) {
                sc_super();
                if (this.contentIndex % 2 === 0) {
                  context.addClass("even");
                } else {
                  context.addClass("odd");
                }
                if (this.get("isSelected")) {
                  context.addClass("hback").addClass("list-big-selection").addClass("selected");
                }
              }
            })
          })
        }), // authorList

        toolbar: SC.ToolbarView.design({
          classNames: "hback toolbar".w(),
          layout: { left: 0, bottom: 0, right: 0, height: 32 },
          childViews: "add".w(),
          add: SC.ButtonView.design({
            layout: { left: 0, top: 0, bottom: 0, width:32 },
            target: "ONRTestApp.authorsController",
            action: "addAuthor",
            icon: "icons plus button-icon",
            titleMinWidth: 16,
            isActiveDidChange: function() {
              this.set("icon", (this.get("isActive") ? "icons plus-active button-icon" : "icons plus button-icon"));
            }.observes("isActive")
          })
        }) // toolbar
      }), // topLeftView

      // splitter, containing the bookList on the left and the bookView on the right.
      bottomRightView: SC.SplitView.design({
        defaultThickness: 200,
        dividerThickness: 1,

        topLeftView: SC.View.design({
          childViews: "toolbar bookList".w(),
          toolbar: SC.ToolbarView.design({
            classNames: "hback toolbar".w(),
            layout: { left: 0, bottom: 0, right: 0, height: 32 },
            childViews: "add".w(),
            add: SC.ButtonView.design({
              layout: { left: 0, top: 0, bottom: 0, width:32 },
              target: "ONRTestApp.booksController",
              action: "addBook",
              icon: "icons plus button-icon",
              titleMinWidth: 16,
              isActiveDidChange: function() {
                this.set("icon", (this.get("isActive") ? "icons plus-active button-icon" : "icons plus button-icon"));
              }.observes("isActive")
            })
          }), // toolbar

          bookList: SC.ScrollView.design({
            classNames: ["books-list"],
            layout: { left:0, right:0, top:0, bottom:32},
            borderStyle: SC.BORDER_NONE,
            contentView: SC.ListView.design({
              contentBinding: "ONRTestApp.booksController.arrangedObjects",
              selectionBinding: "ONRTestApp.booksController.selection",
              contentValueKey: "title",

              delegate: ONRTestApp.bookController,
              canReorderContent: YES,
              canDeleteContent: YES,
              rowHeight: 22,

              exampleView: SC.View.design({
                childViews: "label".w(),
                classNames: ["book-item"],

                label: SC.LabelView.design({
                  escapeHTML: NO,
                  layout: {left:5, right:5, height:18,centerY:0},
                  contentBinding: ".parentView.content",
                  contentValueKey: "title",
                  inlineEditorDidEndEditing: function(){
                    sc_super();
                    ONRTestApp.store.commitRecords();
                  }
                }),

                isSelected: NO,
                isSelectedDidChange: function() {
                  this.displayDidChange();
                }.observes("isSelected"),

                render: function(context) {
                  sc_super();

                  // even/odd
                  if (this.contentIndex % 2 === 0) {
                    context.addClass("even");
                  } else {
                    context.addClass("odd");
                  }

                  // is selected
                  if (this.get("isSelected")) {
                    context.addClass("list-selection").addClass("hback").addClass("selected");
                  }
                }
              })
            })
          }) // bookList
        }), // booksView

        // book view
        bottomRightView: SC.View.design({
          backgroundColor: "#555",
          childViews: 'noBookView bookView toolbar'.w(),

          noBookView: SC.LabelView.design({
            layout: { centerX: 0, centerY: 0, height: 18, width: 200 },
            value: "No Book Selected"
          }),

          bookView: SC.ScrollView.design(SC.Animatable, {
            style: {
              opacity: 0,
              display: "none"
            },
            transitions: {
              opacity: 0.15,
              display: 0.5
            },

            classNames: ["book-panel"],
            layout: { left: 15, right: 15, bottom: 47, top: 15 },
            borderStyle: SC.BORDER_NONE,
              contentView: ONRTestApp.BookView.design({
              contentBinding: "ONRTestApp.bookController"
            }),

            shouldDisplayBinding: "ONRTestApp.bookController.shouldDisplay",
            shouldDisplayDidChange: function(){
              if (this.get("shouldDisplay")) this.adjust({"opacity": 1.0, display: "block"});
              else this.adjust({"opacity": 0, display: "none"});
            }.observes("shouldDisplay")
          }), // bookView

          toolbar: SC.ToolbarView.design({
            layout: { left:0, right:0, bottom:0, height:32 },
            classNames: "hback toolbar".w(),
            childViews: "edit save".w(),
            edit: SC.ButtonView.design(SC.Animatable, {
              transitions: {
                opacity: 0.25
              },
              title: "Edit",
              layout: { left: 0, top: 0, bottom: 0, width: 90 },
              target: ONRTestApp.bookController,
              action: "beginEditing",
              style: { opacity: 1 }
            }),

            save: SC.ButtonView.design(SC.Animatable, {
              transitions: { opacity: 0.25 },
              title: "Save",
              layout: { left: 0, top:0, bottom: 0, width: 90 },
              target: ONRTestApp.bookController,
              action: "endEditing",
              style: {
                opacity: 0, display: "none"
              }
            }),

            controllerIsEditing: NO,
            controllerIsEditingBinding: "ONRTestApp.bookController.isEditing",
            controllerIsEditingDidChange: function() {
              var save = this.get("save");
              var edit = this.get("edit");

              if (save.isClass) return;

              if (this.get("controllerIsEditing")) {
                save.adjust({
                  opacity: 1, display: "block"
                }).updateLayout();
                edit.adjust({
                  opacity: 1, display: "none"
                }).updateLayout();
              } else {
                edit.adjust({
                  opacity: 1, display: "block"
                }).updateLayout();
                save.adjust({
                  opacity: 1, display: "none"
                }).updateLayout();
              }
            }.observes("controllerIsEditing")

          }) // toolbar
        }) // bottomRightView (bookView)
      }) // bottomRightView (booksView)
    }) // splitter
  }) // mainPane
}); // mainPage
