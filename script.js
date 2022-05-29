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
    let title = form.elements["title"];
    let author = form.elements["author"];
    let pages = form.elements["pages"];
    let read = form.elements["read"];
    const newBook = new Book(title.value,author.value,pages.value,read.value);
    myLibrary.push(newBook);
    
    let card = document.createElement("div");
    let cardP = document.createElement("p");
    let cardsContainer = document.getElementById("cards-container");

    card.classList.add("card");
    cardP.textContent = newBook.info();
    card.appendChild(cardP);
    cardsContainer.appendChild(card);
  }

const form = document.getElementById("bookForm");
form.addEventListener("submit", function (e) {
	e.preventDefault();
  addBookToLibrary();
  form.reset();
  closeForm();
});

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  