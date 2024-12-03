import SummaryCard from "../../components/dashboard/SummaryCard";
import FinancialInsightsLineGraph from "../../components/analytics/FinancialInsightsLineGraph";
import summaryCards from "../../utils/summaryCards";
import TransactionsWithFilters from "../../components/transactions/TransactionsWithFilters";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <SummaryCard
            key={index}
            icon={<card.icon />}
            title={card.title}
            amount={card.amount}
          />
        ))}
      </div>
      <div className="w-full h-auto flex gap-6 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-[60%]">

        <FinancialInsightsLineGraph />
        </div>
        <div className="w-full lg:w-[40%]">
          <RecentTransactions />
        </div>
      </div>
      <div className="p-4 bg-primary rounded-lg">
        <TransactionsWithFilters />
      </div>

    </div>
  );
};

export default Dashboard;
