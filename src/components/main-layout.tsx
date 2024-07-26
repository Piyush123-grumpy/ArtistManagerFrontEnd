import { ApplicationRoutes } from "../routes";
// import Navbar from "../../src/components/navbar";
import Sidebar from "./sidebar";

const MainLayout = () => {
  return (
    <div className="flex flex-row min-h-screen w-full ">
      <Sidebar />
      <main className="flex-grow flex-col min-h-screen flex items-center ">
        <ApplicationRoutes />
      </main>
    </div>
  );
};

export default MainLayout;
