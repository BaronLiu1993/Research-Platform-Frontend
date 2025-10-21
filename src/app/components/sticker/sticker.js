"use client";

export default function FloatingSticker({ icon, color, edgeColor, position }) {
  return (
    <div className="absolute " style={position}>
      <div className={`${color} rounded-md shadow-lg w-[5rem] h-[5rem] backdrop-blur-sm flex overflow-hidden`}>
        <div className={`${edgeColor} bg-current w-2`}></div>
        <div className = "flex items-center justify-center w-full">
        <div>{icon}</div>
        </div>
      </div>
    </div>
  );
}