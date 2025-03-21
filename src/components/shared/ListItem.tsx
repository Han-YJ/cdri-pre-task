type ListItemProps = {
  children: React.ReactNode;
  className?: string; //list item styling
};

const ListItem = ({ children, className }: ListItemProps) => {
  return <li className={className}>{children}</li>;
};

export default ListItem;
