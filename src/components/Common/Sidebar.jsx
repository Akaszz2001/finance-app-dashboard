import { LayoutDashboard, List, BarChart, X, PlusCircle, LogOut } from "lucide-react";
import { useFinanceStore } from "../../store/useFinanceStore";

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) => {
    const { role}=useFinanceStore()
  const menu = [
    { id: "dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { id: "transactions", icon: <List />, label: "Transactions" },
    { id: "insights", icon: <BarChart />, label: "Insights" },
...(role==='admin'?
    [
        {id:'addTransactions',icon:<PlusCircle/>,label:"Add Transactions"}
    ]:[]
),
  { id: "logout", icon: <LogOut />, label: "Logout" }, ];

  return (
    <>
      {/* Overlay (mobile) */}
    {sidebarOpen && (
  <div
    className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full bg-white shadow-lg
          w-64 p-4 transform transition-transform duration-300
           z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        {/* Menu Items */}
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActivePage(item.id);
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 w-full p-3 rounded-lg mb-2 hover:bg-gray-200 ${
              activePage === item.id ? "bg-gray-200" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;