import { readPost } from '@/api/post';
import { useQuery } from '@tanstack/react-query';

export function usePostQuery(postId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => readPost(postId),
  });
  return { data, error, isLoading };
}
