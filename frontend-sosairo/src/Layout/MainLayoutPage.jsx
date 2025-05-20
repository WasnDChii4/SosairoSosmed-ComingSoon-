import MainTopNavbar from "./MainTopNavbar";
import MainSidebarLeft from "./MainSidebarLeft";

export default function MainLayoutPage({ children }) {
  return (
    <div className="relative h-screen">
      <MainTopNavbar />
      <MainSidebarLeft />
      <main className="p-4 pl-20 pt-14">
        {children}
      </main>
    </div>
  );
};
