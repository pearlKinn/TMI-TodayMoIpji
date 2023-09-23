import pb from './pocketbase';

export async function readPost(postId) {
  try {
    const post = await pb
      .collection('posts')
      .getOne(postId, { expand: 'comments.user, user', requestKey: null });
    return post;
  } catch (error) {
    if (!(error in DOMException)) {
      console.error(error);
    }
  }
}

export async function createPost(data) {
  await pb.collection('posts').create(data);
}
