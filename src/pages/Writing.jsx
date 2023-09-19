import FileUpload from '@/components/FileUpload/FileUpload';
import { Link } from 'react-router-dom';
import BackIcon from '/BackIcon.svg';

function Writing() {
  return (
    <div className="flex flex-col w-[320px] gap-2 mx-auto dark:bg-black border border-black">
      <Link to={'/'} className="p-1 ">
        <img src={BackIcon} alt="뒤로가기" className="w-3 h-5 mt-2 mb-2" />
      </Link>
      <FileUpload />
    </div>
  );
}

export default Writing;
