let myLibrary = [];

class Book {

    constructor(title, author, pages, read){
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }

    info(){
      return `Title: ${this.title} \r\nAuthor: ${this.author} \r\nPages: ${this.pages}`;
    }
}

function addBookToLibrary() {
  //get values from form 
    let title = form.elements["title"];
    let author = form.elements["author"];
    let pages = form.elements["pages"];
    let read = form.elements["read"];

  //create newBook and add it to Library
    const newBook = new Book(title.value,author.value,pages.value,read.checked);
    myLibrary.push(newBook);
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

  //create Card
    createCard(newBook);
  }

function createCard(newBook){
  //get container where the card will be created
  let cardsContainer = document.getElementById("cards-container");

  //create the card elements
  let card = document.createElement("div");
  let cardP = document.createElement("p");
  let cardsButton = document.createElement("button");
  let cardCheckbox = document.createElement("input");
  let label = document.createElement("label");
  
  //add the book content to p
  cardP.textContent = newBook.info();

  //add checkbox attributes
  cardCheckbox.type = "checkbox";
  cardCheckbox.id =  "read";
  cardCheckbox.name = "read";
  cardCheckbox.setAttribute("onclick","updateCheckbox(this)");
  label.htmlFor =  "read" ;
  label.textContent = "Read:";
  cardCheckbox.checked = newBook.read;
  
  //add delete button class and attribute
  cardsButton.classList.add("cardButton");
  cardsButton.setAttribute("onclick","deleteCard(this)");

  //add classlist to card
  card.classList.add("card");

  //append Children 
  card.appendChild(cardP);
  label.appendChild(cardCheckbox);
  card.appendChild(label);
  card.appendChild(cardsButton);
  cardsContainer.appendChild(card);
}

//Add new book when form is submitted
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

function deleteCard(e) {
  //identify the index of the card we want to delete, and delete from myLibrary
  let i = 0;
  child = e.closest(".card");
  while( (child = child.previousSibling) != null ) {
    i++;
  }
  myLibrary.splice(i-1,1);
  window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

  //delete card
  e.closest(".card").remove();
}

function updateCheckbox(e) {
  //identify the index of the card we want to update, and update their checkbox on myLibrary
  let i = 0;
  child = e.closest(".card");
  while( (child = child.previousSibling) != null ) {
    i++;
  }
  myLibrary[i-1].read = e.checked;
  window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

////Search Book////

let search = document.getElementById("search"); // Get the input field

// Execute the function when the user presses a key on the keyboard
search.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    filterBook();
  }
});

function filterBook() {
  search = document.getElementById("search");
  filter = search.value.toUpperCase(); //convert to uppercase to be non-case sensitive
 
  // Check if there is something to search, if yes, it will filter, otherwise will show all
  if(filter.length!==0){
    // Loop through all myLibrary books, and hide those who don't match the search query
    for (i = 0; i < myLibrary.length; i++) {
      titleSearch = myLibrary[i].title.toUpperCase();
      if (titleSearch == filter) {
        document.getElementById("cards-container").children[i].style.display = "";
      } else {
        document.getElementById("cards-container").children[i].style.display = "none";
      }
    }
  } 
  // Show all books
  else {
    for (i = 0; i < myLibrary.length; i++) {
      document.getElementById("cards-container").children[i].style.display = "";
    }
  }
}

/////localStorage/////
window.addEventListener("load", function(event) {
  // Only start if myLibrary is in the local storage
  if (window.localStorage.getItem('myLibrary')){
    // Get mylibrary from local storage and convert it to constructor 
    let temp = (JSON.parse(localStorage.getItem('myLibrary'))); 
    myLibrary= temp.map(temp => new Book(temp.title, temp.author, temp.pages, temp.read));
    // create cards for each item of myLibrary
    if (myLibrary.length !== 0){;
    myLibrary.forEach(item => createCard(item));
    }
  }
});