// ==========================================================================                                                                                                                                                                                            
// ONRTestApp.dataController
// ==========================================================================
/*globals ONRTestApp*/

/** 

This controller manages the creation of data.

   @extends SC.ObjectController
   @author Jeff Pittman
*/
ONRTestApp.dataController = SC.ObjectController.create(
/** @scope ONRTestApp.dataController.prototype */ {

  //  2 authors
  //  5 books
  //  6 versions
  // 12 isbns
  // ------------
  // 25 total records
  targetRecordCountForLoading: 25,

  loadedRecordCount: 0,

  setControllersOnLoad: function() {
    // controllers were set with the initial find calls in main.js
    // (I thought the controllers needed to be set manually here)
//    if (this.targetRecordCountForLoading === this.loadedRecordCount) {
//      console.log('this.loadedRecordCount = ' + this.loadedRecordCount);
//      var content = this.get('content');
//
//      var authors = [];
//      var books = [];
//      var versions = [];
//      var isbns = [];
//
//      for (title in content) {
//        records = content[title].get('records');
//        if (records.author) {
//          if (authors.indexOf(records.author) === -1) authors.pushObject(records.author);
//        }
//        if (records.book)  books.pushObject(records.book);
//        if (records.versions) versions.pushObjects(records.versions);
//        if (records.isbns) isbns.pushObjects(records.isbns);
//      }
//      ONRTestApp.authorsController.set('content', authors);
//      ONRTestApp.booksController.set('content', books);
//      ONRTestApp.versionsController.set('content', versions);
//      ONRTestApp.isbnsController.set('content', isbns);
//    }
  }.observes('loadedRecordCount'),

  // the author records are redundant, so have to be handled specially here
  dataHasLoadedHardCheck: function() {
    var content = this.get('content');
    authors = [];
    recordCount = 0;
    var records;
    for (title in content) {
      records = content[title].get('records');

      if (records.author) {
        if (authors.indexOf(records.author) !== -1) {
          authors.pushObject(records.author)
          recordCount++;
        }
      }
      if (records.book) recordCount++;
      if (records.versions) recordCount += records.versions.get('length');
      if (records.isbns) recordCount += records.isbns.get('length');
    }
    return recordCount;
  },

  authorRecords: null,
  bookRecords: null,
  versionRecords: null,
  isbnRecords: null,

  content: { "The Adventures of Tom Sawyer":       { key: 1,
                                                     author: { key: 1, firstName: "Mark", lastName: "Twain"},
                                                     versions: [{ key: 1, format: "paperback",
                                                                          publisher: "CreateSpace",
                                                                          date: "September 18, 2010",
                                                                          language: "English",
                                                                          rank: 15445,
                                                                          height: 8.9,
                                                                          width: 6,
                                                                          depth: 0.8,
                                                                          isbns: [{ key: 1, type: 'tenLetter', text: "1440477035" },
                                                                                  { key: 2, type: 'thirteenLetter', text: "978-1440477034" }]}],
                                                     records: { author: null,
                                                                book: null,
                                                                isbns: [],
                                                                versions: []}},
             "The Adventures of Huckleberry Finn": { key: 2,
                                                     author: { key: 1, firstName: "Mark", lastName: "Twain"},
                                                     versions: [{ key: 2, format: "paperback",       
                                                                          publisher: "Bantam Classics; Reprint edition", 
                                                                          date: "February 1, 1981", 
                                                                          language: "English", 
                                                                          rank: 8671, 
                                                                          height: 6.7, 
                                                                          width: 4.1, 
                                                                          depth: 0.8,
                                                                          isbns: [{ key: 3, type: 'tenLetter', text: "0553210793"}, 
                                                                                  { key: 4, type: 'thirteenLetter', text: "978-0553210798"}]},
                                                                { key: 3, format: "hardcover", 
                                                                          publisher: "Collector's Library", 
                                                                          date: "August 1, 2010", 
                                                                          language: "English", 
                                                                          rank: 90913, 
                                                                          height: 5.9, 
                                                                          width: 4, 
                                                                          depth: 0.9,
                                                                          isbns: [{ key: 5, type: 'tenLetter', text: "1904633463"}, 
                                                                                  { key: 6, type: 'thirteenLetter', text: "978-1904633464"}]}],
                                                     records: { author: null,
                                                                book: null,
                                                                isbns: [],
                                                                versions: []}},
             "The Red Badge of Courage":           { key: 3,
                                                     author: { key: 2, firstName: "Stephen", lastName: "Crane"},
                                                     versions: [{ key: 4, format: "paperback",        
                                                                          publisher: "CreateSpace", 
                                                                          date: "July 28, 2010", 
                                                                          language: "English", 
                                                                          rank: 27221, 
                                                                          height: 9.7, 
                                                                          width: 7.8, 
                                                                          depth: 0.5,
                                                                          isbns: [{ key: 7, type: 'tenLetter', text: "145373211X"}, 
                                                                                  { key: 8, type: 'thirteenLetter', text: "978-1453732113"}]}],
                                                     records: { author: null,
                                                                book: null,
                                                                isbns: [],
                                                                versions: []}},
             "The Autobiography of Mark Twain":    { key: 4,
                                                     author: { key: 1, firstName: "Mark", lastName: "Twain"},
                                                     versions: [{ key: 5, format: "paperback",        
                                                                          publisher: "Harper Perennial Modern Classics", 
                                                                          date: "January 26, 2000", 
                                                                          language: "English", 
                                                                          rank: 42222, 
                                                                          height: 8, 
                                                                          width: 5.3, 
                                                                          depth: 1.5,
                                                                          isbns: [{ key: 9, type: 'tenLetter', text: "0060955422"}, 
                                                                                  { key: 10, type: 'thirteenLetter', text: "978-0060955427"}]}],
                                                     records: { author: null,
                                                                book: null,
                                                                isbns: [],
                                                                versions: []}},
             "Life on the Mississippi":            { key: 5,
                                                     author: { key: 1, firstName: "Mark", lastName: "Twain"},
                                                     versions: [{ key: 6, format: "paperback", 
                                                                          publisher: "General Books LLC", 
                                                                          date: "March 6, 2010", 
                                                                          language: "English", 
                                                                          rank: 705743, 
                                                                          height: 8.8, 
                                                                          width: 6, 
                                                                          depth: 0.7,
                                                                          isbns: [{ key: 11, type: 'tenLetter', text: "1770457135"}, 
                                                                                  { key: 12, type: 'thirteenLetter', text: "978-1770457133"}]}],
                                                     records: { author: null,
                                                                book: null,
                                                                isbns: [],
                                                                versions: []}}},

  initiateDataCreation: function() {
    ONRTestApp.isbnsController.createISBNs();
    // Feeder observations first, then the other creation calls will fire in
    // succession, waiting on READY_CLEAN for dependencies.
//    for (var title in this.get('content')) {
//      console.log('title: ' + title);
//      ONRTestApp.isbnsController.createISBNs(title);
//    }
  }

});


