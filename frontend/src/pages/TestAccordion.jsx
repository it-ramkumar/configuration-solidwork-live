import LayoutFeatureCard from "../components/layout/LayoutFeaturedCard";

const TestAccordion = () => {
  return (
    <div className="p-6 flex justify-center">
      <LayoutFeatureCard
        label="Flooring"
        description="Choose your flooring type"
        image="/images/png/flooring-four.png"
        options={["Wooden Flooring", "Vinyl Flooring", "Marble Flooring"]}
      />
    </div>
  );
};

export default TestAccordion;
