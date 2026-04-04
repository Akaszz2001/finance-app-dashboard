import SummaryCards from "../components/Dashboard/SummaryCards";
import Charts from "../components/Dashboard/Charts";

const DashboardPage = () => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <SummaryCards />
      {/* <Charts /> */}
    </div>
  );
};

export default DashboardPage;