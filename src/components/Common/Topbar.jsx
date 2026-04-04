import { Menu, User } from "lucide-react";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 shadow">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Toggle button (mobile only) */}
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

      {/* Right */}
      <div className="flex items-center gap-2">
        <User />
      </div>
    </div>
  );
};

export default Topbar;