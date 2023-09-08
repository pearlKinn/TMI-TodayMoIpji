import { useParams } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useRef } from 'react';
import { useState } from 'react';

function Post() {
  // const {postId} = useParams()

  const formRef = useRef(null);
  const photoRef = useRef(null);
  const handleUpdate = async (e) => {
    e.preventDefault();

    const photoValue = photoRef.current.files;

    const formData = new FormData();

    if (photoValue.length > 0) {
      formData.append('photo', photoValue[0]);
    }
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
  return (
    <div>
      <form
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleUpdate}
        className="flex flex-col gap-2 items-center"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="photo">사진</label>
          <div className="relative">
            <input
              type="file"
              accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
              ref={photoRef}
              name="photo"
              id="photo"
              // multiple
              onChange={handleUpload}
              className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex gap-2 overflow-x-auto p-2 w-72 h-72 bg-gray500 mx-auto">
              {fileImages.map((file) => {
                return (
                  <img key={file.label} src={file.image} alt={file.label} />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 w-full mt-4 mb-6">
          <button
            type="submit"
            className="
              py-1 px-3.5 border-2 bg-primary hover:border-slate-400 rounded-xl
            "
          >
            업로드
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
