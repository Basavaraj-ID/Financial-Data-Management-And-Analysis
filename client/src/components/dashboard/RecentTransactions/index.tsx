import { memo } from "react";
import recentTransactions from "../../../utils/recentTransactions";
import { RECENT_TRANSACTIONS_TEXT, SEE_ALL_TEXT } from "../../../utils/constants";

const RecentTransactions = () => {
  return (
    <div className="bg-primary p-4 pb-8 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white">{RECENT_TRANSACTIONS_TEXT}</h1>
        <a className="text-xs text-green-100" href="/transactions">
          {SEE_ALL_TEXT}
        </a>
      </div>
      {recentTransactions.map((transaction, index) => (
        <div key={transaction.id}>
          <div className="flex justify-between py-1 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <img
                  src={transaction.image}
                  alt={transaction.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col h-full justify-between">
                <p className="text-[0.7rem]">
                  Transfers {transaction.type}
                </p>
                <h4 className="text-white text-xs">
                  {transaction.name}
                </h4>
              </div>
            </div>
            <div
              className={`text-sm ${transaction.amount > 0 ? "text-green-100" : "text-yellow-100"
                }`}
            >
              {transaction.amount > 0
                ? `+${transaction.amount.toFixed(2)}`
                : transaction.amount.toFixed(2)}
            </div>
          </div>
          {index !== recentTransactions.length - 1 && (
            <div className="border-b border-gray-800 mb-3"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(RecentTransactions);
