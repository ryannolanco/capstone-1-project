function getTotalBooksCount(books) {
  let counter = 0;
  for (let book in books) {
    counter += 1
  } return counter
}

function getTotalAccountsCount(accounts) {
  let counter = 0;
  for (let account in accounts) {
    counter += 1
  } return counter
}

function getBooksBorrowedCount(books) {
  let counter = 0;
  for (let book in books) {
    const { borrows } = books[book]
    if (borrows.some((borrowed) => borrowed.returned === false)) counter += 1
  } return counter
}

function getMostCommonGenres(books) {
  let genreCount = {};
  books.forEach((book) => {
    const { genre } = book;
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });
  return Object.keys(genreCount)
  .map((genre) => ({ name: genre, count: genreCount[genre] }))
  .sort((genreA, genreB) => genreB.count - genreA.count)
  .slice(0, 5);
} 

function getMostPopularBooks(books) {
  let bookCount = {};
  books.forEach((book) => {
    const { borrows, title } = book;
    borrows.forEach((borrow) => {
      bookCount[title] = (bookCount[title] || 0) + 1;
    })
  })
  return Object.keys(bookCount)
    .map((title) => ({name: title, count: bookCount[title]}))
    .sort((titleA, titleB) => titleB.count - titleA.count)
    .slice(0,5);
 }

 function getMostPopularAuthors(books, authors) {
  const authorCount = {};
  books.forEach((book) => {
    const {authorId, borrows} = book;
    const author = getAuthorInfo(authorId, authors);
    let counter = 0;
    borrows.forEach((borrowed) => counter++)
    authorCount[author] = (authorCount[author] || 0) + counter;
  })
  return Object.keys(authorCount)
  .map((author) => ({name: author, count: authorCount[author]}))
  .sort((countA, countB) => countB.count - countA.count)
  .slice(0, 5);
}

/*helper function*/
function getAuthorInfo(authorId, authors){
  for (let i = 0; i < authors.length; i++) {
    const author = authors[i]
    if (authorId === author["id"]){
      let {name: {first, last}} = author
      return `${first} ${last}`
    }
  }
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
