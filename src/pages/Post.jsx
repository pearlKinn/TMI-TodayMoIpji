import pb from '@/api/pocketbase';
import { formatDate, getPbImageURL } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import S from '../components/FileUpload/FileUpload.module.css';

function Post() {
  const { postId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postInfo, setPostInfo] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [commentList, setCommentList] = useState([]);
  const inputRef = useRef(null);

  const handleNextSlide = () => {
    setCurrentIndex(
      (currentIndex + 1) % getPbImageURL(postInfo, 'photo').length
    );
  };

  const handelPrevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + getPbImageURL(postInfo, 'photo').length) %
        getPbImageURL(postInfo, 'photo').length
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
        setButtonDisabled(post.photo.length <= 1);
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

    // 댓글을 서버에 저장
    await pb.collection('comments').create(newComment);

    // 해당 포스트 레코드를 가져오고 comments 관계를 업데이트
    await pb.collection('posts').update(postId, {
      comments: {
        message: [newComment],
      },
    });

    setCommentList([...commentList, newComment]);
    console.log(commentList);

    inputRef.current.value = ''; // 입력 필드 초기화
  };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   const newComment = { message: inputRef.current.value, post: postId };
  //   await pb.collection('comments').create(newComment);
  //   await pb.collection('posts').update(postId, { expand: 'comments.message' })
  //   setCommentList([...commentList, newComment]);
  //   inputRef.current.value = '';
  // };

  const inputDateString = postInfo?.created;
  const formattedDate = formatDate(inputDateString);

  if (postInfo) {
    // console.log(commentList) //^ 새로고침 시 댓글 사라지는 이유??????

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
              className={` ${index === currentIndex ? '' : 'hidden'}`}
            >
              <img
                src={getPbImageURL(postInfo, 'photo')[currentIndex]}
                className={S.uploadImage}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className=" flex justify-between">
          <button
            className="font-semibold uppercase disabled:cursor-not-allowed"
            onClick={handelPrevSlide}
            disabled={buttonDisabled}
          >
            Pre
          </button>
          <button
            className={S.carouselBtn}
            onClick={handleNextSlide}
            disabled={buttonDisabled}
          >
            Next
          </button>
        </div>
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
          <input
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
