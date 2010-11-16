// ==========================================================================
// ONRTestApp.statechart
// ==========================================================================
/*globals ONRTestApp*/

/**
   @author Jeff Pittman
*/

ONRTestApp.statechart = SC.Statechart.create({
  rootState: SC.State.design({
    initialSubstate: "STARTING",
    //trace: YES,
    //substatesAreConcurrent: YES,

    // ----------------------------------------
    //    state: STARTING
    // ----------------------------------------
    STARTING: SC.State.design({

      enterState: function() {
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
    AUTHENTICATING: SC.State.design({
      enterState: function() {
        // Call auth on the data source, which has callbacks to send events to the "authResult" functions here.
        return SC.Async.perform('logIn');
      },

      exitState: function() {
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
        this.resumeGotoState();
        this.gotoState('REJECTED');
      },

      authSuccess: function() {
        this.resumeGotoState();
        this.gotoState('AUTHENTICATED');
      }
    }),

    // ----------------------------------------
    //    state: REJECTED
    // ----------------------------------------
    REJECTED: SC.State.design({
      enterState: function() {
      },

      exitState: function() {
        this.gotoState('AUTHENTICATING');
      }
    }),

    // ----------------------------------------
    //    state: AUTHENTICATED
    // ----------------------------------------
    AUTHENTICATED: SC.State.design({
      enterState: function() {
        ONRTestApp.getPath('loadReviewsPane').append();
      },

      exitState: function() {
        ONRTestApp.getPath('loadReviewsPane').remove();
      },

      loadReviews: function() {
        this.gotoState('LOADING_REVIEWS');
      }
    }),

    // ----------------------------------------
    //    state: LOADING_REVIEWS
    // ----------------------------------------
    LOADING_REVIEWS: SC.State.design({
      enterState: function() {
        return this.performAsync('callLoadReviews');
      },

      exitState: function() {
      },

      callLoadReviews: function() {
        ONRTestApp.reviewsController.loadReviews();
      },

      reviewsDidLoad: function() {
        this.resumeGotoState();
        this.gotoState('REVIEWS_LOADED');
      }
    }),

    // ----------------------------------------
    //    state: REVIEWS_LOADED
    // ----------------------------------------
    REVIEWS_LOADED: SC.State.design({
      enterState: function() {
        console.log('REVIEWS_LOADED');
        ONRTestApp.getPath('loadVersionsPane').append();
      },

      exitState: function() {
        ONRTestApp.getPath('loadVersionsPane').remove();
      },

      loadVersions: function() {
        this.gotoState('LOADING_VERSIONS');
      }
    }),

    // ----------------------------------------
    //    state: LOADING_VERSIONS
    // ----------------------------------------
    LOADING_VERSIONS: SC.State.design({
      enterState: function() {
        return this.performAsync('callLoadVersions');
      },

      exitState: function() {
      },

      callLoadVersions: function() {
        ONRTestApp.versionsController.loadVersions();
      },

      versionsDidLoad: function() {

        this.resumeGotoState();
        this.gotoState('VERSIONS_LOADED');
      }
    }),

    // ----------------------------------------
    //    state: VERSIONS_LOADED
    // ----------------------------------------
    VERSIONS_LOADED: SC.State.design({
      enterState: function() {
        console.log('VERSIONS_LOADED');
        ONRTestApp.getPath('loadBooksPane').append();
      },

      exitState: function() {
        ONRTestApp.getPath('loadBooksPane').remove();
      },

      loadBooks: function() {
        this.gotoState('LOADING_BOOKS');
      }
    }),

    // ----------------------------------------
    //    state: LOADING_BOOKS
    // ----------------------------------------
    LOADING_BOOKS: SC.State.design({
      enterState: function() {
        return this.performAsync('callLoadBooks');
      },

      exitState: function() {
      },

      callLoadBooks: function() {
        ONRTestApp.booksController.loadBooks();
      },

      booksDidLoad: function() {
        this.resumeGotoState();
        this.gotoState('BOOKS_LOADED');
      }
    }),

    // ----------------------------------------
    //    state: BOOKS_LOADED
    // ----------------------------------------
    BOOKS_LOADED: SC.State.design({
      enterState: function() {
        console.log('BOOKS_LOADED');
        ONRTestApp.getPath('loadAuthorsPane').append();
      },

      exitState: function() {
        ONRTestApp.getPath('loadAuthorsPane').remove();
      },

      loadAuthors: function() {
        this.gotoState('LOADING_AUTHORS');
      }
    }),

    // ----------------------------------------
    //    state: LOADING_AUTHORS
    // ----------------------------------------
    LOADING_AUTHORS: SC.State.design({
      enterState: function() {
        return this.performAsync('callLoadAuthors');
      },

      exitState: function() {
      },

      callLoadAuthors: function() {
        ONRTestApp.authorsController.loadAuthors();
      },

      authorsDidLoad: function() {
        this.resumeGotoState();
        this.gotoState('AUTHORS_LOADED');
      }
    }),

    // ----------------------------------------
    //    state: AUTHORS_LOADED (=== DATA_LOADED)
    // ----------------------------------------
    AUTHORS_LOADED: SC.State.design({
      enterState: function() {
        console.log('AUTHORS_LOADED');
        var authors = ONRTestApp.store.find(SC.Query.local(ONRTestApp.Author));
        var books = ONRTestApp.store.find(SC.Query.local(ONRTestApp.Book));
        //var versions = ONRTestApp.store.find(ONRTestApp.Version);
        //var reviews = ONRTestApp.store.find(ONRTestApp.Review);

        ONRTestApp.authorsController.set('all', books);
        ONRTestApp.authorsController.set('content', authors);
        //ONRTestApp.booksController.set('content', books);
        //ONRTestApp.versionsController.set('content', versions);
        //ONRTestApp.reviewsController.set('content', reviews);

        ONRTestApp.getPath('mainPage.mainPanel').append();
      },

      exitState: function() {
      }
    })
  })
});

