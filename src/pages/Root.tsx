import { Outlet } from "react-router-dom";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
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
              "w-[300px] flex flex-row items-center justify-center gap-4"
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
            <p className={"text-slate-500 w-full"}>Hello</p>
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
      <div className="flex flex-row">
        <aside className="w-[300px]">
          <menu>
            <li>Schools</li>
            <li>Teachers</li>
            <li>Manage Posts</li>
            <li>Finances</li>
          </menu>
        </aside>
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}
