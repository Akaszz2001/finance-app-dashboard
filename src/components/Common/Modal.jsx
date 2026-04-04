const Modal = ({ children, onClose }) => {
  return (
    <>
      {/* 🔳 Overlay with blur */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/30 z-40"
        onClick={onClose}
      />

      {/* 📦 Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // prevent close on inside click
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;