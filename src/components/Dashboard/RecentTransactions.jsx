import { useFinanceStore } from "../../store/useFinanceStore";


const RecentTransactions = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

  if (!recent.length) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-gray-500">No recent transactions</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Recent Transactions
      </h2>

      <div className="space-y-3">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border-b pb-2 last:border-none"
          >
            <div>
              <p className="font-medium">{t.category}</p>
              <p className="text-xs text-gray-500">{t.date}</p>
            </div>

            <p
              className={`font-semibold ${
                t.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ₹{t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;