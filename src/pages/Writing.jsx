import FileUpload from '@/components/FileUpload/FileUpload';
import { Link } from 'react-router-dom';
import BackIcon from '/BackIcon.svg';

function Writing() {
  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-132px)] mx-auto overflow-y-scroll dark:bg-black box-content min-w-[320px]">
      <Link to={'/'}>
        <img src={BackIcon} alt="뒤로가기" className="w-3 h-5 mt-2 ml-2" />
      </Link>
      <FileUpload />
    </div>
  );
}

export default Writing;
