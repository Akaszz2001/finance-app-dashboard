import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useFinanceStore } from "../../store/useFinanceStore";

const Charts = () => {
  const transactions = useFinanceStore((state) => state.transactions);


  const sortedData = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-4">
        Transactions Over Time
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;