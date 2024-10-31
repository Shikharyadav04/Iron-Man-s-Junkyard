// Loader.jsx
const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3); /* White border */
          border-top: 4px solid #007bff; /* Blue color */
          border-radius: 50%;
          width: 40px; /* Size of the spinner */
          height: 40px; /* Size of the spinner */
          animation: spin 1s linear infinite;
          margin-left: 10px; /* Space between loader and other elements */
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
