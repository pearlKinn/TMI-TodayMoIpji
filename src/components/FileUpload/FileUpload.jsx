import { useRef, useState } from 'react';
import S from './FileUpload.module.css';
// import Textarea from '../Textarea/Textarea';
import { useNavigate } from 'react-router-dom';
import pb from '@/api/pocketbase';
import debounce from '@/utils/debounce';
import useAuthStore from '@/store/auth';

function FileUpload() {
  const navigate = useNavigate();

  const [isShowOptions, setIsShowOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleOptions = () => {
    setIsShowOptions(!isShowOptions);
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setIsShowOptions(true);
  };

  /* -------------------------------------------------------------------------- */

  const contentRef = useRef(null);
  const [content, setContent] = useState('');

  const handleContent = debounce((e) => {
    const { value } = e.target;
    setContent(value);
  });

  const formRef = useRef(null);
  const photoRef = useRef(null);

  const handlePost = async (e) => {
    e.preventDefault();

    const contentValue = contentRef.current.value;
    const photoValue = photoRef.current.files;

    //! photoValue?.forEach((file, index) => {
    //!   console.log(file)
    //!   console.log(index)
    //!   formData.append(`photo`, file);
    //! });
    const formData = new FormData();

    formData.append('content', contentValue);
    if (photoValue) {
      photoValue.forEach((file, index) => {
        formData.append(`photo`, file);
      });
    }

    try {
      // await pb.collection('posts').create(formData);
      console.log('성공');
      navigate('/');
    } catch (error) {
      console.log('에러!');
      console.error(error);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % fileImages.length);
  };

  const handelPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + fileImages.length) % fileImages.length);
  };

  const [fileImages, setFileImages] = useState([]);

  const handleUpload = (e) => {
    const { files } = e.target;
    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));
    setFileImages(fileImages);
  };
  const signUp = useAuthStore((state) => state.signUp);
  console.log(signUp);

  return (
    <>
      <form
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handlePost}
        className={S.formWrapper}
      >
        <div className={S.selectEmojiWrapper}>
          <div className={S.speechBubbleBody} onClick={toggleOptions}>
            <div className={S.speechBubbleHead}></div>
            {isShowOptions && (
              <div title="상태 선택"> {selectedOption || '🫥'}</div>
            )}
          </div>
          {!isShowOptions && (
            <ul className={S.statusListWrapper}>
              <li>
                <label aria-description="추워요" className="relative">
                  <input
                    type="radio"
                    name="options"
                    value="🥶"
                    className={S.selectEmoji}
                    onChange={handleOptionChange}
                    checked={selectedOption === '🥶'}
                  />
                  <span className={S.statusItem}>🥶</span>
                </label>
              </li>
              <li>
                <label aria-description="더워요" className="relative">
                  <input
                    type="radio"
                    name="options"
                    value="🥵"
                    className={S.selectEmoji}
                    onChange={handleOptionChange}
                    checked={selectedOption === '🥵'}
                  />
                  <span className={S.statusItem}>🥵</span>
                </label>
              </li>
              <li>
                <label aria-description="딱 좋아요" className="relative">
                  <input
                    type="radio"
                    name="options"
                    value="😌"
                    className={S.selectEmoji}
                    onChange={handleOptionChange}
                    checked={selectedOption === '😌'}
                  />
                  <span className={S.statusItem}>😌</span>
                </label>
              </li>
            </ul>
          )}
        </div>
        <div className={S.photoContainer}>
          <label htmlFor="photo" className="sr-only">
            사진
          </label>
          <div className="relative">
            <input
              type="file"
              accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
              ref={photoRef}
              name="photo"
              id="photo"
              onChange={handleUpload}
              className={S.photo}
              multiple
            />
            <div className="carouselContainer">
              {fileImages.length ? (
                <div className={S.carouselWrapper}>
                  {fileImages.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className={` ${index === currentIndex ? '' : 'hidden'}`}
                      >
                        <img
                          src={image.image}
                          alt={image.label}
                          className={S.uploadImage}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={S.uploadBefore}>
                  <img
                    src="/photoIcon.svg"
                    alt="업로드 이미지"
                    className="h-8 w-8"
                  />
                </div>
              )}
            </div>
            <div className={S.carouselBtnWrapper}>
              <button
                type="button"
                className={S.carouselBtn}
                onClick={handelPrevSlide}
                disabled={fileImages.length === 0 ? true : false}
              >
                Pre
              </button>
              <button
                type="button"
                className={S.carouselBtn}
                onClick={handleNextSlide}
                disabled={fileImages.length === 0 ? true : false}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* <Textarea /> */}
        <div className={S.textareaWrapper}>
          <label htmlFor="content" className="sr-only">
            message
          </label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            ref={contentRef}
            maxLength={150}
            placeholder="텍스트를 입력하세요. (0 / 150)"
            className={S.textarea}
            defaultValue={content}
            onChange={handleContent}
          ></textarea>
        </div>
        <div className={S.postBtnWrapper}>
          <button type="submit" className={S.postBtn}>
            게시
          </button>
        </div>
      </form>
    </>
  );
}

export default FileUpload;
