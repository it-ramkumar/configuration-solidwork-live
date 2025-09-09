const LayoutFeatureCard = ({ label, description, image, onClick, active, horizontal }) => {
  return (
    <div
      onClick={onClick}
      className={`
        
        cursor-pointer
        text-black
        p-4
        rounded-xl
        border
        transition-all
        duration-300
        flex
        flex-col
        gap-3
        hover:shadow-lg
        overflow-hidden
        relative

        ${
          horizontal
            ? "min-w-[340px] h-[200px] lg:min-w-[380px] lg:h-[220px]"
            : "w-full max-w-[400px] h-[200px] lg:h-[220px]"
        }

        ${
          active
            ? "bg-[#eeeeee] border border-transparent shadow-lg md:scale-[1.02]"
            : "bg-white/80 border-black/20 hover:bg-white hover:border-black/30"
        }
      `}
      style={{
        boxShadow: active ? "0 0 6px 2px #0a1e7d" : undefined,
      }}
    >


      {active && (
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent" />
      )}

      <h3 className="font-semibold text-xl lg:text-xl text-center">{label}</h3>

      <div className="flex flex-row gap-4 items-center flex-1">

        <div
          className={`
            w-[120px] h-[120px]
            lg:w-[120px] lg:h-[120px]
            flex-shrink-0
            overflow-hidden
            rounded-lg
            bg-transparent
            flex items-center justify-center
          `}
        >
          <img
            src={image}
            alt={label}
            className={`w-full h-full object-contain p-2 ${active ? "scale-105" : ""}`}
            style={{ filter: "none", WebkitFilter: "none" }}
          />
        </div>

        <div className="flex flex-col flex-1">
          <p className="text-lg lg:text-lg text-neutral-700 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayoutFeatureCard;
