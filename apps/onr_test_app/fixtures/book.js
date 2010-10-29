// ==========================================================================
// Project:   ONRTestApp.Book Fixtures
// ==========================================================================
/*globals ONRTestApp*/

sc_require('models/book');

ONRTestApp.Book.FIXTURES = [
  { key: 1, title: "The Adventures of Tom Sawyer",       author: 1, versions: [1]   },
  { key: 2, title: "The Adventures of Huckleberry Finn", author: 1, versions: [2,3] },
  { key: 3, title: "The Red Badge of Courage",           author: 2, versions: [4]   },
  { key: 4, title: "The Autobiography of Mark Twain",    author: 1, versions: [5]   },
  { key: 5, title: "Life on the Mississippi",            author: 1, versions: [6]   }
];


