import debounce from '@/utils/debounce';
import { useRef, useState } from 'react';
import S from './FileUpload.module.css';

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % fileImages.length);
  };

  const handelPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + fileImages.length) % fileImages.length);
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
                className={S.carouselBtn}
                onClick={handelPrevSlide}
                disabled={fileImages.length === 0 ? true : false}
              >
                Pre
              </button>
              <button
                className={S.carouselBtn}
                onClick={handleNextSlide}
                disabled={fileImages.length === 0 ? true : false}
              >
                Next
              </button>
            </div>
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
