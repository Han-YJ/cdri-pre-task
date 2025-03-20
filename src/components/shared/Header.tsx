import { Link, useLocation } from 'react-router';
import Typography from './Typography';

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => (location.pathname === path ? 'underline' : '');

  return (
    <header className="w-full  ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between ">
        <Typography as="h1" variant={'title1'}>
          CERTICOS BOOKS
        </Typography>
        <nav>
          <Link to="/" className={`${isActive('/')}`}>
            도서검색
          </Link>
          <Link to="/save" className={`${isActive('/save')}`}>
            내가 찜한 책
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
