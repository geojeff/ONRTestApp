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
    trace: YES,
    //substatesAreConcurrent: YES,

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
        this.gotoState('authenticating');
      }
    }),

    // ----------------------------------------
    //    STATE: authenticating
    // ----------------------------------------
    authenticating: Ki.State.design({
      enterState: function() {
        // Call auth on the data source, which has callbacks to send events to the "authResult" functions here.
        return Ki.Async.perform('logIn');
      },

      exitState: function() {
        console.log('exiting');
      },

      logIn: function() {
        var loginName = ONRTestApp.loginController.get('loginName');
        var password = ONRTestApp.loginController.get('password');

        ONRTestApp.store.dataSource.connect(ONRTestApp.store, function() {
          ONRTestApp.store.dataSource.authRequest(loginName, password);
        });
      },

      authFailure: function(errorMessage) {
        ONRTestApp.loginController.set('loginErrorMessage', errorMessage);
        this.gotoState('rejected');
      },

      authSuccess: function() {
        console.log('ONRTestApp.statechart.gotoChartSuspended ' + ONRTestApp.statechart.get('gotoStateSuspended'));
        this.gotoState('authenticated');
      }

    }),

    // ----------------------------------------
    //    STATE: authenticated
    // ----------------------------------------
    authenticated: Ki.State.design({
      enterState: function() {
        return Ki.Async.perform('loadReviews');
      },

      exitState: function() {
        console.log('reviews were loaded');
      },

      loadReviews: function() {
        ONRTestApp.reviewsController.loadReviews();
      },

      reviewsDidLoad: function() {
        console.log('reviews were loaded');
        this.gotoState('reviewsLoaded');
      }

    }),

    // ----------------------------------------
    //    STATE: reviewsLoaded
    // ----------------------------------------
    reviewsLoaded: Ki.State.design({
      enterState: function() {
        var panel = ONRTestApp.getPath('loadReviewsPage.panel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        console.log('exiting reviewsLoaded state');
        var panel = ONRTestApp.getPath('loadReviewsPage.panel');
        if (panel) {
          panel.remove();
        }
      },

      loadVersions: function() {
        console.log('ONRTestApp.statechart.gotoChartSuspended ' + ONRTestApp.statechart.get('gotoStateSuspended'));
        console.log('ONRTestApp.statechart.gotoChartActive ' + ONRTestApp.statechart.get('gotoStateActive'));
        //debugger;
        this.gotoState('loadingVersions');
      }

    }),

    // ----------------------------------------
    //    STATE: loadingVersions
    // ----------------------------------------
    loadingVersions: Ki.State.design({
      enterState: function() {
        return Ki.Async.perform('loadVersions');
      },

      exitState: function() {
        console.log('versions were loaded');
      },

      loadVersions: function() {
        ONRTestApp.versionsController.loadVersions();
      },

      versionsDidLoad: function() {
        console.log('versions were loaded');
        this.gotoState('versionsLoaded');
      }

    }),

    // ----------------------------------------
    //    STATE: versionsLoaded
    // ----------------------------------------
    versionsLoaded: Ki.State.design({
      enterState: function() {
        console.log('whut whut whut');
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

      booksDidLoad: function() {
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

      authorsDidLoad: function() {
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

