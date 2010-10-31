// ==========================================================================
// Project:   ONRTestApp.Book Fixtures
// ==========================================================================
/*globals ONRTestApp*/

sc_require('models/book');

ONRTestApp.Book.FIXTURES = [
  { id: 1, title: "The Adventures of Tom Sawyer",       author: 1, versions: [1]   },
  { id: 2, title: "The Adventures of Huckleberry Finn", author: 1, versions: [2,3] },
  { id: 3, title: "The Red Badge of Courage",           author: 2, versions: [4]   },
  { id: 4, title: "The Autobiography of Mark Twain",    author: 1, versions: [5]   },
  { id: 5, title: "Life on the Mississippi",            author: 1, versions: [6,7] },
  { id: 6, title: "The Jungle Book",                    author: 3, versions: [8]   },
  { id: 7, title: "Captains Courageous",                author: 3, versions: [9]   }
];


