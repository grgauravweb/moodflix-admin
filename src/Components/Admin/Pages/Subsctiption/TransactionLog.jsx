import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";
import axios from "axios";

const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.transactions);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      console.log("data", data);
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const sendData = {
        status: status,
      };
      const { data } = await axios.put(
        `${API_URLS.subscription}/${id}`,
        sendData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("data", data);
      alert(data.message);
      fetchTransactions();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Transaction Log</h2>
      <div className="bg-white p-4 shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">User</th>
              <th className="p-2 border-b">Payment Method</th>
              <th className="p-2 border-b">Package Name</th>
              <th className="p-2 border-b">Amount (₹)</th>
              <th className="p-2 border-b">Payment Time</th>
              <th className="p-2 border-b">Transaction Id</th>
              <th className="p-2 border-b">Payment Screen Shot</th>
              <th className="p-2 border-b">Subscription Status</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border-b">{transaction.user.fullName}</td>
                <td className="p-2 border-b">{transaction.paymentMethod}</td>
                <td className="p-2 border-b">
                  {transaction.package.packageName}
                </td>
                <td className="p-2 border-b">₹{transaction.amount}</td>
                <td className="p-2 border-b">
                  {" "}
                  {new Date(transaction.paymentTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="p-2 border-b">{transaction.transactionId}</td>
                <td className="p-2 border-b">
                  {transaction.screenshotUrl ? (
                    <img
                      src={transaction.screenshotUrl}
                      alt="Payment Screenshot"
                      className="w-20 h-20 object-cover rounded-md cursor-pointer"
                      onClick={() =>
                        window.open(transaction.screenshotUrl, "_blank")
                      }
                    />
                  ) : (
                    "No Screenshot"
                  )}
                </td>
                <td className="p-2 border-b">
                  <span
                    className={`px-4 py-1 text-sm font-semibold rounded-full shadow-md transition-all
      ${
        transaction.status === "Approved"
          ? "bg-green-100 text-green-700 border border-green-500"
          : transaction.status === "Pending"
          ? "bg-yellow-100 text-yellow-700 border border-yellow-500"
          : "bg-red-100 text-red-700 border border-red-500"
      }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleStatusChange(transaction._id, "Approved")
                      }
                      className={`${transaction.status === "Approved" || transaction.status === "Rejected" ? "bg-green-300 cursor-not-allowed" : "bg-green-500  hover:bg-green-600" } px-4 py-2 text-white rounded-md transition`}
                      disabled={transaction.status === "Approved" || transaction.status === "Rejected"  }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(transaction._id, "Rejected")
                      }
                      className={`${transaction.status === "Approved" || transaction.status === "Rejected" ? "bg-red-300 cursor-not-allowed" : "bg-red-500  hover:bg-red-600" } px-4 py-2 text-white rounded-md transition`}
                      disabled={transaction.status === "Approved" || transaction.status === "Rejected"  }
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLog;
