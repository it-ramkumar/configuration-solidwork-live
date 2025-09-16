// const LayoutFeatureCard = ({ label, description, image, onClick, active, horizontal }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={`

//         cursor-pointer
//         text-black
//         p-4
//         rounded-xl
//         border
//         transition-all
//         duration-300
//         flex
//         flex-col
//         gap-3
//         hover:shadow-lg
//         overflow-hidden
//         relative

//         ${
//           horizontal
//             ? "min-w-[340px] h-[200px] lg:min-w-[380px] lg:h-[220px]"
//             : "w-full max-w-[400px] h-[200px] lg:h-[220px]"
//         }

//         ${
//           active
//             ? "bg-[#eeeeee] border border-transparent shadow-lg md:scale-[1.02]"
//             : "bg-white/80 border-black/20 hover:bg-white hover:border-black/30"
//         }
//       `}
//       style={{
//         boxShadow: active ? "0 0 6px 2px #0a1e7d" : undefined,
//       }}
//     >


//       {active && (
//         <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent" />
//       )}

//       <h3 className="font-semibold text-xl lg:text-xl text-center">{label}</h3>

//       <div className="flex flex-row gap-4 items-center flex-1">

//         <div
//           className={`
//             w-[120px] h-[120px]
//             lg:w-[120px] lg:h-[120px]
//             flex-shrink-0
//             overflow-hidden
//             rounded-lg
//             bg-transparent
//             flex items-center justify-center
//           `}
//         >
//           <img
//             src={image}
//             alt={label}
//             className={`w-full h-full object-contain p-2 ${active ? "scale-105" : ""}`}
//             style={{ filter: "none", WebkitFilter: "none" }}
//           />
//         </div>

//         <div className="flex flex-col flex-1">
//           <p className="text-lg lg:text-lg text-neutral-700 leading-relaxed">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LayoutFeatureCard;
import { useState } from "react";

const LayoutFeatureCard = ({ 
  label, 
  description, 
  image, 
  options = [], 
  isOpen, 
  onToggle, 
  colors = [] 
}) => {
  const [showColors, setShowColors] = useState(false);
  const [showColorsbg, setShowColorsbg] = useState("");
  return (
    <div
      onClick={onToggle}
      className={`
        cursor-pointer text-black p-5 rounded-xl border
        transition-all duration-300 flex flex-col gap-4
        hover:shadow-lg overflow-hidden relative
        w-full max-w-[420px] h-auto
        ${isOpen ? "bg-[#f9fafb] shadow-lg" : "bg-white/90 border-gray-200"}
      `}
      style={{
        boxShadow: isOpen ? "0 0 10px 2px rgba(10,30,125,0.3)" : undefined,
      }}
    >
      {/* Title */}
      <h3 className="font-semibold text-xl text-center text-gray-900">
        {label}
      </h3>

      {/* Image + Description */}
      <div className="flex flex-row gap-4 items-center">
        {/* Image Section */}
        <div style={{ backgroundColor: showColorsbg }}
          className="w-[120px] h-[120px] flex-shrink-0 overflow-hidden 
                     rounded-lg flex items-center justify-center 
                     hover:scale-105 transition"
          onClick={(e) => {
            e.stopPropagation();
            setShowColors(!showColors);
          }}
        >
          <img
            src={image}
            alt={label}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col flex-1">
          <p className="text-base text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Colors Section */}
      {showColors && colors.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Available Colors
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {colors.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 p-2 rounded-lg bg-white 
                           shadow-sm border hover:shadow-md transition cursor-pointer"
              >
                {/* Color Preview */}
                {c.hex && (
                  <span
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: c.hex }}
                  />
                )}
                

                {/* Color Name */}
                <span onClick={()=>
                  {setShowColorsbg(c.hex)}
                } className="text-sm text-gray-700" style={{ backgroundColor: c.hex }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accordion Options Section */}
      {isOpen && options.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation(); // don’t collapse when clicking button
                alert(`You clicked: ${opt}`);
              }}
              className="px-4 py-2 rounded-lg bg-gray-100 
                         hover:bg-gray-200 text-sm text-left transition"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayoutFeatureCard;
