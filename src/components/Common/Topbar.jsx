import { Menu, Moon, Sun, User } from "lucide-react";

const Topbar = ({ setSidebarOpen }) => {


  
  return (
    <div className="flex items-center justify-between bg-white  px-4 py-3 shadow">
      
  
      <div className="flex items-center gap-3">
     
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden"
        >
          <Menu />
        </button>

        <h1 className="text-lg font-bold">
          Welcome User 👋
        </h1>
      </div>

     
      <div className="flex items-center gap-2">
        <User />
      </div>
    </div>
  );
};

export default Topbar;