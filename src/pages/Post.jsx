import pb from '@/api/pocketbase';
import {
  formatDate,
  getNextSlideIndex,
  getPbImageURL,
  getPreviousSlideIndex,
} from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import S from '../components/FileUpload/FileUpload.module.css';
import FormInput from '@/components/FormInput/FormInput';
import MoveSlide from '@/components/MoveSlide/MoveSlide';
import toast from 'react-hot-toast';

function Post() {
  const { postId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postInfo, setPostInfo] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const inputRef = useRef(null);
  const inputDateString = postInfo?.created;
  const formattedDate = formatDate(inputDateString);

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
        setCommentList(postExpandData.comments); // 댓글 리스트
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
    const newComment = { message: inputRef.current.value, post: postId };

    try {
      const commentRecord = await pb.collection('comments').create(newComment);

      await pb.collection('posts').update(postId, {
        'comments+': commentRecord.id,
      });

      setCommentList([...commentList, newComment]);
      inputRef.current.value = '';
      // ! 왜 안뜨지?????
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

  if (postInfo) {
    return (
      <div className="flex flex-col w-72 mt-5  mx-auto">
        <div className="wrapper flex justify-center mb-3">
          <div className="relative bg-primary w-24 h-12 rounded-xl flex justify-center items-center">
            {postInfo.statusEmoji}
            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0 -rotate-45 bg-primary w-2 h-2"></div>
          </div>
        </div>
        <div className="flex bg-gray500 w-72 h-72">
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
        <MoveSlide
          prevFunc={handelPrevSlide}
          nextFunc={handleNextSlide}
          disabled={postInfo.photo.length <= 1 ? true : false}
        />
        <div className="text-xs">{formattedDate}</div>
        <hr className="bg-gray500" />
        <span>{postInfo.content}</span>
        <hr className="mt-2" />
        <div className="flex flex-col">
          <span className="font-semibold ">comment</span>
          <ul className="flex flex-col">
            <div className="flex flex-col gap-1">
              {commentList?.map((item, index) => (
                <li key={index} className="flex gap-4">
                  {/* {<span>{item.expand.user.username}</span> } //! {인증되면  주석 풀기!!!!} */}
                  <span>{item.message}</span>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <hr />
        <div className="flex justify-between border-2 border-gray-900 rounded-[15px] w-72 h-7  p-4 items-center gap-2">
          <FormInput
            type="text"
            id="comment"
            name="comment"
            label="댓글창"
            ref={inputRef}
          />
          <button
            onClick={handleCommentSubmit}
            type="submit"
            aria-label="댓글 게시"
            className="bg-transparent border-none w-7 h-5 whitespace-nowrap"
          >
            게시
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
