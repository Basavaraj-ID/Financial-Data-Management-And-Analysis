import { FC, memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import Dropdown from "../../shared/Dropdown";
import Loader from "../../shared/Loader";
import { OVERVIEW_TEXT } from "../../../utils/constants";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineGraphProps {
  title?: string;
  data: ChartData<"line"> | any;
  options?: ChartOptions<"line">;
  legends: LegendItem[];
  dropdownOptions: DropdownOption[];
  dropdownValue: string;
  onDropdownChange: (value: string) => void;
  isLoading?: boolean;
  error?: string;
}

const LineGraph: FC<LineGraphProps> = ({
  title = OVERVIEW_TEXT,
  data,
  options,
  legends,
  dropdownOptions,
  dropdownValue,
  onDropdownChange,
  isLoading,
  error,
}) => {
  return (
    <div className="bg-primary rounded-lg p-4 w-full h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap mb-4 px-2">
        <h2 className="text-textTertiary">{title}</h2>

        {/* Legends and Dropdown */}
        <div className="flex gap-5 items-center">
          {/* Legends */}
          {legends.map((legend, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: legend.color }}></div>
              <span className="text-xs">{legend.title}</span>
            </div>
          ))}

          {/* Dropdown */}
          <div className="ml-4">
            <Dropdown
              options={dropdownOptions}
              value={dropdownValue}
              onChange={(e) => onDropdownChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full min-h-60 flex justify-center items-center">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-500 font-semibold text-center">
            {error}
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default memo(LineGraph);
