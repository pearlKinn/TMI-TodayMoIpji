import pb from '@/api/pocketbase';
import FormInput from '@/components/FormInput/FormInput';
import Heart from '@/components/Heart';
import Loading from '@/components/Loading/Loading';
import MoveSlide from '@/components/MoveSlide/MoveSlide';
import SpeechBubble from '@/components/SpeechBubble/SpeechBubble';
import useStorage from '@/hooks/useStorage';
import {
  formatDate,
  getNextSlideIndex,
  getPbImageURL,
  getPreviousSlideIndex,
} from '@/utils';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import S from './Post.module.css';
import BackIcon from '/BackIcon.svg';
import { useMutation } from '@tanstack/react-query';

function Post() {
  const { postId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postInfo, setPostInfo] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const inputRef = useRef(null);
  const inputDateString = postInfo?.created;
  const formattedDate = formatDate(inputDateString);
  const [likePost, setLikePost] = useState(true);
  const { storageData } = useStorage('pocketbase_auth');
  const [loading, setLoading] = useState(true);
  const [postUser, setPostUser] = useState(null);
  const authUser = storageData?.model;

  const handleNextSlide = () => {
    setCurrentIndex(
      getNextSlideIndex(currentIndex, getPbImageURL(postInfo, 'photo'))
    );
  };

  const handelPrevSlide = () => {
    setCurrentIndex(
      getPreviousSlideIndex(currentIndex, getPbImageURL(postInfo, 'photo'))
    );
  };

  useEffect(() => {
    async function getPost() {
      try {
        const post = await pb
          .collection('posts')
          .getOne(postId, { expand: 'comments.user, user', requestKey: null });
        const { expand: postExpandData } = post;
        setPostInfo(post);
        setLoading(false);
        setPostUser(postExpandData.user);
        if (post.comments.length !== 0) setCommentList(postExpandData.comments);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error(error);
        }
      }
    }
    getPost();
  }, [postId]);

  const commentMutation = useMutation(
    async (newComment) => {
      try {
        const commentRecord = await pb
          .collection('comments')
          .create(newComment);

        await pb.collection('posts').update(postId, {
          'comments+': commentRecord.id,
        });

        const commentUser = await pb.collection('users').getOne(authUser.id);

        commentRecord.expand = {
          user: commentUser,
        };

        return commentRecord;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: (commentRecord) => {
        setCommentList((prevCommentList) => [
          ...prevCommentList,
          commentRecord,
        ]);
        inputRef.current.value = '';

        toast.success('댓글이 성공적으로 달렸습니다', {
          position: 'top-center',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      },
    }
  );

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error('로그인이 필요한 작업입니다', {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
    }

    if (inputRef.current.value.trim() === '') {
      toast.error('댓글을 입력해주세요', {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
    }

    const newComment = {
      message: inputRef.current.value,
      post: postId,
      user: authUser.id,
    };

    commentMutation.mutateAsync(newComment);
  };

  const handleLikePost = () => {
    setLikePost(!likePost);
  };

  if (loading) {
    return <Loading />;
  }

  if (postInfo) {
    return (
      <div className={S.postWrapper}>
        <Link to={'/'}>
          <img src={BackIcon} alt="뒤로가기" className="w-3 h-5 mt-2 ml-2" />
        </Link>
        <div className={S.formWrapper}>
          <SpeechBubble text={postInfo.statusEmoji} />
          <div className={S.postInnerWrapper}>
            <div className={S.photoWrapper}>
              {postInfo.photo?.map((_, index) => (
                <div
                  key={index}
                  className={`${index === currentIndex ? '' : 'hidden'}`}
                >
                  <img
                    src={getPbImageURL(postInfo, 'photo')[currentIndex]}
                    className={S.uploadImage}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className={S.heartBtn}
              onClick={handleLikePost}
            >
              {likePost ? <Heart /> : <Heart color="#FF3A3A" />}
            </button>
          </div>
          <MoveSlide
            prevFunc={handelPrevSlide}
            nextFunc={handleNextSlide}
            disabled={postInfo.photo.length <= 1 ? true : false}
          />
          <div className={S.postingDate}>📆 {formattedDate}</div>
          <hr />
          <p className={S.title}>{postInfo.content}</p>
          <hr />
          <div className={S.colLayout}>
            <h3 className={S.title}>COMMENTS</h3>
            <ul className={S.colLayout}>
              <div className={`${S.colLayout} gap-1 pb-3`}>
                {commentList.length !== 0 ? (
                  commentList?.toReversed().map((item, index) => (
                    <li key={index} className={S.commentWrapper}>
                      <span className={S.commentUser}>
                        {item.expand.user.username}
                      </span>
                      <span>{item.message}</span>
                    </li>
                  ))
                ) : (
                  <span className={S.noneComment}>
                    {'댓글이 아직 없어요 (┬┬﹏┬┬)'}
                  </span>
                )}
              </div>
            </ul>
          </div>
          <hr />
          <section>
            <h3 className={S.title}>
              <span className="text-gray800 font-semibold underline">
                {postUser.username}
              </span>{' '}
              님의 Info
            </h3>
            <div className={S.postingUserInfoWrapper}>
              <div className={S.postingUserItemWrapper}>
                <span className={S.postingItemTitle}>º 체형</span>
                <span className={S.bodyType}>{postUser?.bodyType}</span>
              </div>
              <div className={S.postingUserItemWrapper}>
                <span className={S.postingItemTitle}>º 스타일</span>
                <span className={S.styleWrapper}>
                  {postUser?.style.map((item, index) => (
                    <span key={index} className={S.styleItem}>
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </section>
          <div className={S.inputWrapper}>
            <FormInput
              type="text"
              name="comment"
              label="댓글창"
              ref={inputRef}
            />
            <button
              onClick={handleCommentSubmit}
              type="submit"
              aria-label="댓글 게시"
              className={S.inputBtn}
            >
              게시
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
