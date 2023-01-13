const FloatButtons = ({
  handlePublish,
  handleSave,
  states: {title, desc, content},
  isSaving,
  isPublishing
}: {
  handlePublish: () => void;
  handleSave: () => void;
  states: {
    title: string
    desc: string
    content: string
  }
  isSaving: boolean
  isPublishing: boolean
}) => {
  
  return (
    <div className="fixed bottom-8 right-8 flex gap-4 z-50">
      <button
        className="bg-beige text-black hover:bg-black hover:text-white duration-300 rounded-md py-1 px-2"
        type="button"
        onClick={handleSave}
      >
        {isSaving ? 'Saving' : 'Save'}
      </button>
      <button
        disabled={title === "" || desc === "" || content === ""}
        className="bg-beige text-black hover:bg-black hover:text-white duration-300 rounded-md py-1 px-2 disabled:cursor-not-allowed"
        type="button"
        onClick={handlePublish}
      >
        {isPublishing ? 'Publishing' : 'Publish'}
      </button>
    </div>
  );
};

export default FloatButtons