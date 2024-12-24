import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(API_URLS.transactions);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Transaction Log</h2>
      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">User</th>
              <th className="p-2 border-b">Payment Method</th>
              <th className="p-2 border-b">Amount (₹)</th>
              <th className="p-2 border-b">Payment Time</th>
              <th className="p-2 border-b">Transaction Info</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border-b">{transaction.user}</td>
                <td className="p-2 border-b">{transaction.paymentMethod}</td>
                <td className="p-2 border-b">₹{transaction.amount}</td>
                <td className="p-2 border-b">{transaction.paymentTime}</td>
                <td className="p-2 border-b">{transaction.transactionInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLog;
