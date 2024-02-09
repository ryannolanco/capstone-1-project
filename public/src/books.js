const { findAccountById } = require('./accounts.js')

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const sortedBooks = [];
  const checkedOut = [];
  const returnedBooks = [];

  for (let book in books) {
    let {borrows} = books[book]
    if (borrows.every((borrow) => borrow.returned === true) ? returnedBooks.push(book) : checkedOut.push(book)); 
  }
  sortedBooks.push(checkedOut,returnedBooks)
  return sortedBooks
} 

function getBorrowersForBook({borrows}, accounts) {
  const members = [];
  for (let i = 0; i < borrows.length; i++) {
    let {id, returned} = borrows[i];
    const account = findAccountById(accounts, id)
    const member = {...account, returned}
    members.push(member)
  }
   return members.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
