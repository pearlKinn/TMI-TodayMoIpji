import pb from './pocketbase';

export async function createComment({ message, post, user }) {
  try {
    const commentRecord = await pb
      .collection('comments')
      .create({ message, post, user: user.id });

    await pb.collection('posts').update(post, {
      'comments+': commentRecord.id,
    });

    const commentUser = await pb.collection('users').getOne(user.id);

    commentRecord.expand = {
      user: commentUser,
    };

    return commentRecord;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
