/** @format */
import {
  ChartOptions,
  ChartTypeRegistry,
  ScriptableTooltipContext,
} from "chart.js";
import COLORS from "../enums/colors";

const { WHITE, BLACK, TEXT_PRIMARY } = COLORS;

const defaultLineGraphOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: (
        tooltipItem: ScriptableTooltipContext<keyof ChartTypeRegistry>
      ) => {
        if (
          !tooltipItem ||
          !tooltipItem.tooltipItems ||
          tooltipItem.tooltipItems.length === 0
        ) {
          return BLACK as string; // Return a default color (e.g., black) when no tooltip item exists
        }
        // Get the dataset's borderColor or line color
        const datasetIndex = tooltipItem.tooltipItems[0].datasetIndex; // Access the dataset index
        const lineColor =
          tooltipItem.chart.data.datasets[datasetIndex].borderColor;

        // Ensure the return type matches the expected Color type
        return lineColor as string; // Return the line color as a string
      },
    },
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hoverRadius: 6,
      hoverBorderColor: WHITE, // Keep the white border when hovered
      hoverBackgroundColor: (ctx) => {
        const datasetIndex = ctx.datasetIndex;
        const lineColor = ctx.chart.data.datasets[datasetIndex].borderColor;
        return lineColor as string; // Use line color as fill for the point
      },
      hoverBorderWidth: 2, // Thickness of the border when hovered
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
        color: TEXT_PRIMARY,
      },
      ticks: {
        color: TEXT_PRIMARY,
      },
    },
    y: {
      title: {
        display: true,
        text: "Amount ($)",
        color: TEXT_PRIMARY,
      },
      ticks: {
        color: TEXT_PRIMARY,
      },
    },

  },
  interaction: {
    mode: "nearest",
    intersect: false,
  },
};

export default defaultLineGraphOptions;
