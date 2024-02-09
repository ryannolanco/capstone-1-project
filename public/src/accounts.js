function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows({id}, books) {
  let count = 0;
  for (let book in books) {
    let {borrows} = books[book]
    for (let i = 0; i < borrows.length; i++) {
      if (borrows[i].id === id) count += 1
    }
  } 
  return count 
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = books.filter((book) => book.borrows[0].returned === false && book.borrows[0].id === account.id);
  console.log(booksPossessed)
  let bookDetails = booksPossessed.map((detail) => ({
    ...detail, author: authors.find((author) => author.id === detail.authorId)
  }));
   return bookDetails;
}
   


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
