import debounce from '@/utils/debounce';
import { useRef, useState } from 'react';
import S from './FileUpload.module.css';
import { getNextSlideIndex, getPreviousSlideIndex } from '@/utils';
import MoveSlide from '../MoveSlide/MoveSlide';

function FileUpload() {
  const formRef = useRef(null);
  const photoRef = useRef(null);
  const contentRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoValue = photoRef.current.files;
    const formData = new FormData();

    if (photoValue.length > 0) {
      formData.append('photo', photoValue[0]);
    }
  };
  /* 페이지 이동 버튼 --------------------------------------------------------------------- */
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex(getNextSlideIndex(currentIndex, fileImages));
  };

  const handelPrevSlide = () => {
    setCurrentIndex(getPreviousSlideIndex(currentIndex, fileImages));
  };

  const [fileImages, setFileImages] = useState([]);
  const [content, setContent] = useState('');

  const handleUpload = (e) => {
    const { files } = e.target;
    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));
    setFileImages(fileImages);
  };

  const handleContent = debounce((e) => {
    const { value } = e.target;
    setContent(value);
  });

  return (
    <>
      <form
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleUpdate}
        className="flex flex-col gap-2 items-center"
      >
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
                  {fileImages.map((file, index) => (
                    <div
                      key={index}
                      className={`${index === currentIndex ? '' : 'hidden'}`}
                    >
                      <img
                        src={file.image}
                        alt={file.label}
                        className={S.uploadImage}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={S.uploadBefore}>
                  <img src="/photoIcon.svg" alt="업로드" className="h-8 w-8" />
                </div>
              )}
            </div>
            <MoveSlide
              prevFunc={handelPrevSlide}
              nextFunc={handleNextSlide}
              disabled={fileImages.length <= 1 ? true : false}
            />
          </div>
        </div>
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
          <button type="submit" className={`${S.postBtn} bg-primary`}>
            게시
          </button>
        </div>
      </form>
    </>
  );
}

export default FileUpload;
