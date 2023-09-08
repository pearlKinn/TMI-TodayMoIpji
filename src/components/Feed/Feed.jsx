import { Link } from 'react-router-dom';
import S from './Feed.module.css';

function Feed() {
  return (
    <div>
      <h2 className={S.feedTitle}>Feeds</h2>
      <div className="flex justify-between px-2 mt-2">
        <h3 className="font-semibold text-red-600">NEW</h3>
        <button type="button">
          <img src="/Filter.svg" alt="" />
        </button>
      </div>
      <FeedItem />
    </div>
  );
}

export default Feed;

function FeedItem() {
  return (
    <div className={S.feedsWrapper}>
      <Link to={'/post'} className="flex flex-col items-center">
        <img src="/Search.svg" alt="" className={S.feedImage} />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            <img src="" alt="" className={S.userImg} />
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            <span>🥵</span>
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
      <Link to={'/post'} className="flex flex-col items-center">
        <img src="/Search.svg" alt="" className={S.feedImage} />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            <img src="" alt="" className={S.userImg} />
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            <span>🥵</span>
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
      <Link to={'/post'} className="flex flex-col items-center">
        <img src="/Search.svg" alt="" className={S.feedImage} />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            <img src="" alt="" className={S.userImg} />
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            <span>🥵</span>
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
      <Link to={'/post'} className="flex flex-col items-center">
        <img src="/Search.svg" alt="" className={S.feedImage} />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            <img src="" alt="" className={S.userImg} />
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            <span>🥵</span>
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
      <Link to={'/post'} className="flex flex-col items-center">
        <img src="/Search.svg" alt="" className={S.feedImage} />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            <img src="" alt="" className={S.userImg} />
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            <span>🥵</span>
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
      <Link to={`/post`} className="flex flex-col items-center">
        <img src="/Search.svg" alt="" className={S.feedImage} />
        <div className={S.feedInfo}>
          <div className={S.userWrapper}>
            <img src="" alt="" className={S.userImg} />
            <span>지역</span>
          </div>
          <div className={S.speechBubbleHead}>
            <span>🥵</span>
            <div className={S.speechBubbleBody}></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
