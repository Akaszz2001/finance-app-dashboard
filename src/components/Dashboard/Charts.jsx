import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import { useFinanceStore } from "../../store/useFinanceStore";

const Charts = () => {
  const { transactions } = useFinanceStore();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <LineChart width={400} height={300} data={transactions}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="amount" />
      </LineChart>

      <PieChart width={400} height={300}>
        <Pie data={transactions} dataKey="amount" nameKey="category" />
      </PieChart>
    </div>
  );
};

export default Charts;  