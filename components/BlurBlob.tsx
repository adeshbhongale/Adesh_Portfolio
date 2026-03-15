type BlurBlobProps = {
  position?: { top?: string; left?: string };
  size?: { width?: string; height?: string };
};

const BlurBlob = ({ position, size }: BlurBlobProps) => {
  return (
    <div
      className="absolute"
      style={{
        top: position?.top || "20%",
        left: position?.left || "35%",
        width: size?.width || "35%",
        height: size?.height || "35%",
        transform: "translate(-50%)"
      }}
    >
      <div className="w-full h-full bg-purple-500 rounded-full opacity-3 blur-3xl animate-pulse"></div>
    </div>
  );
};

export default BlurBlob;
