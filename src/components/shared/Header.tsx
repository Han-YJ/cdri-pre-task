import { Link, useLocation } from 'react-router';
import Typography from './Typography';

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? 'pb-1 border-b-1 border-primary' : '';

  return (
    <header className="w-full">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center px-5">
        <Typography as="h1" variant={'title1'} className="select-none mr-[400px]">
          CERTICOS BOOKS
        </Typography>
        <nav className="flex gap-14">
          <Link to="/" className={`${isActive('/')}`}>
            <Typography as="span" variant="body1">
              도서검색
            </Typography>
          </Link>
          <Link to="/save" className={`${isActive('/save')}`}>
            <Typography as="span" variant="body1">
              내가 찜한 책
            </Typography>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
