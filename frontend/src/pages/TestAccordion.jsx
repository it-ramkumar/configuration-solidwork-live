import { useState } from "react";
import LayoutFeatureCard from "../components/layout/LayoutFeaturedCard";

const TestAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const features = [
    {
      label: "Flooring",
      description: "Choose your flooring type",
      image: "/images/png/flooring-four.png",
      options: ["Wooden Flooring", "Vinyl Flooring", "Marble Flooring"],
    },
    {
      label: "Kitchen",
      description: "Modern designs for kitchens",
      image: "/images/png/kitchen.png",
      options: ["Granite", "Marble", "Quartz"],
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
      {features.map((f, idx) => (
        <LayoutFeatureCard
          key={idx}
          {...f}
          isOpen={openIndex === idx} // ✅ tell which card is open
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)} // ✅ toggle open/close
        />
      ))}
    </div>
  );
};

export default TestAccordion;
