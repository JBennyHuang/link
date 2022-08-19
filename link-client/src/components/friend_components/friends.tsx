import { useEffect, useState } from "react";

import { MdAdd } from "react-icons/md";

import { useParams } from "react-router-dom";
import { useAPIs } from "../../context/APIContext";

import { Link } from "react-router-dom";

import SearchBar from "../search_bar";
import ListIcon from "../list_icon";

const Friends = () => {
  const params = useParams();
  const APIContext = useAPIs();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [friends, setFriends] = useState<
    Array<{ name: string; name2: string; uuid: string }>
  >([]);

  const frontEndFriends: JSX.Element[] = [];

  useEffect(() => {
    APIContext.getFriends().then((value) => {
      setFriends(value.data);
    });
  }, []);

  for (let i = 0; i < friends.length; i++) {
    frontEndFriends.push(
      <Link
        className="w-full"
        key={i}
        to={`/${params.user}/friends/${friends[i].uuid}`}
      >
        <ListIcon
          name={friends[i].name}
          uuid={friends[i].uuid}
          name2={friends[i].name2}
        ></ListIcon>
      </Link>
    );
  }
  console.log(friends);

  return (
    <>
      <div className="w-[80%] right-0 top-0 bg-zinc-800 h-screen">
        <div className="flex items-center px-5 shadow-lg h-[8%] 2xl:h-[5%] bg-zinc-900">
          <SearchBar placeholder="Search users..." data="user" />
        </div>
        <div className="front-list">
          {frontEndFriends}
          <div className="">
            <MdAdd className="add-icon mt-10 text-[30px]" />
          </div>
        </div>

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

export default Friends;
