import { Link, useLocation } from 'react-router';
import Typography from './Typography';
import { cn } from '@/utils/styles';

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? 'pb-1 border-b-1 border-primary' : '';

  return (
    <header className="w-full">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center px-5">
        <Typography as="h1" variant={'title1'} className="mr-[400px] select-none">
          CERTICOS BOOKS
        </Typography>
        <nav className="flex gap-14">
          <Link to="/" className={cn(isActive('/'))}>
            <Typography as="span" variant="body1">
              도서검색
            </Typography>
          </Link>
          <Link to="/like" className={cn(isActive('/like'))}>
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
