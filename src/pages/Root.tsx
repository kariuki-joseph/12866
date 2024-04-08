import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>Navigation</nav>
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
