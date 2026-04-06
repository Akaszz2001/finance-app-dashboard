import { useEffect, useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import Modal from "../Common/Modal";
import AddTransactionForm from "../../pages/AddTransactionForm";

const TransactionTable = () => {
  const { transactions, role, deleteTransaction,getTransactions } = useFinanceStore();

    
const [open, setOpen] = useState(false);
const [formdata,setFormData]=useState(null)

const [visibleCount, setVisibleCount] = useState(5);
const [filters, setFilters] = useState({
  type: "all",       
  category: "all",
  sort: "none",      
  date: "all",        
});


useEffect(()=>{
    getTransactions()
   
},[getTransactions])

let filtered = [...transactions];

if (filters.type !== "all") {
  filtered = filtered.filter((t) => t.type === filters.type);
}

if (filters.category !== "all") {
  filtered = filtered.filter((t) => t.category === filters.category);
}

const now = new Date();

if (filters.date === "month") {
  filtered = filtered.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });
}

if (filters.date === "week") {
const firstDay = new Date();
const day = firstDay.getDay();
const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1);

firstDay.setDate(diff);
firstDay.setHours(0, 0, 0, 0);

  filtered = filtered.filter((t) => {
    const d = new Date(t.date);
    return d >= firstDay;
  });
}


if (filters.sort === "asc") {
 filtered = [...filtered].sort((a, b) => a.amount - b.amount);
}

if (filters.sort === "desc") {
  filtered = [...filtered].sort((a, b) => b.amount - a.amount);
}


const displayedTransactions =
  role === "viewer"
    ? filtered.slice(0, visibleCount)
    : filtered;

  return (
<div className="p-4 md:p-6">


  <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-xl shadow">
    <select
      value={filters.type}
      onChange={(e) =>
        setFilters({ ...filters, type: e.target.value })
      }
      className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
    >
      <option value="all">All Types</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <select
      value={filters.category}
      onChange={(e) =>
        setFilters({ ...filters, category: e.target.value })
      }
      className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
    >
      <option value="all">All Categories</option>
      <option value="Food">Food</option>
      <option value="Bills">Bills</option>
      <option value="Shopping">Shopping</option>
      <option value="Salary">Salary</option>
      <option value="Other">Other</option>
      <option value="Transport">Transport</option>
      <option value="Groceries">Groceries</option>
    </select>

    <select
      value={filters.sort}
      onChange={(e) =>
        setFilters({ ...filters, sort: e.target.value })
      }
      className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
    >
      <option value="none">Sort Amount</option>
      <option value="asc">Low → High</option>
      <option value="desc">High → Low</option>
    </select>

    <select
      value={filters.date}
      onChange={(e) =>
        setFilters({ ...filters, date: e.target.value })
      }
      className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
    >
      <option value="all">All Time</option>
      <option value="month">This Month</option>
      <option value="week">This Week</option>
    </select>
  </div>

  
  <div className="bg-white rounded-2xl shadow overflow-hidden">

    <div className="overflow-x-auto">

      <table className="w-full min-w-[700px] text-sm md:text-base">

        
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr className="text-gray-600 text-left">
            <th className="p-4 font-semibold">Date</th>
            <th className="p-4 font-semibold">Amount</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Type</th>
            {role === "admin" && (
              <th className="p-4 font-semibold">Actions</th>
            )}
          </tr>
        </thead>

       
        <tbody>
          {displayedTransactions.map((t) => (
            <tr
              key={t.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">{t.date}</td>

              <td
                className={`p-4 font-semibold ${
                  t.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ₹{t.amount}
              </td>

              <td className="p-4">{t.category}</td>

              <td className="p-4 capitalize">{t.type}</td>

              {role === "admin" && (
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setFormData(t);
                      setOpen(true);
                    }}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>

  {role === "viewer" && visibleCount < filtered.length && (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setVisibleCount((prev) => prev + 5)}
        className="px-6 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
      >
        Load More
      </button>
    </div>
  )}


  {open && (
    <Modal onClose={() => setOpen(false)}>
      <AddTransactionForm
        onClose={() => setOpen(false)}
        initialData={formdata}
      />
    </Modal>
  )}
</div>
    
  );

  
};

export default TransactionTable;