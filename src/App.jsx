import { useFinanceStore } from "./store/useFinanceStore";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import Layout from "./components/Common/Layout";



function App() {
  const { role } = useFinanceStore();


  if (!role) {
    return <RoleSelectionPage />;
  }
   
  return (
    <div  className="min-h-screen bg-gray-10">
     <Layout/>
    </div>
  );
}

export default App;