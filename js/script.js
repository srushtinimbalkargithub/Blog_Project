const searchForm = document.querySelector('form[action="/search.html"]');
const searchInput = document.querySelector('input[name="query"]');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetch('/search', {
      method: 'GET',
      params: {
        query: query
      }
    })
   .then(response => response.json())
   .then(data => {
      const searchResults = document.querySelector('.search-results');
      searchResults.innerHTML = '';
      data.forEach((article) => {
        const articleHTML = `
          <div class="home-article">
            <div class="home-article-img">
              <img src="${article.image}" alt="article">
            </div>
            <div class="home-article-content font1">
              <a href="/blogpost.html">
                <h3>${article.title}</h3>
              </a>
              <div>${article.author}</div>
              <span>${article.date} | ${article.readTime} min read</span>
            </div>
          </div>
        `;
        searchResults.innerHTML += articleHTML;
      });
    })
   .catch((error) => {
      console.error(error);
    });
  }
});




const yearFilter = document.querySelector('input[name="year"]');
const article = document.querySelectorAll('.home-article');

yearFilter.addEventListener('change', () => {
  const selectedYear = yearFilter.value;
  articles.forEach((article) => {
    const articleYear = article.querySelector('span').textContent.split(' | ')[0];
    if (articleYear === selectedYear) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
});





const articles = document.querySelectorAll('.home-article');
const paginationContainer = document.querySelector('.pagination');
const pageSize = 5;

let currentPage = 1;

function paginateArticles() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  articles.forEach((article, index) => {
    if (index >= startIndex && index < endIndex) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

paginateArticles();

paginationContainer.innerHTML = '';
for (let i = 1; i <= Math.ceil(articles.length / pageSize); i++) {
  const pageLink = document.createElement('a');
  pageLink.href = '#';
  pageLink.textContent = i;
  pageLink.addEventListener('click', () => {
    currentPage = i;
    paginateArticles();
  });
  paginationContainer.appendChild(pageLink);
}







const readMoreButtons = document.querySelectorAll('.read-more');

readMoreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Toggle the visibility of the article content
    const articleContent = button.parentNode.querySelector('.article-content');
    articleContent.classList.toggle('show');
  });
});



const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.addEventListener('click', () => {
  // Load more articles using AJAX or a library like jQuery
  // For example, you can use the following code:
  $.ajax({
    url: '/more-articles',
    method: 'GET',
    success: (data) => {
      const articlesContainer = document.querySelector('.home-articles');
      articlesContainer.innerHTML += data;
    }
  });
});


const likeBtn = document.querySelector('.like-btn');
const dislikeBtn = document.querySelector('.dislike-btn');
const likeCount = document.querySelector('.like-count');
const dislikeCount = document.querySelector('.dislike-count');

let likes = 0;
let dislikes = 0;

likeBtn.addEventListener('click', () => {
  likes++;
  likeCount.textContent = likes;
  // Send a request to the server to update the like count
  fetch('/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: likes })
  });
});

dislikeBtn.addEventListener('click', () => {
  dislikes++;
  dislikeCount.textContent = dislikes;
  // Send a request to the server to update the dislike count
  fetch('/dislike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dislikes: dislikes })
  });
});