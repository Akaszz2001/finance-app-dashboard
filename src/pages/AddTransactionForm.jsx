import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";

const AddTransactionForm = ({ onClose, initialData }) => {
  const { addTransaction, updateTransaction, balance } = useFinanceStore();
  console.log();
  const iD = initialData;
  const [form, setForm] = useState(
    initialData || {
      date: "",
      amount: "",
      category: "",
      type: "",
    },
  );

  // 📅 Get today's date (to restrict future)
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.amount == 0) {
      alert("Amount can't be zero");
      return;
    }

    if (initialData) {
      console.log(iD.amount);
      console.log(form.amount);

      if (
        iD.amount < form.amount &&
        balance == 0 &&
        form.category != "Salary"
      ) {
        alert(
          "Amount of this expense can't be" +
            form.amount +
            ", wallet is already zero!!",
        );
        return;
      }
      if (balance != 0 && form.amount > balance + iD.amount) {
        alert("Amount can't be exceed more than your balance");
        return;
      }
      const res = await updateTransaction({
        ...form,
        id: initialData.id, // ✅ KEEP ORIGINAL ID
        amount: Number(form.amount),
      });
      if (res) {
        alert("Successfully updated transaction");
        setForm({
          date: "",
          amount: "",
          category: "",
          type: "",
        });
      }
    } else {
      if (form.amount > balance && form.category != "Salary") {
        alert("You have only" + balance + "left in your wallet");

        return;
      }

      // ➕ ADD
      const res = await addTransaction({
        ...form,
        id: Date.now(),
        amount: Number(form.amount),
      });

      if (res) {
        alert("Successfully added transaction");
        setForm({
          date: "",
          amount: "",
          category: "",
          type: "",
        });
      }
    }

    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Update Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date */}
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            max={today} // 🚫 future dates blocked
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Groceries">Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
