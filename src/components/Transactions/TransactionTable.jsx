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
  type: "all",        // income | expense | all
  category: "all",
  sort: "none",       // asc | desc
  date: "all",        // all | month | week
});


useEffect(()=>{
    getTransactions()
   
},[getTransactions])

let filtered = [...transactions];

// 🔥 Type filter
if (filters.type !== "all") {
  filtered = filtered.filter((t) => t.type === filters.type);
}

// 🔥 Category filter
if (filters.category !== "all") {
  filtered = filtered.filter((t) => t.category === filters.category);
}

// 🔥 Date filter
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

// 🔥 Sort
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
    <div>
      <div className="flex flex-wrap gap-3 mb-4">

  {/* Type */}
  <select
    value={filters.type}
    onChange={(e) =>
      setFilters({ ...filters, type: e.target.value })
    }
    className="border p-2 rounded"
  >
    <option value="all">All Types</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

  {/* Category */}
  <select
    value={filters.category}
    onChange={(e) =>
      setFilters({ ...filters, category: e.target.value })
    }
    className="border p-2 rounded"
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

  {/* Sort */}
  <select
    value={filters.sort}
    onChange={(e) =>
      setFilters({ ...filters, sort: e.target.value })
    }
    className="border p-2 rounded"
  >
    <option value="none">Sort Amount</option>
    <option value="asc">Low → High</option>
    <option value="desc">High → Low</option>
  </select>

  {/* Date */}
  <select
    value={filters.date}
    onChange={(e) =>
      setFilters({ ...filters, date: e.target.value })
    }
    className="border p-2 rounded"
  >
    <option value="all">All Time</option>
    <option value="month">This Month</option>
    <option value="week">This Week</option>
  </select>

</div>
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
          {role === "admin" && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {displayedTransactions.map((t) => (
          <tr key={t.id} className="text-center border-t">
            <td>{t.date}</td>
            <td className={t.type === "income" ? "text-green-500" : "text-red-500"}>
              ₹{t.amount}
            </td>
            <td>{t.category}</td>
            <td>{t.type}</td>

            {role === "admin" && (
              <td>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setFormData(t)
                 setOpen(true)
                  }
                  }
                  className="text-blue-500"
                >
                  Edit
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    {role === "viewer" && visibleCount < filtered.length && (
  <div className="flex justify-center mt-4">
    <button
      onClick={() => setVisibleCount((prev) => prev + 5)}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Load More
    </button>
  </div>
)}
  {open && (
        <Modal onClose={() => setOpen(false)}>
          <AddTransactionForm onClose={() => setOpen(false)} initialData={formdata}/>
        </Modal>
      )}
</div>
    
  );

  
};

export default TransactionTable;