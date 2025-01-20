const ImgModal = ({ isOpen, onClose, imgSrc }) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="relative p-4 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out "
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        >
          <button
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-3 hover:bg-red-700 transition-colors text-xl duration-300"
            onClick={onClose}
          >
            x
          </button>
          <div className="flex justify-center items-center w-full h-full">
            <img src={imgSrc} alt="Full Size" className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    );
  };
  
  export default ImgModal;
  