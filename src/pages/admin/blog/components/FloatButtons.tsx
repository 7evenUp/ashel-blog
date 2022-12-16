const FloatButtons = ({
  handlePublish,
  handleSave,
  states: {title, desc, content}
}: {
  handlePublish: () => void;
  handleSave: () => void;
  states: {
    title: string
    desc: string
    content: string
  }
}) => {
  return (
    <div className="fixed bottom-8 right-8 flex gap-4 z-50">
      <button
        className="bg-beige text-black hover:bg-black hover:text-white duration-300 rounded-md py-1 px-2"
        type="button"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        disabled={title === "" || desc === "" || content === ""}
        className="bg-beige text-black hover:bg-black hover:text-white duration-300 rounded-md py-1 px-2 disabled:cursor-not-allowed"
        type="button"
        onClick={handlePublish}
      >
        Publish
      </button>
    </div>
  );
};

export default FloatButtons