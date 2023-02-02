import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getEvents } from "../features/events/eventSlice";
import {
  affectSessionToEvent,
  deleteSession,
  getSessions,
  reset,
} from "../features/sessions/sessionSlice";

import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  ExcelExport,
  Filter,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  Selection,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { Header, Navbar } from "../components/dashboard";
import { customersGrid } from "../data/dummy";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import "../App.css";
import { Footer, Sidebar, ThemeSettings } from "../components/dashboard";

import { useStateContext } from "../contexts/ContextProvider";
import avatar3 from "../data/avatar3.png";
import SessionForm from "../components/session/SessionForm";
import { SiIfixit, SiVerizon } from "react-icons/si";
import { toast } from "react-toastify";

function Session() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [eventId, setEventId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.events);
  const { sessions, userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getSessions());
    dispatch(getEvents());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const affectEvent = () => {
    const data = {
      idSession: sessionId,
      idEvent: eventId,
    };
    dispatch(affectSessionToEvent(data));
    toast("Session Affected 👏");
  };
  const clearSession = () => {
    const data = {
      sessionId,
    };
    dispatch(deleteSession(data));
    dispatch(getSessions());
    toast.error("🛑 User has been deleted ");
  };

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();


  const emails = sessions[17]?.users.map((attendee) => attendee.email);

  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="relative md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
                <div className="py-8">
                  <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className=" text-2xl font-bold text-black">Sessions</h2>
                    <div className="text-end">
                      <div className="flex flex-col md:flex-row w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                        <button
                          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 text-center"
                          type="submit"
                          data-toggle="modal"
                          data-target="#addOrderModalside"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-xl overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            >
                              Start Date
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            >
                              Details
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            >
                              Attendees
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            >
                              Event
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            ></th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sessions.map((session) => (
                            <tr>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0  custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={session._id}
                                      required=""
                                      onChange={(e) =>
                                        setSessionId(e.target.value)
                                      }
                                      value={session._id}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={session._id}
                                    ></label>
                                  </div>

                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {session.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span className="relative">
                                    {new Date(session.start).toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                </span>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span className="relative">
                                    {new Date(session.end).toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                </span>
                              </td>

                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {session.details}
                                </p>
                              </td>

                              <td className="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                                <select className="text-gray-900  border-1 rounded-md w-full">
                                  <option
                                    value={session?.checkIn.length}
                                    key={session?.checkIn?._id}
                                  >
                                    {session?.checkIn?.users?.length} - Attendee
                                  </option>
                                  {session?.checkIn.map((attendee) =>
                                    attendee.users.map((user) => (
                                      <option key={user._id} value={user.email}>
                                        {user.email}
                                      </option>
                                    ))
                                  )}
                                </select>
                              </td>

                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <select
                                  className="text-gray-900  border-1 rounded-md "
                                  onChange={(e) => setEventId(e.target.value)}
                                >
                                  {session?.event ? (
                                    <option value="">
                                      {session?.event?.name}
                                    </option>
                                  ) : (
                                    <option value="">- Select -</option>
                                  )}
                                  {events.map((event) => (
                                    <option key={event._id} value={event._id}>
                                      {event.name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <a
                                  type="submit"
                                  className="text-green-500 hover:text-green-900"
                                  onClick={() => {
                                    affectEvent();
                                  }}
                                >
                                  Affect
                                </a>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <a
                                  type="submit"
                                  className="text-red-500 hover:text-rose-900"
                                  onClick={() => {
                                    clearSession();
                                  }}
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="px-5 bg-white py-2 flex flex-col xs:flex-row items-center xs:justify-between">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="w-full p-3 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                          >
                            <svg
                              width="9"
                              fill="currentColor"
                              height="8"
                              className=""
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                          >
                            1
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                          >
                            2
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                          >
                            3
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                          >
                            4
                          </button>
                          <button
                            type="button"
                            className="w-full p-3 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                          >
                            <svg
                              width="9"
                              fill="currentColor"
                              height="8"
                              className=""
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>

      <SessionForm />
    </>
  );
}

export default Session;
