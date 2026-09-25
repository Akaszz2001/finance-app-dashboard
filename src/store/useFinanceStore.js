

import { create } from "zustand";

const calculateSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
};

export const useFinanceStore = create((set) => ({
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],

  income: 0,
  expense: 0,
  balance: 0,

  role: "",



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

  addTransaction: (tx) =>{
    try {
       set((state) => {
      const updated = [...state.transactions, tx];
      localStorage.setItem("transactions", JSON.stringify(updated));

      return {
        transactions: updated,
        ...calculateSummary(updated), 
      };
    })
    return true
    } catch (error) {
      alert("Adding transaction failed "+error)
      return false
    }
  }
   ,


  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(updated));

      return {
        transactions: updated,
        ...calculateSummary(updated),
      };
    }),

 
  updateTransaction: (updatedTx) =>{
try {
   set((state) => {
      const updated = state.transactions.map((t) =>
        t.id === updatedTx.id ? updatedTx : t
      );

      localStorage.setItem("transactions", JSON.stringify(updated));

      return {
        transactions: updated,
        ...calculateSummary(updated),
      };
    })

    return true
} catch (error) {
  alert("Updating transaction failed " +error)
  return false
}

  }
   ,
    

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
  return {transactions:unique,...calculateSummary(unique)}
  })
   

},

addBulkTransactions: (txs) =>
  set((state) => {
    const updated = [...state.transactions, ...txs];

    localStorage.setItem("transactions", JSON.stringify(updated));

    return {
      transactions: updated,
      ...calculateSummary(updated),
    };
  }),
}));