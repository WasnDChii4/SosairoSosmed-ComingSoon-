import TopNavbar from "./TopNavbar";
import SidebarLeft from "./SidebarLeft";

export default function LayoutPage({ children }) {
  return (
    <div className="relative min-h-screen">
      <TopNavbar />
      <SidebarLeft />
      <main className="p-4 pl-20 pt-14">
        {children}
      </main>
    </div>
  );
};
