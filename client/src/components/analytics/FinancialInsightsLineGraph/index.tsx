import { memo, useState } from "react";
import LineGraph from "../../graphs/LineGraph";
import defaultLineGraphOptions from "../../../utils/graphs/defaultLineGraphOptions";
import { useQuery } from "@tanstack/react-query";
import { legends, timePeriodOptions } from "../../../utils/constants";
import { fetchLineGraphFinancialData } from "../../../utils/api/helpers";
import COLORS from "../../../utils/enums/colors";

const FinancialInsightsLineGraph = () => {
    const [timePeriod, setTimePeriod] = useState<string>("month");

    const { YELLOW, GREEN } = COLORS;

    const { data, isLoading, error } = useQuery({
        queryKey: ["financialData", timePeriod],
        queryFn: () => fetchLineGraphFinancialData(timePeriod),
        retry: 3,
    });

    const handleDropdownChange = (value: string) => {
        setTimePeriod(value);
    };

    const selectedData = data && data[timePeriod]; // Dynamically select data based on granularity

    // Transform the API response into chartData
    const chartData = {
        labels: selectedData?.map((item: any) => {
            if (timePeriod === "year") {
                return item._id; // _id is expected to be the year (e.g., "2024")
            } else if (timePeriod === "month") {
                const [month] = item._id.split(" "); // Extract month abbreviation (e.g., "Jan", "Feb")
                return month;
            } else if (timePeriod === "week") {
                return `${item._id}`; // _id should contain week number
            } else if (timePeriod === "day") {
                return new Date(item._id).toLocaleDateString("default", {
                    day: "numeric",
                    month: "short",
                }); // Convert to day/month format (e.g., "5 Jan")
            } else if (timePeriod === "hour") {
                return `${item._id}`; // Format hour data (e.g., "14:00")
            }
            return item._id; // Fallback if none of the above match
        }),
        datasets: [
            {
                label: "Income",
                data: selectedData?.map((item: any) => item.totalIncome),
                borderColor: YELLOW,
            },
            {
                label: "Expenses",
                data: selectedData?.map((item: any) => item.totalExpenses),
                borderColor: GREEN,
            },
        ],
    };
    return (
        <div className="w-full">
            <LineGraph
                data={chartData}
                options={defaultLineGraphOptions}
                legends={legends}
                dropdownOptions={timePeriodOptions}
                dropdownValue={timePeriod}
                onDropdownChange={handleDropdownChange}
                isLoading={isLoading}
                error={error?.message}
            />
        </div>
    );
};

export default memo(FinancialInsightsLineGraph);
