let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read? 'read':'not read yet'}`;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

const bookList = document.querySelector('.booklist');
const addBookBtn = document.querySelector('.header .btn.new');
const addBookFormDialog = document.querySelector('.form-dialog');
const addBookForm = document.querySelector('.form-container');
const formSubmitBtn = document.querySelector('.form-dialog .btn.confirm');
const formCancelBtn =  document.querySelector('.form-dialog .btn.cancel');
const bookReadBtns = document.querySelectorAll('.book .btn.read, .book .btn.not-read');

function displayBooks(){
    const innerHTML = myLibrary.reduce((html,book,index)=>{
        return html + ` 
             <article class="book" data-index=${index}>
                 <h2>${book.title}</h2>
                 <p>by <span class="author">${book.author}</span></p>
                 <p>${book.pages} pages</p>
                 ${book.read ? '<button class="btn read">Read</button>': '<button class="btn not-read">Not Read</button>' }            
                 <button class="btn remove">Remove</button>
    </article>`;
    },'');
    bookList.innerHTML = innerHTML;
}

function addBook(event){
    event.preventDefault();
  
    const newBook = new Book(
        event.target.parentElement.querySelector('#title').value,
        event.target.parentElement.querySelector('#author').value,
        event.target.parentElement.querySelector('#pages').value,
        event.target.parentElement.querySelector('#read').checked
    );
   
    myLibrary.push(newBook);
    displayBooks();
    addBookFormDialog.close();
}

function toggleRead(event){
    const currentElement = event.target;
    const index = parseInt(currentElement.parentElement.dataset.index);
    myLibrary[index].read = !myLibrary[index].read;

    if(currentElement.classList.contains('read')){
        currentElement.classList.remove('read');
        currentElement.classList.add('not-read');
        currentElement.innerText='Not Read';
    }
    else{
        currentElement.classList.add('read');
        currentElement.classList.remove('not-read');
        currentElement.innerText='Read';
    }
}

addBookBtn.addEventListener('click',()=>{
    addBookFormDialog.showModal();
});

addBookForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const valid = addBookForm.reportValidity();
    valid && addBook(event);
});

formCancelBtn.addEventListener('click',()=>{
    addBookFormDialog.close();
});

//Add event listener to buttons of each book. 
document.addEventListener('click',(event)=>{
    if(event.target && (event.target.classList.contains('read') || event.target.classList.contains('not-read')))
        toggleRead(event);
    if(event.target && (event.target.classList.contains('remove'))){
        const index = parseInt(event.target.parentElement.dataset.index);
        myLibrary.splice(index,1);
        displayBooks();
    }
})
 
//Disable closing form modal window on pressing escape key.
window.onkeydown = function(e){
    if(e.keyCode === 27){ // Key code for ESC key
        e.preventDefault();
    }
};

const book1 = new Book('Principles', 'Ray Dalio', 488, false);
const book2 = new Book('Sapiens', 'Yuval Noah Harari', 542, true);
myLibrary.push(book1);
myLibrary.push(book2);
displayBooks();