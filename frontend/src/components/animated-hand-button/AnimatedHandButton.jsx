import { useState, useEffect } from "react";
import { Hand, Grab, ChevronLeft, ChevronRight } from "lucide-react";
import "./AnimatedHandButton.css";

export default function AnimatedHandButton() {
  const [offsetX, setOffsetX] = useState(0);
  const [isGrab, setIsGrab] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGrab((prev) => !prev); // toggle every 2 sec
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const maxOffset = 10;
    const percent = (relativeX - centerX) / centerX;
    setOffsetX(percent * maxOffset);
  };

  const handleMouseLeave = () => {
    setOffsetX(0);
  };

  return (
    <div className="animated-hand-wrapper">
      <ChevronLeft className="arrow-icon" size={20} />
      <span
        className={`animated-hand-icon ${isGrab ? "animate-swipe" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        {isGrab ? (
          <Grab size={28} strokeWidth={2.5} color="#0071E3" />
        ) : (
          <Hand size={28} strokeWidth={2.5} color="#0071E3" />
        )}
      </span>
      <ChevronRight className="arrow-icon" size={20} />
    </div>
  );
}