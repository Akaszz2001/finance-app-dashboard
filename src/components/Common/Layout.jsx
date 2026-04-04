import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import DashboardPage from "../../pages/DashboardPage";
import TransactionsPage from "../../pages/TransactionsPage";
import AddTransactionForm from "../../pages/AddTransactionForm";
import { useFinanceStore } from "../../store/useFinanceStore";
// import Insights from "../Insights/Insights";

const Layout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {removeRole}=useFinanceStore()

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "transactions":
        return <TransactionsPage />;
          case "addTransactions":
            return <AddTransactionForm />;
            case "logout":
                removeRole()
                return
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      
      {/* Topbar */}
      <Topbar setSidebarOpen={setSidebarOpen} />

      {/* Body */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Layout;