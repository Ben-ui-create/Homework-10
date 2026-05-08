import { v4 as uuidV4 } from 'uuid';
import { getDataPath, readJSON, writeJSON } from './users.js';

const postsFile = getDataPath('posts.json');

export async function getAllPosts() {
  try {
    const posts = await readJSON(postsFile);

    return posts;
  } catch (e) {
    console.error(e);

    return [];
  }
}

export async function getPostById(id) {
  try {
    const posts = await readJSON(postsFile);

    return posts.find(post => post.id === id) || null;
  } catch (e) {
    console.error(e);

    return null;
  }
}

export async function createPost(data) {
  try {
    const posts = await readJSON(postsFile);

    const newPost = {
      id: uuidV4(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);

    await writeJSON(postsFile, posts);

    return newPost;
  } catch (e) {
    console.error(e);

    return null;
  }
}

export async function updatePost(id, data) {
  try {
    const posts = await readJSON(postsFile);

    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
      return null;
    }

    posts[postIndex] = {
      ...posts[postIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await writeJSON(postsFile, posts);

    return posts[postIndex];
  } catch (e) {
    console.error(e);

    return null;
  }
}

export async function deletePost(id) {
  try {
    const posts = await readJSON(postsFile);

    const filteredPosts = posts.filter(post => post.id !== id);

    if (filteredPosts.length === posts.length) {
      return false;
    }

    await writeJSON(postsFile, filteredPosts);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};