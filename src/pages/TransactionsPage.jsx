import TransactionTable from "../components/Transactions/TransactionTable";

const TransactionsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <TransactionTable />
    </div>
  );
};

export default TransactionsPage;