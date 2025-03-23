import BookListItem from '@/components/BookListItem';
import List from '@/components/shared/List';
import ListTitle from '@/components/shared/ListTitle';
import NoData from '@/components/shared/NoData';
import Typography from '@/components/shared/Typography';
import { useLikedBooks } from '@/hooks/useLikedBooks';

const Like = () => {
  const { likedBooks } = useLikedBooks();

  return (
    <div>
      <Typography as="h2" variant="title2" className="mb-6 text-black">
        내가 찜한 책
      </Typography>

      <ListTitle title="찜한 책" totCnt={likedBooks.length} className="mb-9" />

      {likedBooks.length === 0 ? (
        <NoData title="찜한 책이 없습니다." className="py-20" />
      ) : (
        <List data={likedBooks} renderItem={(book) => <BookListItem data={book} />} />
      )}
    </div>
  );
};

export default Like;
