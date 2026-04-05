import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinanceStore } from "../../store/useFinanceStore";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

const CategoryPieChart = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  if (!data.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <p>No expense data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4">
        Category Breakdown
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* Pie Chart */}
        <div className="w-full md:w-2/3 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
               
                outerRadius={100}
                
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 Custom Legend */}
        <div className="w-full md:w-1/3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-3 mb-2"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />
              <span className="text-sm font-medium">
                {item.name} (₹{item.value})
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategoryPieChart;