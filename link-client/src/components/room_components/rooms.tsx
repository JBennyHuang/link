import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import { useAPIs } from "../../context/APIContext";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import ListIcon from "../list_icon";
import RoomMenu from "./room_menu";
import SearchBar from "../search_bar";

const Rooms = () => {
  const APIContext = useAPIs();
  const params = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Array<{ name: string; uuid: string }>>([]);

  const frontEndRooms: JSX.Element[] = [];

  useEffect(() => {
    APIContext.getRooms().then((value) => {
      setRooms(value.data);
    });
  }, [APIContext.roomAlert]);

  for (let i = 0; i < rooms.length; i++) {
    frontEndRooms.push(
      <Link key={i} to={`/${params.user}/rooms/${rooms[i].uuid}`}>
        <ListIcon recipient={null} name={rooms[i].name} uuid={rooms[i].uuid} />
      </Link>
    );
  }

  return (
    <>
      <RoomMenu isOpen={isOpen} closeModal={() => setIsOpen(false)}></RoomMenu>
      <div className="w-[80%] right-0 top-0 bg-zinc-800 h-screen">
        <div className="flex items-center px-5 shadow-lg h-[8%] 2xl:h-[5%] bg-zinc-900">
          <SearchBar placeholder="Search rooms..." data="user" />
        </div>
        <div className="front-list">{frontEndRooms}</div>
        <div className="profile">
          <div className="h-8 w-8 2xl:h-12 2xl:w-12 bg-amber-400 rounded-full mr-2" />
          <div className="flex flex-col text-[15px]">
            <p>{params.user}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
