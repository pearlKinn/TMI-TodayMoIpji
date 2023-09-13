import FileUpload from '@/components/FileUpload/FileUpload';
import { Link } from 'react-router-dom';

function Writing() {
  return (
    <div className="flex flex-col w-72 mt-5 gap-5 mx-auto">
      <Link to={'/'}>
        <img src="/BackIcon.svg" alt="뒤로가기" className="w-3 h-5" />
      </Link>
      <FileUpload />
    </div>
  );
}

export default Writing;
