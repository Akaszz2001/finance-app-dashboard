import { useEffect, useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import Modal from "../Common/Modal";
import AddTransactionForm from "../../pages/AddTransactionForm";

const TransactionTable = () => {
  const { transactions, role, deleteTransaction,getTransactions } = useFinanceStore();
    const [open, setOpen] = useState(false);
const [formdata,setFormData]=useState(null)



useEffect(()=>{
    getTransactions()
   
},[getTransactions])
  return (
    <div>
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
        {transactions.map((t) => (
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
  {open && (
        <Modal onClose={() => setOpen(false)}>
          <AddTransactionForm onClose={() => setOpen(false)} initialData={formdata}/>
        </Modal>
      )}
</div>
    
  );

  
};

export default TransactionTable;