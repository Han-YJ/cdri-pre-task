import { useEffect, useRef } from 'react';
import ListItem from './ListItem';

type ListProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string; // list container styling
  onReachEnd?: () => void; // 무한 스크롤 or 리스트 마지막 이벤트가 필요한 경우만 전달
};

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
