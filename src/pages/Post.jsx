import { useState } from 'react';
import S from '../components/FileUpload/FileUpload.module.css';
import { useParams } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { getPbImageURL } from '@/utils';
import FormInput from '@/components/FormInput/formInput';
import debounce from '@/utils/debounce';
import { useEffect } from 'react';

function Post() {
  const { postId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fileImages] = useState([]);
  const [formState, setFormState] = useState('');
  const [postUser, setPostUser] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNextSlide = () => {
    setCurrentIndex(
      (currentIndex + 1) % getPbImageURL(postUser, 'photo').length
    );
  };

  const handelPrevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + getPbImageURL(postUser, 'photo').length) %
        getPbImageURL(postUser, 'photo').length
    );
  };

  const handleInput = debounce((e) => {
    const { value } = e.target;
    setFormState(value);
  }, 400);

  useEffect(() => {
    async function getProduct() {
      try {
        const post = await pb.collection('posts').getOne(postId);
        setPostUser(post);
        setButtonDisabled(post.photo.length <= 1 || currentIndex === 0);
      } catch (error) {
        if (!(error in DOMException)) {
          console.error();
        }
      }
    }
    getProduct();
  }, [postId]);

  if (postUser) {
    return (
      <div className="flex flex-col w-72 mt-5 gap-3  mx-auto">
        <div className="flex bg-gray500 w-72 h-72">
          {postUser.photo?.map((_, index) => (
            <div
              key={index}
              className={` ${index === currentIndex ? '' : 'hidden'}`}
            >
              <img
                src={getPbImageURL(postUser, 'photo')[currentIndex]}
                className={S.uploadImage}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className={S.carouselBtnWrapper}>
          <button
            className={S.carouselBtn}
            onClick={handelPrevSlide}
            // disabled={buttonDisabled}
          >
            Pre
          </button>
          <button
            className={S.carouselBtn}
            onClick={handleNextSlide}
            // disabled={buttonDisabled}
          >
            Next
          </button>
        </div>
        <div className="flex justify-between border border-2 border-gray-900 rounded-[15px] w-72 h-7  p-4 items-center gap-2">
          <FormInput
            type="text"
            id="comment"
            name="comment"
            label="댓글창"
            defaultValue={formState.value}
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
