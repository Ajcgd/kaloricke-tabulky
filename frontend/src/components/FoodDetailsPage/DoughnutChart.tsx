import { FC } from "react";
import Chart from "react-apexcharts";
import IFoodRecord from "../../interfaces/IFoodRecord";

interface IDoughnutChartProps {
  food: IFoodRecord;
}

const DoughnutChart: FC<IDoughnutChartProps> = ({ food }) => {
  const options = {
    series: [food.proteins, food.fats, food.carbs, food.fiber, food.salt],
    labels: ["Bílkoviny", "Tuky", "Sacharidy", "Vláknina", "Sůl"],
    colors: ["#b67b2d", "#b3d593", "#edc48c", "#eb9b34", "#555731"],
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    // @ts-ignore
    <Chart
      height="100%"
      width="100%"
      options={options}
      series={options.series}
      type="donut"
    ></Chart>
  );
};

export default DoughnutChart;
