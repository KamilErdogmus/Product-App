import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/slices/modalSlice";

const Modal = ({ title, content }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.data);
  console.log(data);
  return (
    <div
      className={`top-0 left-0  right-0 w-full h-screen flex justify-center ${
        data.length > 0 ? "items-start" : "items-center"
      }`}
    >
      <div className="w-1/3 bg-indigo-100 shadow-lg rounded-md p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b py-4">
          <h1 className="uppercase text-bold text-3xl">{title}</h1>
          <GrClose
            className="cursor-pointer hover:rounded-md hover:p-1 hover:bg-indigo-400"
            onClick={() => dispatch(showModal())}
            size={28}
          />
        </div>
        {content}
      </div>
    </div>
  );
};

export default Modal;
