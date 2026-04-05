
import Charts from "../components/Dashboard/Charts";
import CategoryPieChart from "../components/Dashboard/CategoryPieChart";
import { useEffect } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import SummaryCards from "../components/Dashboard/SummaryCards";

const DashboardPage = () => {
const {getTransactions}=useFinanceStore()
useEffect(()=>{
    getTransactions()
   
   
},[getTransactions])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <h1 className="text-2xl font-bold mb-4 ">Dashboard</h1>
      <SummaryCards />
      <Charts />
      <CategoryPieChart />
    </div>
  );
};

export default DashboardPage;