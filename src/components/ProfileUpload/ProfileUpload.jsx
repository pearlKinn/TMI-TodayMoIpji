import { useState } from 'react';

function ProfileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-sm">
          프로필 사진
        </label>
        <input
          type="text"
          id="selectedFileName"
          className="w-30 h-10 rounded border text-sm p-2 border-primary"
          placeholder="선택한 파일"
          readOnly
          value={selectedFile ? selectedFile.name : ''}
        />
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="flex items-center bg-primary h-10 px-1 text-gray-900 rounded cursor-pointer"
      >
        파일 선택
      </label>
    </div>
  );
}

export default ProfileUpload;
