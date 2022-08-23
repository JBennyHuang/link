import { IoClose } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

interface RoomJoinPageProperties {
  setJoinOption: (boolean: boolean) => void;
  closeModal: () => void;
}

const RoomJoinPage = (props: RoomJoinPageProperties) => {
  return (
    <div className="modal">
      <button className="back-modal" onClick={() => props.setJoinOption(false)}>
        <IoArrowBackOutline size={25} />
      </button>
      <button className="close-modal" onClick={props.closeModal}>
        <IoClose size={25} />
      </button>

      <div className="">
        <input className="input-modal" type="text" placeholder="Room's id" />
        <button type="submit" className="button-options">
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomJoinPage;
