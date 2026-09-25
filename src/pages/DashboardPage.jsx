
import Charts from "../components/Dashboard/Charts";
import CategoryPieChart from "../components/Dashboard/CategoryPieChart";
import { useEffect } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import SummaryCards from "../components/Dashboard/SummaryCards";
import RecentTransactions from "../components/Dashboard/RecentTransactions";

const DashboardPage = () => {
const {getTransactions}=useFinanceStore()
useEffect(()=>{
    getTransactions()
   
   
},[getTransactions])
  return (
    <div className="grid md:grid-cols-2 gap-6">
    
      <RecentTransactions/>
      <SummaryCards />
      <Charts />
      <CategoryPieChart />
    </div>
  );
};

export default DashboardPage;