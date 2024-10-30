// Loader.jsx
const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-end w-48 h-24 overflow-hidden">
        <div className="w-32 mb-2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 198 93"
            className="trucksvg"
          >
            {/* Your SVG paths here */}
            <path
              strokeWidth="3"
              stroke="#282828"
              fill="#F83D3D"
              d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
            />
            {/* Add other paths here */}
          </svg>
        </div>
        <div className="absolute bottom-0 flex items-center justify-between w-full px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
            className="w-6"
          >
            <circle
              strokeWidth="3"
              stroke="#282828"
              fill="#282828"
              r="13.5"
              cy="15"
              cx="15"
            />
            <circle fill="#DFDFDF" r="7" cy="15" cx="15" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
            className="w-6"
          >
            <circle
              strokeWidth="3"
              stroke="#282828"
              fill="#282828"
              r="13.5"
              cy="15"
              cx="15"
            />
            <circle fill="#DFDFDF" r="7" cy="15" cx="15" />
          </svg>
        </div>
        <div className="w-full h-1.5 bg-gray-800 rounded-md"></div>
      </div>
    </div>
  );
};

export default Loader;
