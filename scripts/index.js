
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('bookResults');


async function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.docs.slice(0, 10); // return top 10 results
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}


function displayBooks(books) {
  resultsDiv.innerHTML = '';

  if (books.length === 0) {
    resultsDiv.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach(book => {
    const coverId = book.cover_i;
    const imgSrc = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : 'https://via.placeholder.com/150x200?text=No+Cover';

    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="Book cover" />
      <h3>${book.title}</h3>
      <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
    `;

    resultsDiv.appendChild(card);
  });
}


document.body.style.backgroundImage = "url('./images/pexels-mccutcheon-1148399.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (query) {
    const books = await searchBooks(query);
    displayBooks(books);
  }
});