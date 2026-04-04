import { create } from "zustand";

export const useFinanceStore = create((set) => ({
  role: "",

  transactions: [
    {
      id: 1,
      date: "2026-04-01",
      amount: 500,
      category: "Food",
      type: "expense",
    },
    {
      id: 2,
      date: "2026-04-02",
      amount: 2000,
      category: "Salary",
      type: "income",
    },
  ],

  setRole: (role) => {
    
    localStorage.setItem("role",role)
    set({ role })},

    getRole:()=>{
        try {
            let role=localStorage.getItem("role")
                set({role})
        } catch (error) {
            alert("Error fetching role "+ error)
        }
    },
removeRole:()=>{
    localStorage.setItem("role","")
    set({role:""})
},
  addTransaction: (tx) =>
    set((state) => {
        const updated=[...state.transactions, tx]
        localStorage.setItem("transactions",JSON.stringify(updated))
        return {transactions:updated}
}),

getTransactions: () => {
  set((state)=>{
          const tx = JSON.parse(localStorage.getItem("transactions")) || [];
  const merged=[...state.transactions,...tx]
    const unique = merged.filter(
      (t, index, self) =>
        index === self.findIndex((x) => x.id === t.id)
    );

    // Save back to localStorage
    localStorage.setItem("transactions", JSON.stringify(unique));
  return {transactions:unique}
  })
   

},

  deleteTransaction: (id) =>
    set((state) => {
  const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
}),

updateTransaction: (updatedTx) =>
  set((state) => {
    const updated = state.transactions.map((t) =>
      t.id === updatedTx.id ? updatedTx : t
    );

    localStorage.setItem("transactions", JSON.stringify(updated));

    return { transactions: updated }; // ✅ VERY IMPORTANT
  }),
}))