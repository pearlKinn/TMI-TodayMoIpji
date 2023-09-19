import pb from '@/api/pocketbase';
import FormInput from '@/components/FormInput/FormInput';
import Heart from '@/components/Heart';
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
          .getOne(postId, { expand: 'comments.user' });
        const { expand: postExpandData } = post;
        setPostInfo(post);
        setCommentList(postExpandData.comments);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
        }
      }
    }
    getPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      console.log('로그인 해주세요');
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

      setCommentList([...commentList, newComment]);
      inputRef.current.value = '';
      toast.success('댓글이 성공적으로 달렸습니다', {
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikePost = () => {
    setLikePost(!likePost);
  };

  if (postInfo) {
    return (
      <div className={S.postWrapper}>
        <div className="formWrapper w-72 mx-auto relative">
          <Link to={'/'}>
            <img src="/BackIcon.svg" alt="뒤로가기" className="w-3 h-5 mt-2" />
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
          <div className="text-xs">{formattedDate}</div>
          <hr />
          <span>{postInfo.content}</span>
          <hr className="mt-2" />
          <div className={S.colLayout}>
            <span className="font-semibold">comment</span>
            <ul className={S.colLayout}>
              <div className={`${S.colLayout} gap-1`}>
                {commentList?.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span>{item.expand.user.username}</span>
                    <span>{item.message}</span>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          <hr />
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
