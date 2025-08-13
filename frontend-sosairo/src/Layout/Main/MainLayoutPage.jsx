import { Outlet } from "react-router-dom";
import MainSidebarLeft from "./MainSidebarLeft";

export default function MainLayoutPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-20 h-full flex-shrink-0 overflow-y-auto">
          <MainSidebarLeft />
        </div>
        <main className="flex-1 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
