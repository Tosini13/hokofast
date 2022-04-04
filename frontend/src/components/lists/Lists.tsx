import { useListsService } from "../../services/lists/lists-service";

type TListsProps = {};

const Lists: React.FC<TListsProps> = () => {
  const data = useListsService();
  return (
    <>
      <h4>LISTS:</h4>
      {data?.map((list) => (
        <p key={list.id}>{list.name}</p>
      ))}
    </>
  );
};

export default Lists;
