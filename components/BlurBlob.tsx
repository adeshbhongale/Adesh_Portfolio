type BlurBlobProps = {
  position?: { top?: string; left?: string };
  size?: { width?: string; height?: string };
};

const BlurBlob = ({ position, size }: BlurBlobProps) => {
  return (
    <div
      className="absolute"
      style={{
        top: position?.top || "0%",
        left: position?.left || "50%",
        width: size?.width || "50%",
        height: size?.height || "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }}
    >
      <div className="w-full h-full bg-purple-500 rounded-full opacity-3 blur-3xl animate-pulse"></div>
    </div>
  );
};

export default BlurBlob;
