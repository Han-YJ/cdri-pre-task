/**책 검색하기 */
export type SearchTarget = 'title' | 'isbn' | 'publisher' | 'person';
export type SearchBooksParams = {
  query: string; // 검색 질의어
  sort?: string; // accuracy(default), recency
  page?: number;
  size?: number; // 기본 10
  target?: SearchTarget;
};
type Meta = {
  total_count: number; //	검색된 문서 수
  pageable_count: number; //	중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수
  is_end: boolean; // 현재 페이지가 마지막 페이지인지 여부, 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있음
};
export type Document = {
  title: string; //도서 제목
  contents: string; //도서 소개
  url: string; //도서 상세 URL
  isbn: string; //ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호(International Standard Book Number),ISBN10 또는 ISBN13 중 하나 이상 포함,두 값이 모두 제공될 경우 공백(' ')으로 구분
  datetime: string; //	도서 출판날짜, ISO 8601 형식, [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz]
  authors: string[]; //	도서 저자 리스트
  publisher: string; //도서 출판사
  translators: string[]; //	도서 번역자 리스트
  price: number; //도서 정가
  sale_price: number; //도서 판매가,
  thumbnail: string; //	도서 표지 미리보기 URL
  status?: string; // 도서 판매 상태 정보 (정상, 품절, 절판 등), 상황에 따라 변동 가능성이 있으므로 문자열 처리 지양, 단순 노출 요소로 활용 권장,
};
export type SearchBooksResponse = {
  meta: Meta;
  documents: Document[];
};
