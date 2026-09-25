
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


  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);
const suggestions = [];


if (expense > income) {
  suggestions.push("⚠️ Your expenses exceed your income");
} else if (income > expense) {
  suggestions.push("✅ Good job! You are saving money");
}


if (highestCategory !== "N/A") {
  suggestions.push(
    `⚠️ You are spending most on ${highestCategory}. Try reducing it.`
  );
}


if (currentExpense > lastExpense) {
  suggestions.push("📈 Your spending increased this month");
} else if (currentExpense < lastExpense) {
  suggestions.push("📉 Your spending decreased this month");
}


if (!suggestions.length) {
  suggestions.push("No insights available");
}


const top3 = Object.entries(categoryMap)
  .map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 3);


const totalExpense = top3.reduce((acc, t) => acc + t.value, 0);
  return (
    <div className="space-y-6">

      <div className="grid md:grid-cols-3 gap-6">

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

<div className="bg-white p-6 rounded-2xl shadow mt-6">
  <h2 className="text-lg font-semibold mb-4">
    Smart Suggestions
  </h2>

  <div className="space-y-3">
    {suggestions.map((msg, index) => {
      const isWarning = msg.includes("⚠️");
      const isGood = msg.includes("✅");

      return (
        <div
          key={index}
          className={`p-3 rounded-lg text-sm flex gap-2 ${
            isWarning
              ? "bg-red-50 text-red-600"
              : isGood
              ? "bg-green-50 text-green-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <span>💡</span>
          <p>{msg}</p>
        </div>
      );
    })}
  </div>
</div>


<div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
  <h2 className="text-gray-500 text-sm mb-4">
    Top Spending Categories
  </h2>

  <div className="space-y-3">
    {top3.map((item, index) => (
      <div
        key={item.name}
        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
      >
       
        <div className="flex items-center gap-3">
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${
              index === 0
                ? "bg-yellow-500"
                : index === 1
                ? "bg-gray-400"
                : "bg-orange-400"
            }`}
          >
            {index + 1}
          </span>

          <span className="font-medium">{item.name}</span>
        </div>

      
        <div className="flex flex-col items-end">
          <span className="font-semibold text-red-500">
            ₹{item.value}
          </span>

          <span className="text-xs text-gray-500">
            ({((item.value / totalExpense) * 100).toFixed(1)}%)
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default InsightsPage;