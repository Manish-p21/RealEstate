import { useState, useEffect } from "react";

const CustomCursor = ({ isHovering, selectedNav }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    !selectedNav && (
      <div
        className={`fixed bg-blue-500 pointer-events-none transition-transform duration-200 ease-out z-50 ${
          isHovering ? "w-32 h-12 rounded-md flex items-center justify-center text-white text-sm font-semibold" : "w-3 h-3 rounded-full"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {isHovering && "EXPLORE NOW"}
      </div>
    )
  );
};

export default CustomCursor;