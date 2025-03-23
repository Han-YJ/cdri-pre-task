# 📋 프로젝트 개요

이 프로젝트는 **책 검색** 및 **찜하기 기능**을 제공하는 웹 애플리케이션으로, 다양한 책을 검색하고 마음에 드는 책을 찜할 수 있는 기능을 제공합니다. 애플리케이션은 **React**, **TypeScript**를 기반으로 개발되었으며 **React Query**와 **Jotai** 등을 사용하여 상태 관리 및 API 요청을 처리합니다.

## 🔌 실행 방법 및 환경 설정

### 1. 프로젝트 클론

```bash
git clone https://github.com/Han-YJ/cdri-pre-task.git
```

### 2. 패키지 설치 및 실행

```bash
npm install
npm run dev
```

## 🗂️ 폴더 구조

| 폴더              | 설명                                            |
| ----------------- | ----------------------------------------------- |
| `src/`            | 프로젝트의 소스 코드가 위치하는 최상위 디렉토리 |
| `src/api/`        | API와 관련된 파일들이 위치하는 폴더             |
| `src/assets/`     | 이미지, 아이콘 등 애플리케이션의 정적 자원 폴더 |
| `src/atoms/`      | 상태 관리 관련 `atom` 파일들이 위치하는 폴더    |
| `src/components/` | UI 컴포넌트들이 위치하는 폴더                   |
| `src/hooks/`      | 커스텀 훅 파일들이 위치하는 폴더                |
| `src/pages/`      | 페이지 컴포넌트들이 위치하는 폴더               |
| `src/routes/`     | 라우팅 관련 파일들이 위치하는 폴더              |
| `src/types/`      | 타입 정의 파일들이 위치하는 폴더                |
| `src/utils/`      | 유틸리티 파일들이 위치하는 폴더                 |

## 📚 라이브러리

### 1. 🚀 퍼포먼스 최적화

- **`vite`**
  - 기존에 많이 사용되던 CRA는 공식적으로 지원이 중단되어 Next 와 Vite 중 더 빠르고 단순한 Vite 가 작은 프로젝트 규모에 맞다고 판단되어 선택했습니다.

### 2. 💡 개발 생산성 향상

- **`jotai`**

  - 전역상태를 관리하는 라이브러리 중 간단하게 atom으로 관리가 가능하고 atomWithStorage로 localStorage에 쉽게 저장이 가능한 jotai를 선택했습니다.

- **`eslint` + `prettier`**

  - 코드에서 발생할 수 있는 오류를 사전에 방지하고 일관된 스타일을 유지해 안정적이고 가독성이 좋은 코드를 작성하기 위해 선택했습니다.

- **`axios`**
  - 비동기 HTTP 요청을 관리하는 데 응답 자동변환, intercepter 등 직관적이고 다양한 기능으로 효율적인 API 요청처리를 위해 선택했습니다.

### 3. 🎨 스타일링 및 유지보수 용이성

- **`tailwindcss`**

  - 기존에 정해진 유틸리티로 빠른 UI 개발을 위해 선택했습니다.

- **`twMerge` + `clsx`**
  - `tailwindcss`의 중복되는 클래스 병합을 자동화하여 가독성과 유지보수성을 향상시키기 위해 선택했습니다.
  - `clsx`는 특정 조건에 따라 클래스 이름을 선택적으로 사용하기 위해 선택했습니다.
  - 두가지를 조합해 동적으로 사용할 때 효율적으로 관리하고 가독성을 높일 수 있었습니다.

## 🔍 주요 코드 및 강조하고 싶은 기능

### 💡 useSearchBooks

`useSearchBooks`는 책 검색을 위한 커스텀 훅으로, 카카오 API를 통해 책을 검색하고 검색 결과를 페이지별로 합쳐 반환합니다. `List`의 onReachEnd 를 통해 무한스크롤을 구현하기 위해 tanstack-query의 useInfiniteQuery를 사용해 hasNextPage 로 다음 페이지 여부를 확인한 후 다음 페이지가 있는경우 fetchNextPage를 넘겨주었습니다.

<details>
<summary>코드 보기</summary>

```tsx
// useSearchBooks
export const useSearchBooks = () => {
  const params = useAtomValue(searchParamsAtom);
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['searchBooks', params],
    initialPageParam: 1, // 초기 페이지 번호 1부터 시작
    queryFn: ({ pageParam = 1 }) => searchBooks({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: SearchBooksResponse, allPages) => {
      return lastPage.meta.is_end ? undefined : allPages.length + 1; // 다음 페이지 번호
    },
    enabled: !!params.query, // 검색어가 있을 때만 실행
  });

  return {
    data: data?.pages.map((meta) => meta.documents).flat() || [],
    metaData: data?.pages[0].meta,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};

// 검색 결과 리스트 코드
const BookList = () => {
  const { data, metaData, hasNextPage, fetchNextPage } = useSearchBooks();
  return (
    // ...
    <List
      data={data}
      renderItem={(book) => <BookListItem data={book} />}
      onReachEnd={hasNextPage ? fetchNextPage : undefined}
    />
  );
};
```

</details>

---

### 💡 List, ListIem

`List`와 `ListItem`을 분리하여 각자의 역할을 명확히 하고, 코드의 재사용성과 유지보수성을 높였습니다. 또한, 시맨틱 태그인 ul과 li를 사용하여 SEO와 접근성을 고려한 구조를 만들었습니다. 이로 인해 컴포넌트를 사용할 때, HTML 구조에 구애받지 않고 쉽게 사용할 수 있습니다.

또 `List`는 Intersection Observer을 사용하여 리스트의 마지막에 도달할때의 이벤트를 추가하여 무한 스크롤을 처리할 수 있는 기능도 구현되어 있습니다. Intersection Observer는 페이지 끝에 도달했을 때 onReachEnd 함수를 호출합니다. onReachEnd 는 optional로 일반 리스트와 무한스크롤 리스트인 경우 모두 사용할 수 있습니다.

<details>
  <summary>코드 보기</summary>

```tsx
const List = <T extends {}>({ data, renderItem, className, onReachEnd }: ListProps<T>) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !onReachEnd) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onReachEnd();
        }
      },
      { threshold: 0.9 } // 참조된 element 의 90%가 보일때 실행
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect(); // clean
  }, [onReachEnd]);

  return (
    <ul className={`${className}`}>
      {data.map((item, index) => (
        <ListItem key={index}>{renderItem(item, index)}</ListItem>
      ))}

      {/* onReachEnd가 있을 때만 observer 추가 */}
      {onReachEnd && <div ref={observerRef} className="h-10 w-full" />}
    </ul>
  );
};
```

</details>

---

### 💡 useLikedBooks

`useLikedBooks` hook은 찜한 책들을 관리하는 데 사용됩니다. 찜한 책들의 데이터, 찜하기, 찜 취소, 찜한 책인지 확인 등의 기능을 제공합니다. jotai 에서 제공되는 atomWithStorage 를 사용해 localstorage에 저장되어 새로 고침 후에도 데이터가 유지됩니다.

<details>
<summary>코드 보기</summary>

```tsx
export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useAtom(likedBooksAtom);

  const addLikedBooks = (book: Book) => {
    if (!likedBooks.some((likedBook) => likedBook.isbn === book.isbn)) {
      setLikedBooks((prev) => [...prev, book]);
    }
  };

  const removeLikedBooks = (isbn: string) => {
    setLikedBooks((prev) => prev.filter((book) => book.isbn !== isbn)); // 찜 목록에서 삭제
  };

  const checkIsLikedBook = (isbn: string) => {
    return likedBooks.some((book) => book.isbn === isbn);
  };

  return {
    likedBooks,
    addLikedBooks,
    removeLikedBooks,
    checkIsLikedBook,
  };
};
```

</details>

#### BookLikeIcon

`BookLikeIcon component` 는 사용자가 책을 찜하거나 찜한 책을 취소할 수 있는 아이콘을 렌더링합니다. 상태 변화에 따라 UI가 업데이트되며, `useLikedBooks` 훅을 통해 찜한 책을 추가하거나 삭제할 수 있습니다.

<details>
<summary>코드 보기</summary>

```tsx
const BookLikeIcon = ({ size, bookData, className }: BookLikeIcon) => {
  const { addLikedBooks, removeLikedBooks, checkIsLikedBook } = useLikedBooks();

  return (
    <span className={className}>
      {checkIsLikedBook(bookData.isbn) ? (
        <LikeFillIcon width={size} height={size} onClick={() => removeLikedBooks(bookData.isbn)} />
      ) : (
        <LikeLineIcon width={size} height={size} onClick={() => addLikedBooks(bookData)} />
      )}
    </span>
  );
};
```

</details>
