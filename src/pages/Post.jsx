import pb from '@/api/pocketbase';
import FormInput from '@/components/FormInput/formInput';
import { formatDate, getPbImageURL } from '@/utils';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import S from '../components/FileUpload/FileUpload.module.css';

function Post() {
  const { postId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formState, setFormState] = useState('');
  const [postInfo, setPostInfo] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [expandInfo, setExpandInfo] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [commentInfo, setCommentInfo] = useState(null);

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

  const handleInput = debounce((e) => {
    const { value } = e.target;
    setFormState(value);
  }, 400);

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

  const inputDateString = postInfo?.created;
  const formattedDate = formatDate(inputDateString);

  if (postInfo) {
    console.log(postInfo);
    return (
      <div className="flex flex-col w-72 mt-5  mx-auto">
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
                  <span>{item.expand.user.username}</span>
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
            defaultValue={formState}
            onChange={handleInput}
          />
          <button
            onClick={() => {
              // console.log(formState);
            }}
            type="button"
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
