import { useState, useRef, useEffect } from "react";
import FeatureCard from "./LayoutFeaturedCard";
import VanModelCanvas from "./LayoutCanvas";
import { Expand, X, ChevronsLeft, ChevronsRight, RotateCw } from "lucide-react";
import "./Layout.css";
import { Link } from "react-router-dom";
import { VanModel } from "../../ModelData";
import { useSelector, useDispatch } from "react-redux";
import { fetchModelAll } from "../../api/model/modelAll";

const Layout = () => {
  const dispatch = useDispatch();
  const modelAll = useSelector((state) => state.models.modelAll || []);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isConfigureNowVisible, setIsConfigureNowVisible] = useState(true);
  const [error, setError] = useState(null);
  const selectModel = useSelector((state) => state.selectLayout.selectLayout);
  const desktopScrollRef = useRef(null);
  const desktopConfigureNowRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const mobileCardRefs = useRef([]);
  const configureNowRef = useRef(null);

  const [showRotateMessage, setShowRotateMessage] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const filteredModel = VanModel?.filter((layout) => layout.layout === selectModel);
  const features = filteredModel?.[0]?.includes;

  const matchedModels = modelAll?.data?.data?.filter((model) =>
    features?.some((feature) => feature === model.label)
  );

  // Fetch backend data with error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        await dispatch(fetchModelAll());
      } catch (err) {
        console.error("Backend Error:", err);
        setError(err.message || "Something went wrong with the backend.");
      }
    };
    fetchData();
  }, [dispatch]);

  // Orientation handling
  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscape);
      if (showFullscreen) setShowRotateMessage(!isLandscape);
    };
    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);
    handleOrientationChange();
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [showFullscreen]);

  // Configure More button observer
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const mobileTarget = configureNowRef.current;
      const desktopTarget = desktopConfigureNowRef.current;

      const observer = new IntersectionObserver(
        ([entry]) => setIsConfigureNowVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );

      if (window.innerWidth >= 1024 && desktopTarget) {
        observer.observe(desktopTarget);
      } else if (mobileTarget) {
        observer.observe(mobileTarget);
      }

      const handleResize = () => {
        observer.disconnect();
        if (window.innerWidth >= 1024 && desktopTarget) observer.observe(desktopTarget);
        else if (mobileTarget) observer.observe(mobileTarget);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [showFullscreen]);

  // Mobile scroll effect
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setShowLeftBlur(scrollLeft > 10);
      setShowRightBlur(scrollLeft + clientWidth < scrollWidth - 10);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ERROR HANDLING
  if (error) {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Backend Error: {error}
      </div>
    );
  }

  if (!filteredModel?.length) {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Santa monika not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2f2f2f] text-black">
      <main className="relative min-h-[100dvh]">
        {/* Desktop View */}
        {!showFullscreen && (
          <>
            <div className="hidden lg:flex flex-col fixed top-[20px] left-6 w-[61%] h-[calc(100vh-40px)] z-10">
              <h1 className="metallic-black-heading text-2xl font-bold text-center mb-4 text-red-600 text-white">
                {filteredModel[0].layout}
              </h1>

              <div className="flex-1 p-6 bg-gradient-to-br from-white to-neutral-100 rounded-xl overflow-hidden border border-black/10 relative">
                <div className="absolute inset-0 pointer-events-none rounded-xl z-10 bg-gradient-to-t from-[rgba(123,123,123,0.18)] to-[rgba(228,228,228,0)]" />

                <button
                  onClick={() => {
                    setShowFullscreen(true);
                    setTimeout(() => setIsFullscreen(true), 10);
                  }}
                  className="absolute bottom-6 left-6 z-20 bg-white shadow-lg rounded-full p-2 hover:scale-105 transition"
                >
                  <Expand size={20} className="text-black" />
                </button>

                <div className="h-full w-full overflow-hidden rounded-lg relative z-0">
                  <VanModelCanvas />
                </div>

                {/* <div className="absolute bottom-6 right-6 max-w-[300px] bg-black/10 backdrop-blur-sm p-4 rounded-xl border border-black/10 z-20">
                  {selectedFeature ? (
                    <>
                      <h3 className="text-xl font-medium mb-1">{selectedFeature.label}</h3>
                      <p className="text-neutral-700 text-sm">{selectedFeature.description}</p>
                    </>
                  ) : (
                    <p className="text-neutral-500 text-sm italic">Select a feature to preview</p>
                  )}
                </div> */}
              </div>
            </div>

            <div className="hidden lg:flex flex-col ml-[64%] px-6 pt-0">
              <div className="sticky top-0 z-50 bg-[#2f2f2f] py-4 mb-0">
                <h1 className="text-xl font-bold text-center text-white">Layout Features</h1>
              </div>

              <div ref={desktopScrollRef} className="flex flex-col items-center gap-4">
                {matchedModels?.map((feat, index) => (
                  <FeatureCard
                    key={index}
                    {...feat}
                    active={selectedFeature?.label === feat.label}
                    onClick={() =>
                      setSelectedFeature((prev) => (prev?.label === feat.label ? null : feat))
                    }
                  />
                ))}
              </div>

              <div
                className="flex flex-col items-center gap-3 px-4 py-8 border-t border-black/10 bg-black/5 mt-6"
                ref={desktopConfigureNowRef}
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  {/* <div className="text-2xl font-bold">$ {filteredModel[0].price}</div> */}

                  <div className="flex flex-col items-center gap-3">
                    <button className="desktop-configure-button">
                      <span className="relative z-10">
                        <Link className="no-underline text-white hover:underline" to="/van">
                          Configure More
                        </Link>
                      </span>
                      <div className="button-overlay"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Fullscreen View */}
        {showFullscreen && (
          <div
            className={`fixed inset-0 z-[999] bg-white flex items-center justify-center transition-opacity duration-500 ${
              isFullscreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => {
                setIsFullscreen(false);
                setTimeout(() => setShowFullscreen(false), 500);
              }}
              className="absolute top-4 right-4 z-[1000] bg-white text-black hover:bg-neutral-200 p-2 rounded-full shadow"
            >
              <X size={20} />
            </button>

            {showRotateMessage && !isLandscape && (
              <div className="absolute top-22 left-1/2 transform -translate-x-1/2 z-[1000] flex items-center justify-center text-base font-medium text-black text-center max-w-md w-full px-4">
                <RotateCw className="w-16 h-8 animate-spin-slow -mr-4 -mt-1 shrink-0" />
                <span className="leading-tight">
                  Please rotate your device for a better viewing experience
                </span>
              </div>
            )}

            <div className="w-full h-full">
              <VanModelCanvas />
            </div>
          </div>
        )}

        {/* Mobile View */}
        <div className="lg:hidden w-full min-h-screen flex flex-col justify-between px-0 pt-6 pb-4 overflow-hidden">
          <h1 className="text-[1.80rem] font-bold text-center text-black -mb-20">
            Layout
          </h1>

          <div>
            <div className="mb-4 mt-4 rounded-xl overflow-hidden border border-black/10 bg-gradient-to-br from-white to-neutral-100 relative mx-4">
              <div className="absolute inset-0 pointer-events-none z-10 rounded-xl bg-gradient-to-t from-[rgba(123,123,123,0.12)] to-[rgba(228,228,228,0)]" />
              <div className="w-full h-[300px] rounded-lg overflow-hidden relative z-0">
                <button
                  onClick={() => {
                    setShowFullscreen(true);
                    setTimeout(() => setIsFullscreen(true), 10);
                  }}
                  className="absolute bottom-3 right-3 z-20 bg-white shadow-md rounded-full p-2 hover:scale-105 transition"
                >
                  <Expand size={20} className="text-black" />
                </button>
                <VanModelCanvas />
              </div>

              <div className="p-4 relative z-20">
                {selectedFeature ? (
                  <>
                    <h3>{selectedFeature.label || selectedFeature.title}</h3>
                    <p>{selectedFeature.description || selectedFeature.desc}</p>
                  </>
                ) : (
                  <p className="text-neutral-500 text-sm italic">Select a feature to preview</p>
                )}
              </div>
            </div>

            <div className="mb-2 px-4">
              <h2 className="text-2xl font-bold text-gray-950">Layout Features</h2>
            </div>

            <div className="relative">
              <div
                className="flex snap-x snap-mandatory overflow-x-auto pb-2 no-scrollbar scroll-smooth touch-pan-x"
                style={{ scrollSnapType: "x mandatory", scrollSnapStop: "always" }}
                ref={mobileScrollRef}
              >
                {matchedModels?.map((feat, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full snap-center px-4 pt-3"
                    ref={(el) => (mobileCardRefs.current[index] = el)}
                  >
                    <FeatureCard
                      {...feat}
                      horizontal
                      active={selectedFeature?.label === feat.label}
                      onClick={() =>
                        setSelectedFeature((prev) => (prev?.label === feat.label ? null : feat))
                      }
                    />
                  </div>
                ))}
              </div>

              {!isScrolling && showLeftBlur && (
                <div className="pointer-events-none absolute top-[4%] left-0 h-[94%] w-8 rounded-tl-xl rounded-bl-xl bg-gradient-to-r from-zinc-200/80 via-white/80 to-transparent backdrop-blur-sm z-10" />
              )}
              {!isScrolling && showRightBlur && (
                <div className="pointer-events-none absolute top-[4%] right-0 h-[94%] w-8 rounded-tr-xl rounded-br-xl bg-gradient-to-l from-zinc-200/80 via-white/80 to-transparent backdrop-blur-sm z-10" />
              )}
            </div>
          </div>

          <div className="flex items-center text-xl justify-center gap-2 text-sm text-neutral-900 mb-1 animate-pulse">
            <ChevronsLeft size={28} className="relative top-[3px]" />
            <span className="[font-family:'Dancing_Script',cursive] text-lg">Swipe to see more</span>
            <ChevronsRight size={28} className="relative top-[2px]" />
          </div>

          <div
            className="mt-4 bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center mx-4"
            ref={configureNowRef}
          >
            {/* <div className="text-2xl font-bold">${filteredModel[0].price}</div> */}

            <Link to="/van" className="configure-button">
              <span className="relative z-10">Configure More</span>
              <div className="button-overlay"></div>
            </Link>
          </div>
        </div>

        {!isConfigureNowVisible && (
          <div className="fixed bottom-4 right-4 z-50">
            {/* <button
              className="sticky-configure-button"
              onClick={() => {
                if (desktopConfigureNowRef.current) {
                  desktopConfigureNowRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <span className="relative z-10">Configure More</span>
              <div className="button-overlay"></div>
            </button> */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;
