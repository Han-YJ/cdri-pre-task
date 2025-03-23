import { useSearchBooks } from '@/hooks/useSearchBooks';
import ListTitle from './shared/ListTitle';
import List from './shared/List';
import BookListItem from './BookListItem';
import NoData from './shared/NoData';

const BookList = () => {
  const { data, metaData, hasNextPage, fetchNextPage } = useSearchBooks();
  return (
    <div className="flex flex-col">
      <ListTitle title="도서 검색 결과" totCnt={metaData?.total_count ?? 0} className="mb-9" />

      {data?.length === 0 ? (
        <NoData title="검색된 결과가 없습니다." className="py-20" />
      ) : (
        <List
          data={data}
          renderItem={(book) => <BookListItem data={book} />}
          onReachEnd={hasNextPage ? fetchNextPage : undefined}
        />
      )}
    </div>
  );
};

export default BookList;
