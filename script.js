let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function(){
  return `Title: ${this.title} \r\nAuthor: ${this.author} \r\nPages: ${this.pages} \r\nRead: ${this.read}`;
}

function addBookToLibrary() {
    let title = prompt("Please enter the title");
    let author = prompt("Please enter the author");
    let pages = prompt("Please enter the pages");
    let read = prompt("Did you read the book?");
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    
    let card = document.createElement("div");
    let cardP = document.createElement("p");
    let cardsContainer = document.getElementById("cards-container");

    card.classList.add("card");
    cardP.textContent = newBook.info();
    card.appendChild(cardP);
    cardsContainer.appendChild(card);
  }

document.getElementById("addBtn").addEventListener('click', () => {
    addBookToLibrary();
})

/*myLibrary.forEach(function(element, index, array){
    let tag = document.createElement("p");
    let text = document.createTextNode(myLibrary[index].title);
    tag.appendChild(text);
    let cont = document.getElementById("container");
    cont.appendChild(tag);
  });*/
