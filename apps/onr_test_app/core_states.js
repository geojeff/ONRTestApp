// ==========================================================================
// ONRTestApp.statechart
// ==========================================================================
/*globals ONRTestApp*/

/**
   @author Jeff Pittman
*/

ONRTestApp.statechart = Ki.Statechart.create({
  rootState: Ki.State.design({
    initialSubstate: "loggedOut",

    // ----------------------------------------
    //    STATE: loggedOut
    // ----------------------------------------
    loggedOut: Ki.State.design({

      enterState: function() {
        var authors = ONRTestApp.store.find(SC.Query.local(ONRTestApp.Author));
        var books = ONRTestApp.store.find(SC.Query.local(ONRTestApp.Book));
        var versions = ONRTestApp.store.find(ONRTestApp.Version);
        var reviews = ONRTestApp.store.find(ONRTestApp.Review);

        ONRTestApp.authorsController.set('all', books);
        ONRTestApp.authorsController.set('content', authors);
        ONRTestApp.booksController.set('content', books);
        ONRTestApp.versionsController.set('content', versions);
        ONRTestApp.reviewsController.set('content', reviews);

        var panel = ONRTestApp.getPath('loginPage.panel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        var panel = ONRTestApp.getPath('loginPage.panel');
        if (panel) {
          panel.remove();
        }
      },

      authenticate: function() {
        var loginName = ONRTestApp.loginController.get('loginName');
        var password = ONRTestApp.loginController.get('password');

        // Call auth on the data source, which has callbacks to send events to the "authResult" functions here.
        ONRTestApp.store.dataSource.connect(ONRTestApp.store, function(){
          ONRTestApp.store.dataSource.authRequest(loginName, password);
        });
      },

      authFailure: function(errorMessage) {
        ONRTestApp.loginController.set('loginErrorMessage', errorMessage);
      },

      authSuccess: function() {
        this.gotoState('loggedIn');
      }
    }),

    // ----------------------------------------
    //    STATE: loggedIn
    // ----------------------------------------
    loggedIn: Ki.State.design({
      enterState: function() {
        var panel = ONRTestApp.getPath('loadReviewsPage.panel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        var panel = ONRTestApp.getPath('loadReviewsPage.panel');
        if (panel) {
          panel.remove();
          console.log('panel has been removed');
        }
      },

      loadReviews: function() {
        ONRTestApp.reviewsController.loadReviews();
      },

      reviewsLoaded: function() {
        this.gotoState('reviewsLoaded');
      }

    }),

    // ----------------------------------------
    //    STATE: reviewsLoaded
    // ----------------------------------------
    reviewsLoaded: Ki.State.design({
      enterState: function() {
        var panel = ONRTestApp.getPath('loadVersionsPage.panel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        var panel = ONRTestApp.getPath('loadVersionsPage.panel');
        if (panel) {
          panel.remove();
        }
      },

      loadBooks: function() {
        ONRTestApp.booksController.loadBooks();
      },

      booksLoaded: function() {
        this.gotoState('booksLoaded');
      }
    }),

    // ----------------------------------------
    //    STATE: booksLoaded
    // ----------------------------------------
    booksLoaded: Ki.State.design({
      enterState: function() {
        var panel = ONRTestApp.getPath('loadAuthorsPage.panel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        var panel = ONRTestApp.getPath('loadAuthorsPage.panel');
        if (panel) {
          panel.remove();
        }
      },

      loadAuthors: function() {
        ONRTestApp.authorsController.loadAuthors();
      },

      authorsLoaded: function() {
        this.gotoState('dataLoaded');
      }
    }),

    // ----------------------------------------
    //    STATE: authorsLoaded (=== dataLoaded)
    // ----------------------------------------
    authorsLoaded: Ki.State.design({
      enterState: function() {
        var panel = ONRTestApp.getPath('mainPage.panel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        var panel = ONRTestApp.getPath('mainPage.panel');
        if (panel) {
          panel.remove();
        }
      }

    })
  })
});

