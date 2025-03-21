import BookList from '@/components/BookList';
import SearchBox from '@/components/SearchBox';

const Search = () => {
  return (
    <div className="flex flex-col gap-6">
      <SearchBox />
      <BookList />
    </div>
  );
};

export default Search;
