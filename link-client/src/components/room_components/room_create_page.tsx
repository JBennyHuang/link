import { IoClose } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

interface RoomCreatePageProperties {
  setCreateOption: (boolean: boolean) => void;
  closeModal: () => void;
}

const RoomCreatePage = (props: RoomCreatePageProperties) => {
  return (
    <div className="modal">
      <button
        className="back-modal"
        onClick={() => props.setCreateOption(false)}
      >
        <IoArrowBackOutline size={25} />
      </button>
      <button className="close-modal" onClick={props.closeModal}>
        <IoClose size={25} />
      </button>
      <div>
        <input className="input-modal" type="text" placeholder="Room's name" />
        <button type="submit" className="button-options">
          Create
        </button>
      </div>
    </div>
  );
};

export default RoomCreatePage;
