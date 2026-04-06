// Same form used for adding and updating single transaction


import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";

const AddTransactionForm = ({ onClose, initialData }) => {
  const { addTransaction, updateTransaction, addBulkTransactions, balance } =
    useFinanceStore();

  const [previewData, setPreviewData] = useState([]);
  const [fileError, setFileError] = useState("");

  const [mode, setMode] = useState("single");

  const iD = initialData;

  const [form, setForm] = useState(
    initialData || {
      date: "",
      amount: "",
      category: "",
      type: "",
    },
  );

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
    // Update transaction
    if (initialData) {
      if (
        iD.amount < form.amount &&
        balance == 0 &&
        form.category != "Salary"
      ) {
        alert("Wallet is empty");
        return;
      }

      if (balance != 0 && form.amount > balance + iD.amount && form.category !="Salary") {
        alert("Amount exceeds balance");
        return;
      }

      const res = await updateTransaction({
        ...form,
        id: initialData.id,
        amount: Number(form.amount),
      });

      if (res) {
        alert("Updated successfully");
      }
    } else {
      //This is for single upload of a transaction
      if (form.amount > balance && form.category != "Salary") {
        alert("Insufficient balance");
        return;
      }

      const res = await addTransaction({
        ...form,
        id: Date.now(),
        amount: Number(form.amount),
      });

      if (res) {
        alert("Added successfully");
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

  //Upload bulk amount transactions using json file 
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (!Array.isArray(data)) {
          setFileError("Invalid JSON format");
          return;
        }

        setPreviewData(data); 
        setFileError("");
      } catch {
        setFileError("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

const handleBulkSubmit = () => {
  if (!previewData.length) {
    alert("No data to upload");
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  let currentBalance = balance;
  const validTransactions = [];
  let skipped = 0;

  previewData.forEach((item) => {
    const amount = Number(item.amount);


    if (!item.date || item.date >=today) {
      skipped++;
      return;
    }

  
    if (item.type === "income" || item.category === "Salary") {
      currentBalance += amount;

      validTransactions.push({
        ...item,
        id: Date.now() + Math.random(),
        amount,
      });

      return;
    }


    if (amount <= currentBalance) {
      currentBalance -= amount;

      validTransactions.push({
        ...item,
        id: Date.now() + Math.random(),
        amount,
      });
    } else {
      skipped++;
    }
  });

  if (!validTransactions.length) {
    alert("No valid transactions to add");
    return;
  }

  addBulkTransactions(validTransactions);

  alert(
    `${validTransactions.length} added, ${skipped} skipped (invalid date or insufficient balance)`
  );

  setPreviewData([]);
  onClose();
};
  //download sample of dataset
  const downloadSample = () => {
    const sample = [
      {
        date: "2026-04-01",
        amount: 500,
        category: "Food",
        type: "expense",
      },
    ];

    const blob = new Blob([JSON.stringify(sample, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.json";
    a.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Update Transaction" : "Add Transaction"}
      </h2>

     
      {!initialData && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("single")}
            className={`px-3 py-1 rounded ${
              mode === "single" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Single
          </button>

          <button
            onClick={() => setMode("bulk")}
            className={`px-3 py-1 rounded ${
              mode === "bulk" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Bulk Upload
          </button>
        </div>
      )}

  
      {(mode === "single" || initialData) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <input
            type="date"
            name="date"
            max={today}
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Category</option>
            <option value="Food">Food</option>
            <option value="Groceries">Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>

          {/* Type */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

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
      )}

      
      {!initialData && mode === "bulk" && (
        <div className="space-y-4">
       
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="w-full border p-2 rounded"
          />

          {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

       
          {previewData.length > 0 && (
            <div className="max-h-40 overflow-auto border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Type</th>
                  </tr>
                </thead>

                <tbody>
                  {previewData.map((t, i) => (
                    <tr key={i} className="text-center border-t">
                      <td>{t.date}</td>
                      <td>₹{t.amount}</td>
                      <td>{t.category}</td>
                      <td>{t.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

  
          {previewData.length > 0 && (
            <button
              onClick={handleBulkSubmit}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Upload Transactions
            </button>
          )}

          {/* Sample */}
          <button onClick={downloadSample} className="text-blue-500 text-sm">
            Download Sample JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTransactionForm;
