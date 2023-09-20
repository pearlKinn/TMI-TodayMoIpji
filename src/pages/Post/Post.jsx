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

  if (loading) {
    return <Loading />;
  }

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
    try {
      const commentRecord = await pb.collection('comments').create(newComment);

      await pb.collection('posts').update(postId, {
        'comments+': commentRecord.id,
      });

      const commentUser = await pb.collection('users').getOne(authUser.id);

      commentRecord.expand = {
        user: commentUser,
      };

      setCommentList([...commentList, commentRecord]);
      inputRef.current.value = '';
      toast.success('댓글이 성공적으로 달렸습니다', {
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error(error.isAbort);
    }
  };

  // const handleLoginModal = () => {};

  const handleLikePost = () => {
    setLikePost(!likePost);
  };

  if (postInfo) {
    return (
      <div className={S.postWrapper}>
        <div className="formWrapper w-72 mx-auto relative">
          <Link to={'/'}>
            <img src={BackIcon} alt="뒤로가기" className="w-3 h-5 mt-2" />
          </Link>
          <SpeechBubble text={postInfo.statusEmoji} />
          <div className="relative mx-auto">
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
              className="absolute right-2 top-64 text-white flex text-outline-black"
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
          <div className="text-xs my-2">📆 {formattedDate}</div>
          <hr />
          <p className="py-3">{postInfo.content}</p>
          <hr />
          <div className={S.colLayout}>
            <h3 className="font-semibold uppercase my-2">comments</h3>
            <ul className={S.colLayout}>
              <div className={`${S.colLayout} gap-1 mb-2`}>
                {commentList.length !== 0 ? (
                  commentList?.toReversed().map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="bg-primary rounded-lg h-5 px-1 text-sm text-center">
                        {item.expand.user.username}
                      </span>
                      <span>{item.message}</span>
                    </li>
                  ))
                ) : (
                  <span className="text-sm text-gray800">
                    {'댓글이 아직 없어요 (┬┬﹏┬┬)'}
                  </span>
                )}
              </div>
            </ul>
          </div>
          <hr />
          <section>
            <h3 className="font-semibold my-2">
              <span className="text-gray800 font-semibold underline">
                {postUser.username}
              </span>{' '}
              님의 Info
            </h3>
            <div className="infoWrapper flex flex-col gap-3">
              <div className="flex flex-col text-sm gap-1">
                <span className="font-semibold text-gray900">º 체형</span>
                <span className="font-semibold text-gray900 bg-primary rounded-xl w-20 text-center">
                  {postUser?.bodyType}
                </span>
              </div>
              <div className="flex flex-col text-sm gap-1 mt-1">
                <span className=" whitespace-nowrap font-semibold">
                  º 스타일
                </span>
                <span className="flex gap-2">
                  {postUser?.style.map((item, index) => (
                    <span
                      key={index}
                      className="bg-primary rounded-xl text-xs px-1 py-1 font-semibold"
                    >
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
