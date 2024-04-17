import { NavLink, Outlet, useNavigate } from "react-router-dom";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import paperPlaneTiltSecondary from "/icons/paper-plane-tilt-secondary.svg";
import expandMore from "/icons/expand_more.svg";
import person from "/icons/person.svg";
import payments from "/icons/payments.svg";
import payments_secondary from "/icons/payments_secondary.svg";
import person_plain from "/icons/person_plain.svg";
import person_secondary from "/icons/person_secondary.svg";
import school from "/icons/school.svg";
import school_secondary from "/icons/school_secondary.svg";
import { User } from "../interfaces/api.ts";
import * as Popover from "@radix-ui/react-popover";

export default function Root({ user }: { user: User | null }) {
  const navigate = useNavigate();
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

        <Popover.Root>
          <Popover.Trigger>
            <div className={"flex flex-row items-center gap-4"}>
              <div className={"bg-purple-50 p-2 rounded-3xl"}>
                <img src={person} alt={"logo"} className={"w-6 h-6"} />
              </div>

              <div
                className={
                  "flex flex-row items-center justify-evenly gap-2 mr-4"
                }
              >
                <p className={"text-sm"}>{user !== null ? user.name : "-"}</p>
                <div>
                  <img src={expandMore} alt={"expandMore"} />
                </div>
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content
            sideOffset={6}
            align={"end"}
            className={
              "rounded-lg text-sm flex flex-col py-1 *:py-2 *:px-3 text-gray-500 right-10 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            }
          >
            <button
              className={"hover:bg-gray-200 hover:text-black text-left"}
              onClick={() => {
                sessionStorage.setItem("accessToken", "");
                navigate("login");
              }}
            >
              Logout
            </button>
          </Popover.Content>
        </Popover.Root>
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
                        src={school_secondary}
                        alt={"school_secondary"}
                        className={"w-8 h-8"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img src={school} alt={"school"} className={"w-8 h-8"} />
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
                        src={person_secondary}
                        alt={"paperPlaneTilt"}
                        className={"w-8 h-8"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={person_plain}
                        alt={"paperPlaneTilt"}
                        className={"w-8 h-8"}
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
                        className={"w-8 h-8"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={paperPlaneTiltPlain}
                        alt={"paperPlaneTilt"}
                        className={"w-8 h-8"}
                      />
                    </div>
                  )}
                  <p className={`${isActive ? "text-secondary" : ""}`}>
                    Manage Posts
                  </p>
                </div>
              )}
            </NavLink>
            <NavLink to="/payments">
              {({ isActive }) => (
                <div
                  className={`flex flex-row items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-gray-100" : ""}`}
                >
                  {isActive ? (
                    <div>
                      <img
                        src={payments_secondary}
                        alt={"payments_secondary"}
                        className={"w-8 h-8"}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={payments}
                        alt={"payments"}
                        className={"w-8 h-8"}
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

        <main className="bg-[#FDFDFD] p-4 w-[calc(100vw-240px)] overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </>
  );
}
