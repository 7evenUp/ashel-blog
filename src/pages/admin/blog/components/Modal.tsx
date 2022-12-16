import React, { Dispatch, SetStateAction } from "react";

const Modal = ({
  state,
  setState,
  close
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  close: () => void
}) => {
  return (
    <div className="absolute w-screen h-screen bg-black opacity-30 top-0 left-0 z-20">
      <div className="flex flex-col gap-2 absolute top-1/2 left-1/2 w-96 h-80 -translate-x-1/2 -translate-y-1/2 z-30">
        <span className="text-white text-lg">Description: </span>
        <textarea
          className="text-black bg-white w-full h-full outline-none p-2 resize-none"
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        />
      </div>
      <button
        type="button"
        className="absolute right-4 top-4 z-30 text-white text-5xl rotate-45 hover:text-beige"
        onClick={close}
      >+</button>
    </div>
  )
};

export default Modal;
