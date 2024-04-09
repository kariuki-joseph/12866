import { NavLink, Outlet } from "react-router-dom";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import paperPlaneTiltSecondary from "/icons/paper-plane-tilt-secondary.svg";
import expandMore from "/icons/expand_more.svg";
import notifications from "/icons/notifications.svg";

export default function Root() {
  return (
    <>
      <nav
        className={
          "h-[70px] flex flex-row items-center justify-between border-b border-gray-200"
        }
      >
        <div className={"flex flex-row items-center gap-4"}>
          <div
            className={
              "w-[240px] flex flex-row items-center justify-center gap-4"
            }
          >
            <div className={"flex flex-row items-center"}>
              <img src={paperPlaneTilt} alt={"logo"} />
            </div>

            <h1 className={"text-primary text-3xl"}>Weteach</h1>
          </div>

          <div
            className={
              "flex flex-col items-center justify-evenly text-left text-sm"
            }
          >
            <p className={"text-gray-500 w-full"}>Hello</p>
            <p>Welcome back</p>
          </div>
        </div>

        <div className={"flex flex-row items-center gap-4"}>
          <div>
            <img src={notifications} alt={"logo"} />
          </div>

          <div className={"bg-purple-50 p-2 rounded-3xl"}>
            <img src={paperPlaneTilt} alt={"logo"} className={"w-6 h-6"} />
          </div>

          <div
            className={"flex flex-row items-center justify-evenly gap-2 mr-4"}
          >
            <p className={"text-sm"}>Peter Muhia</p>
            <div>
              <img src={expandMore} alt={"expandMore"} />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-row h-[calc(100vh-70px)]">
        <aside className=" border-r border-gray-200">
          <menu className="w-[240px] flex flex-col gap-1 text-gray-500 px-3 pt-3 *:w-full text-sm">
            <NavLink to="/">
              {({ isActive }) => (
                <div
                  className={`flex flex-row items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-gray-100" : ""}`}
                >
                  {isActive ? (
                    <div>
                      <img
                        src={paperPlaneTiltSecondary}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={paperPlaneTiltPlain}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  )}
                  <p className={`${isActive ? "text-secondary" : ""}`}>
                    Schools
                  </p>
                </div>
              )}
            </NavLink>
            <NavLink to="/teachers">
              {({ isActive }) => (
                <div
                  className={`flex flex-row items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-gray-100" : ""}`}
                >
                  {isActive ? (
                    <div>
                      <img
                        src={paperPlaneTiltSecondary}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={paperPlaneTiltPlain}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  )}
                  <p className={`${isActive ? "text-secondary" : ""}`}>
                    Teachers
                  </p>
                </div>
              )}
            </NavLink>
            <NavLink to="/manage-posts">
              {({ isActive }) => (
                <div
                  className={`flex flex-row items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-gray-100" : ""}`}
                >
                  {isActive ? (
                    <div>
                      <img
                        src={paperPlaneTiltSecondary}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={paperPlaneTiltPlain}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  )}
                  <p className={`${isActive ? "text-secondary" : ""}`}>
                    Manage Posts
                  </p>
                </div>
              )}
            </NavLink>
            <NavLink to="/finances">
              {({ isActive }) => (
                <div
                  className={`flex flex-row items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-gray-100" : ""}`}
                >
                  {isActive ? (
                    <div>
                      <img
                        src={paperPlaneTiltSecondary}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={paperPlaneTiltPlain}
                        alt={"paperPlaneTilt"}
                        className={"w-6 h-6"}
                      />
                    </div>
                  )}
                  <p className={`${isActive ? "text-secondary" : ""}`}>
                    Finances
                  </p>
                </div>
              )}
            </NavLink>
          </menu>
        </aside>

        <main className="bg-[#FDFDFD] p-4 w-[calc(100vw-240px)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}
