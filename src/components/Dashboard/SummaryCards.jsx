import { useFinanceStore } from "../../store/useFinanceStore";

const SummaryCards = () => {
  const { transactions } = useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card title="Balance" value={balance} />
      <Card title="Income" value={income} />
      <Card title="Expenses" value={expense} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-2xl shadow">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-xl font-bold">₹{value}</p>
  </div>
);

export default SummaryCards;