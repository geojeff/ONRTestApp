// ==========================================================================
// ONRTestApp.statechart
// ==========================================================================
/*globals ONRTestApp*/

/**
   @author Jeff Pittman
*/

ONRTestApp.statechart = Ki.Statechart.create({
  rootState: Ki.State.design({
    initialSubstate: "STARTING",
    //trace: YES,
    //substatesAreConcurrent: YES,

    // ----------------------------------------
    //    state: STARTING
    // ----------------------------------------
    STARTING: Ki.State.design({

      enterState: function() {
        var authors = ONRTestApp.store.find(SC.Query.local(ONRTestApp.Author));
        var books = ONRTestApp.store.find(SC.Query.local(ONRTestApp.Book));
        //var versions = ONRTestApp.store.find(ONRTestApp.Version);
        //var reviews = ONRTestApp.store.find(ONRTestApp.Review);

        ONRTestApp.authorsController.set('all', books);
        ONRTestApp.authorsController.set('content', authors);
        //ONRTestApp.booksController.set('content', books);
        //ONRTestApp.versionsController.set('content', versions);
        //ONRTestApp.reviewsController.set('content', reviews);
        
        var panel = ONRTestApp.getPath('loginPanel');
        if (panel) {
          panel.append();
          panel.focus();
        }
      },

      exitState: function() {
        var panel = ONRTestApp.getPath('loginPanel');
        if (panel) {
          panel.remove();
        }
      },

      authenticate: function() {
        this.gotoState('AUTHENTICATING');
      }
    }),

    // ----------------------------------------
    //    state: AUTHENTICATING
    // ----------------------------------------
    AUTHENTICATING: Ki.State.design({
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
        this.gotoState('AUTHENTICATED');
      }

    }),

    // ----------------------------------------
    //    state: AUTHENTICATED
    // ----------------------------------------
    AUTHENTICATED: Ki.State.design({
      enterState: function() {
        console.log('entering AUTHENTICATED state');
        ONRTestApp.getPath('loadReviewsPane').append();
      },

      exitState: function() {
        console.log('exiting AUTHENTICATED state');
        ONRTestApp.getPath('loadReviewsPane').remove();
      },

      loadReviews: function() {
        this.gotoState('LOADING_REVIEWS');
      }

    }),

    // ----------------------------------------
    //    state: LOADING_REVIEWS
    // ----------------------------------------
    LOADING_REVIEWS: Ki.State.design({
      enterState: function() {
        return this.performAsync('callLoadReviews');
      },

      exitState: function() {
        console.log('exiting loadingReviews state');
      },

      callLoadReviews: function() {
        ONRTestApp.reviewsController.loadReviews();
      },

      reviewsDidLoad: function() {
        console.log('reviews were loaded');
        this.resumeGotoState();
        this.gotoState('REVIEWS_LOADED');
      }

    }),

    // ----------------------------------------
    //    state: REVIEWS_LOADED
    // ----------------------------------------
    REVIEWS_LOADED: Ki.State.design({
      enterState: function() {
        console.log('entering REVIEWS_LOADED state');
        ONRTestApp.getPath('loadVersionsPane').append();
      },

      exitState: function() {
        console.log('exiting REVIEWS_LOADED state');
        ONRTestApp.getPath('loadVersionsPane').remove();
      },

      loadVersions: function() {
        this.gotoState('LOADING_VERSIONS');
      }

    }),

    // ----------------------------------------
    //    state: LOADING_VERSIONS
    // ----------------------------------------
    LOADING_VERSIONS: Ki.State.design({
      enterState: function() {
        console.log('entering loadingVersions state');
        return this.performAsync('callLoadVersions');
      },

      exitState: function() {
        console.log('exiting loadingVersions state');
      },

      callLoadVersions: function() {
        ONRTestApp.versionsController.loadVersions();
      },

      versionsDidLoad: function() {
        console.log('versions were loaded');

        this.resumeGotoState();
        this.gotoState('VERSIONS_LOADED');
      }

    }),

    // ----------------------------------------
    //    state: VERSIONS_LOADED
    // ----------------------------------------
    VERSIONS_LOADED: Ki.State.design({
      enterState: function() {
        console.log('entering VERSIONS_LOADED state');
        ONRTestApp.getPath('loadBooksPane').append();
      },

      exitState: function() {
        console.log('exiting VERSIONS_LOADED state');
        ONRTestApp.getPath('loadBooksPane').remove();
      },

      loadBooks: function() {
        this.gotoState('LOADING_BOOKS');
      }

    }),

    // ----------------------------------------
    //    state: LOADING_BOOKS
    // ----------------------------------------
    LOADING_BOOKS: Ki.State.design({
      enterState: function() {
        return this.performAsync('callLoadBooks');
      },

      exitState: function() {
        console.log('exiting loadingBooks state');
      },

      callLoadBooks: function() {
        ONRTestApp.booksController.loadBooks();
      },

      booksDidLoad: function() {
        console.log('books were loaded');
        this.resumeGotoState();
        this.gotoState('BOOKS_LOADED');
      }

    }),

    // ----------------------------------------
    //    state: BOOKS_LOADED
    // ----------------------------------------
    BOOKS_LOADED: Ki.State.design({
      enterState: function() {
        console.log('entering BOOKS_LOADED state');
        ONRTestApp.getPath('loadAuthorsPane').append();
        console.log('whuddup');
      },

      exitState: function() {
        console.log('exiting BOOKS_LOADED state');
        ONRTestApp.getPath('loadAuthorsPane').remove();
      },

      loadAuthors: function() {
        this.gotoState('LOADING_AUTHORS');
      }

    }),

    // ----------------------------------------
    //    state: LOADING_AUTHORS
    // ----------------------------------------
    LOADING_AUTHORS: Ki.State.design({
      enterState: function() {
        return this.performAsync('callLoadAuthors');
      },

      exitState: function() {
        console.log('exiting loadingAuthors state');
      },

      callLoadAuthors: function() {
        ONRTestApp.authorsController.loadAuthors();
      },

      authorsDidLoad: function() {
        console.log('authors were loaded');
        this.resumeGotoState();
        this.gotoState('AUTHORS_LOADED');
      }

    }),

    // ----------------------------------------
    //    state: AUTHORS_LOADED (=== DATA_LOADED)
    // ----------------------------------------
    AUTHORS_LOADED: Ki.State.design({
      enterState: function() {
        ONRTestApp.getPath('mainPage.mainPanel').append();
      },

      exitState: function() {
        console.log('DONE');
      }

    })
  })
});

