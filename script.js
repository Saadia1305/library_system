// Sample initial books data
let books = [
    { id: 1, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, status: "Available" },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, status: "Available" },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, status: "Available" }
];

// DOM elements
const bookList = document.getElementById('bookList');
const addBookBtn = document.getElementById('addBookBtn');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const bookYearInput = document.getElementById('bookYear');

// Render books
function renderBooks() {
    bookList.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        const statusClass = book.status === 'Available' ? 'status-available' : 'status-borrowed';
        const borrowDisabled = book.status !== 'Available' ? 'btn-disabled' : '';
        const returnDisabled = book.status !== 'Borrowed' ? 'btn-disabled' : '';
        
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">Author: ${book.author}</div>
            <div class="book-year">Year: ${book.year}</div>
            <div class="book-status ${statusClass}">Status: ${book.status}</div>
            <div class="book-actions">
                <button class="btn-borrow ${borrowDisabled}" data-id="${book.id}">Borrow</button>
                <button class="btn-return ${returnDisabled}" data-id="${book.id}">Return</button>
            </div>
        `;
        
        bookList.appendChild(bookCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.btn-borrow').forEach(btn => {
        if (!btn.classList.contains('btn-disabled')) {
            btn.addEventListener('click', borrowBook);
        }
    });
    
    document.querySelectorAll('.btn-return').forEach(btn => {
        if (!btn.classList.contains('btn-disabled')) {
            btn.addEventListener('click', returnBook);
        }
    });
}

// Borrow a book
function borrowBook(e) {
    const bookId = parseInt(e.target.dataset.id);
    const book = books.find(b => b.id === bookId);
    
    if (book && book.status === 'Available') {
        book.status = 'Borrowed';
        renderBooks();
        alert(`You have borrowed "${book.title}"`);
    }
}

// Return a book
function returnBook(e) {
    const bookId = parseInt(e.target.dataset.id);
    const book = books.find(b => b.id === bookId);
    
    if (book && book.status === 'Borrowed') {
        book.status = 'Available';
        renderBooks();
        alert(`You have returned "${book.title}"`);
    }
}

// Add a new book
function addBook() {
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const year = bookYearInput.value.trim();
    
    if (!title || !author || !year) {
        alert('Please fill in all fields');
        return;
    }
    
    if (isNaN(year) || year < 0) {
        alert('Please enter a valid year');
        return;
    }
    
    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        year: parseInt(year),
        status: 'Available'
    };
    
    books.push(newBook);
    renderBooks();
    
    // Clear inputs
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookYearInput.value = '';
    
    alert(`"${newBook.title}" has been added to the library`);
}

// Event listeners
addBookBtn.addEventListener('click', addBook);

// Initial render
renderBooks();
