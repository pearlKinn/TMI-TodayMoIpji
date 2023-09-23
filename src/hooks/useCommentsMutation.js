import { createComment } from '@/api/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCommentsMutation(emptyFormInputValue) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ message, post, user }) =>
      createComment({ message, post, user }),
    onMutate: async ({ message, post, user }) => {
      await queryClient.cancelQueries({ queryKey: ['post', post] });
      const previousPost = queryClient.getQueryData(['post', post]);
      queryClient.setQueryData(['post', post], (old) => {
        if (!old.expand.comments) {
          old.expand.comments = [
            {
              message,
              expand: {
                user: {
                  username: user.username,
                },
              },
            },
          ];
        } else {
          old.expand.comments = [
            ...old.expand.comments,
            {
              message,
              expand: {
                user: {
                  username: user.username,
                },
              },
            },
          ];
        }
        return old;
      });

      return { previousPost };
    },
    onSuccess: () => {
      toast.success('댓글이 성공적으로 달렸습니다', {
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      emptyFormInputValue();
    },
    onError: (error, newPostInfo, context) => {
      queryClient.setQueryData(
        ['post', newPostInfo.post],
        context.previousPost
      );
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['post', data.post] });
    },
  });
  return { mutate };
}
