import ListItem from './ListItem';

type ListProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string; // list container styling
};

const List = <T extends {}>({ data, renderItem, className }: ListProps<T>) => {
  return (
    <ul className={`${className}`}>
      {data.map((item, index) => (
        <ListItem key={index}>{renderItem(item, index)}</ListItem>
      ))}
    </ul>
  );
};

export default List;
