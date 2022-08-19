import React, { useState, useRef } from "react";

import { useAPIs } from "../../context/APIContext";

import { FaCaretRight } from "react-icons/fa";

interface ConversationMenuProperties {
  isOpen: boolean;
  closeModal: () => void;
}

const RoomMenu = (props: ConversationMenuProperties) => {
  const APIContext = useAPIs();

  const [createOption, setCreateOption] = useState<boolean>(false);
  const [joinOption, setJoinOption] = useState<boolean>(false);
  const roomNameRefInput = useRef<HTMLInputElement>(null);
  const roomIdRefInput = useRef<HTMLInputElement>(null);

  const createRoom = (event: React.FormEvent) => {
    event.preventDefault();

    if (roomNameRefInput.current) {
      APIContext.createRoom(roomNameRefInput.current.value)
        .then(() => {
          // redirect main page
          console.log("Successfully Created Room");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            console.log("error");
          } else {
            console.log("don't know");
          }
        });
    }

    closeModal();
  };

  const joinRoom = (event: React.FormEvent) => {
    event.preventDefault();

    if (roomIdRefInput.current) {
      APIContext.joinRoom(roomIdRefInput.current.value)
        .then(() => {
          // redirect main page
          console.log("Successfully Joined Room");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            console.log("error");
          } else {
            console.log("don't know");
          }
        });
    }
  };

  const closeModal = () => {
    props.closeModal();
    setJoinOption(false);
    setCreateOption(false);
  };

  const createRoomOption = () => {
    setCreateOption(true);
    setJoinOption(false);
  };

  const joinRoomOption = () => {
    setJoinOption(true);
    setCreateOption(false);
  };

  if (!props.isOpen) return null;
  return (
    <>
      <div className="bg-modal" onClick={closeModal} />
      <div className="modal text-amber-300 w-[12%] flex flex-col items-start bg-zinc-900 z-[35] text-[18px] rounded-lg">
        <div
          className="option-box border-amber-300 border-b rounded-t-lg"
          onClick={createRoomOption}
        >
          <div className="flex items-center justify-between">
            <p className="">Create a conversation</p> <FaCaretRight size={20} />
          </div>
          {createOption ? (
            <form action="" onSubmit={createRoom}>
              <input
                className="w-[90%] mt-5 input-modal text-white"
                placeholder="Room Name..."
                ref={roomNameRefInput}
              />
            </form>
          ) : null}
        </div>
        <div className="option-box rounded-b-lg" onClick={joinRoomOption}>
          <div className="flex items-center justify-between">
            <p className="">Join a conversation</p> <FaCaretRight size={20} />
          </div>
          {joinOption ? (
            <form action="" onSubmit={joinRoom}>
              <input
                className="w-[90%] mt-5 input-modal text-white"
                placeholder="Room Id..."
                ref={roomIdRefInput}
              />
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RoomMenu;
