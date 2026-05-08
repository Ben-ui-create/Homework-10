const postsContainer = document.getElementById('posts');
const postForm = document.getElementById('postForm');

async function fetchPosts() {
  try {
    const response = await fetch('/posts');
    const posts = await response.json();

    renderPosts(posts);
  } catch (e) {
    console.error(e);
  }
}

function renderPosts(posts) {
  postsContainer.innerHTML = '';

  if (!posts.length) {
    postsContainer.innerHTML = '<p>No posts yet</p>';

    return;
  }

  posts.forEach(post => {
    const div = document.createElement('div');

    div.className = 'post';

    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>

      <button onclick="deletePost('${post.id}')">
        Delete
      </button>
    `;

    postsContainer.appendChild(div);
  });
}

postForm.addEventListener('submit', async e => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    postForm.reset();

    fetchPosts();
  } catch (e) {
    console.error(e);
  }
});

async function deletePost(id) {
  try {
    await fetch(`/posts/${id}`, {
      method: 'DELETE',
    });

    fetchPosts();
  } catch (e) {
    console.error(e);
  }
}

fetchPosts();