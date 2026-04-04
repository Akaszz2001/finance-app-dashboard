import { useFinanceStore } from "./store/useFinanceStore";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import Layout from "./components/Common/Layout";

function App() {
  const { role } = useFinanceStore();

  // If no role selected → show selection page
  if (!role) {
    return <RoleSelectionPage />;
  }
   
  return (
    <div className="min-h-screen bg-gray-100 p-4">
     <Layout/>
    </div>
  );
}

export default App;