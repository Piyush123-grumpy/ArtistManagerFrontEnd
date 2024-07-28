import { useAppDispatch } from "../store/hooks";
import { signOut } from "../store/slicers/auth.slicer";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <aside className="w-[10%] min-w-[220px] bg-[#121212] text-white">
      <div className="mt-8">
        <div className="mx-3 my-2">
          <p className="text-md font-bold">
            Artist Management
          </p>
        </div>
        <Link to="/records" className="mx-2 block p-2 hover:bg-zinc-800">
          <div className="flex ">
            <div className="mx-2">
              <i className="fa-solid fa-record-vinyl"></i>
            </div>
            <p className="text-sm font-bold ml-2">
              User 
            </p>
          </div>
        </Link>
        <Link to="/artist" className="mx-2 block p-2 hover:bg-zinc-800">
          <div className="flex">
            <div className="mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <p className="text-sm font-bold">
              Artists
            </p>
          </div>
        </Link>
        <Link to="/excel" className="mx-3 block p-2 hover:bg-zinc-800">
          <div className="flex">
            <div className="mx-2">
            <i className="fa-solid fa-file-excel"></i>
            </div>
            <p className="text-sm mx-2 font-bold">
              Import Artists
            </p>
          </div>
        </Link>
        <Link
          onClick={() => {
            dispatch(signOut());
          }}
          to="/campaigns "
          className="mx-3 block p-2 hover:bg-zinc-800"
        >
          <div className="flex">
            <div className="mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <p className="text-sm font-bold">
              Logout
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;