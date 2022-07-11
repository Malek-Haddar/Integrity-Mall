import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserSession,
  likeSession,
  reset,
  unlikeSession,
} from "../features/sessions/sessionSlice";
import Spinner from "./Spinner";

function Session() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const [sessionId, setSessionId] = useState("");

  const { userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getUserSession());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log({ userSession });

  const addLike = (data) => {
    // const data = {
    //   sessionId,
    // };
    dispatch(likeSession(data));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <>
      <section className="about-section padding-tb padding-b">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="about-image">
                <img src="assets/images/about/01.jpg" alt="about image" />
                <a
                  href="https://www.youtube.com/embed/SP3yyrboTno"
                  className="play-btn"
                  data-rel="lightcase"
                >
                  <i className="icofont-ui-play"></i>
                  <span className="pluse_2"></span>
                </a>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="section-header text-center">
                <h2>Big Digital Meetup</h2>
                <p>About The Digital Meetup Conference 2021</p>
              </div>
              <div className=" section-wrapper text-center ">
                <p>
                  Phosrescently ntiate principle centered networks via magnetic
                  services a Entusiasticaly streamline fulys tested metricels
                  apildiously evisculate standards compliant fullys tested
                  metrics without futureproof web services anfullys tested
                  metrice without creative desi futureproof web services without
                  freproof we that and a services enabled apidiously evisculate
                  are standards compliant web services are afor error free
                </p>
                {/* <div className="about-btn-grp">
                  <Link to="/contact" className="lab-btn">
                    <span>Contact Us </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="schedule-section padding-tb padding-b bg-image">
        <div className="container">
          <div className="section-header">
            <h2>Event Schedule</h2>
            <p>A Representation of the event planning</p>
          </div>
          <section className="content ">
            {userSession[0]?.category?.length > 0 ? (
              <div className="container">
                <div className="section-wrapper shape-b">
                  <div className="row gx-4 gy-5 justify-center w-full">
                    <div className="col-lg-6">
                      {userSession[0]?.category[0]?.sessions.map((session) => (
                        <div className="schedule-left schedule-pack">
                          <h5>
                            {new Date(session.start).toLocaleDateString()}
                          </h5>
                          <div
                            className="schedule-list"
                            id={"accordionExample" + session._id}
                            key={session._id}
                          >
                            <div className="accordion-item">
                              <div
                                className="accordion-header"
                                id={"headingOne" + session._id}
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={"#collapseOne" + session._id}
                                  aria-expanded="true"
                                  aria-controls={"collapseOne" + session._id}
                                >
                                  <span className="accor-header-inner d-flex flex-wrap align-items-center">
                                    {/* <span className="accor-thumb">
                                      <img
                                        src="assets/images/event/member/01.png"
                                        alt="speaker"
                                      />
                                      <span className="child-thumb">
                                        <img
                                          src="assets/images/event/member/02.png"
                                          alt="speaker"
                                        />
                                      </span>
                                      <span className="child-thumb-2">
                                        <img
                                          src="assets/images/event/member/03.png"
                                          alt="speaker"
                                        />
                                      </span>
                                    </span> */}
                                    <span className=" h7">{session.name}</span>
                                  </span>
                                </button>
                              </div>
                              <div
                                id={"collapseOne" + session._id}
                                className="accordion-collapse collapse"
                                aria-labelledby={"headingOne" + session._id}
                                data-bs-parent={
                                  "#accordionExample" + session._id
                                }
                              >
                                <div className="accordion-body">
                                  <ul className="ev-schedule-meta d-flex flex-wrap">
                                    <li>
                                      <p>{session.details}</p>
                                      {/* <span>
                                        <i className="icofont-user"></i>
                                      </span>
                                      {userSession[0]?.category[0]?.name} */}
                                    </li>
                                    <li>
                                      <span>
                                        <i className="icofont-clock-time"></i>
                                      </span>
                                      {new Date(session.start).toLocaleString(
                                        "en-us"
                                      )}
                                      -
                                      {new Date(session.end)
                                        .getHours()
                                        .toLocaleString("en-us")}
                                    </li>
                                    <li></li>
                                  </ul>

                                  <div classname="block">
                                    <a
                                      onClick={() =>
                                        dispatch(likeSession(session._id))
                                      }
                                      type="submit"
                                      className="btn btn-light"
                                    >
                                      <i className="icofont-thumbs-up" />
                                      <span>
                                        {session.likes?.length > 0 && (
                                          <span>{session.likes?.length}</span>
                                        )}
                                      </span>
                                    </a>

                                    {/* {user._id === session.likes._id && ( */}
                                    <a
                                      onClick={() =>
                                        dispatch(unlikeSession(session._id))
                                      }
                                      type="submit"
                                      className="btn btn-light"
                                    >
                                      <i className="icofont-thumbs-down" />
                                    </a>
                                  </div>
                                  {/* )} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="schedule-btns text-center mt-5">
                  <Link to="/calendar" className="lab-btn">
                    Move to Calendar
                  </Link>
                </div>
              </div>
            ) : (
              <div className="section-header">
                <p>No Category affected Yet</p>
                <div className="schedule-btns text-center mt-5">
                  <Link to="/contact" className="lab-btn">
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* <div className="schedule-btns text-center mt-5">
            {}
            <Link to="/calendar" className="lab-btn">
              Move to Calendar
            </Link>
            <Link to="/contact" className="lab-btn">
              Contact Us
            </Link>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Session;
