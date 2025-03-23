import { useEffect, useRef } from 'react';
import ListItem from './ListItem';

type ListProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  onReachEnd?: () => void;
};

/**
 * List component
 * @param data
 * @param renderItem
 * @param className 리스트 컨테이너 styling
 * @param onReachEnd 리스트의 마지막에 도달했을 때 실행할 함수 (무한 스크롤 등)
 */
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
      { threshold: 0.9 }
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

export default List;
