import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectLayout } from "../../redux/slices/selectLayout";
import "../../pages/Home.css";
import "./LandingPage.css";
import { setAddedModels } from "../../redux/slices/addedModels";
import data from "../../json data/newCard.json";

const LandingPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="landing-scroll-wrapper">
      <div className="d-flex align-items-center justify-content-center min-vh-90">
        <div className="container">
          <h3 className="text-center py-3 mb-4 fw-bold text-uppercase page-title">
            Santa Monica Premium
          </h3>

          <div className="row g-4 justify-content-center">
            {data?.cards?.map((card, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
              >
                <div className="flip-card">
                  <div className="flip-card-inner">
                    {/* Front Side */}
                    <div className="flip-card-front d-flex flex-column align-items-center justify-content-center">
                      <Link
                        to="/layout"
                        onClick={() => dispatch(setSelectLayout(card?.layout))}
                        className="text-decoration-none text-center w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                      >
                        <img
                          src={card?.img}
                          alt={card?.title}
                          className="flip-img"
                        />
                        <div className="mt-2 fw-semibold small card-title-text">
                          {card?.title}
                          {/* {card?.title || `Layout ${index + 1}`} */}
                        </div>
                      </Link>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back d-flex flex-column justify-content-center align-items-center p-3">
                      <Link
                        onClick={() => {
                          dispatch(setSelectLayout(card?.layout));
                          if (card.layout === "Layout") {
                            dispatch(setAddedModels([]));
                          }
                        }}
                        to={`${card.layout === "Layout" ? "/van" : "/layout"}`}
                        className="text-decoration-none w-100 h-100"
                      >
                        <h6 className="fw-bold mb-3 text-dark">{card?.title}</h6>
                        <div className="description-list w-100 overflow-y-auto">
                          {card.includes && (
                            <ul className="small text-start ps-3 pt-0 mt-0 mb-1 description-points">
                              {card?.includes?.map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
