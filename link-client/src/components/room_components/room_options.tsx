import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface RoomOptionsProperties {
  setCreateOption: (boolean: boolean) => void;
  setJoinOption: (boolean: boolean) => void;
  closeModal: () => void;
}

const RoomOptions = (props: RoomOptionsProperties) => {
  return (
    <div className="modal">
      <button className="close-modal" onClick={props.closeModal}>
        <IoClose size={25} />
      </button>

      <div className="flex flex-col items-center text-white">
        <button
          className="room-options-button"
          onClick={() => props.setCreateOption(true)}
        >
          Create Room
        </button>
        <button
          className="room-options-button"
          onClick={() => props.setJoinOption(true)}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomOptions;
