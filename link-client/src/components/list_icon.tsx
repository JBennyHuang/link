import { useParams } from "react-router-dom";

interface ListIconProperties {
  name: string | undefined;
  uuid: string;
  name2: string;
}

const ListIcon = (props: ListIconProperties) => {
  const params = useParams();

  let name = props.name;

  if (params.user === name) {
    name = props.name2;
  }
  console.log(props.name2);

  return (
    <div
      className={
        params.uuid === props.uuid
          ? "list-icon bg-zinc-900"
          : "list-icon 2xl:text-[20px] hover:bg-zinc-600"
      }
    >
      <div className="flex items-center">
        <div className="h-8 w-8 2xl:h-12 2xl:w-12 bg-amber-400 rounded-full mr-3"></div>
        {name}
      </div>
    </div>
  );
};

export default ListIcon;
