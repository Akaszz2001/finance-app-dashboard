
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useFinanceStore } from "../../store/useFinanceStore";

const InsightsPage = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  if (!transactions.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No data available for insights 📊
      </div>
    );
  }

  // 🔥 Highest Category
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  let highestCategory = "N/A";
  let highestAmount = 0;

  Object.entries(categoryMap).forEach(([cat, amt]) => {
    if (amt > highestAmount) {
      highestAmount = amt;
      highestCategory = cat;
    }
  });

  // 🔥 Monthly comparison
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;

  let currentExpense = 0;
  let lastExpense = 0;

  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();

    if (t.type === "expense") {
      if (month === currentMonth) currentExpense += t.amount;
      if (month === lastMonth) lastExpense += t.amount;
    }
  });

  const isIncreased = currentExpense > lastExpense;

  // 🔥 Income vs Expense
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <div className="space-y-6">

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Highest Category */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Highest Spending Category
          </h2>
          <p className="text-2xl font-bold mt-2 text-red-500">
            {highestCategory}
          </p>
          <p className="text-gray-600 mt-1">
            ₹{highestAmount}
          </p>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Monthly Spending
          </h2>

          <div className="flex items-center gap-2 mt-2">
            {isIncreased ? (
              <TrendingUp className="text-red-500" />
            ) : (
              <TrendingDown className="text-green-500" />
            )}

            <p
              className={`text-xl font-bold ${
                isIncreased ? "text-red-500" : "text-green-500"
              }`}
            >
              ₹{currentExpense}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Last Month: ₹{lastExpense}
          </p>
        </div>

        {/* Income vs Expense */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Income vs Expense
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <Wallet className="text-blue-500" />
            <p className="text-xl font-bold">
              ₹{income - expense}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Income: ₹{income} | Expense: ₹{expense}
          </p>
        </div>

      </div>

      {/* Smart Insight Message */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold">
          Insights
        </h2>

        <p className="mt-2 text-lg">
          {isIncreased
            ? "⚠️ Your spending increased this month"
            : "✅ Your spending decreased this month"}
        </p>
      </div>

    </div>
  );
};

export default InsightsPage;