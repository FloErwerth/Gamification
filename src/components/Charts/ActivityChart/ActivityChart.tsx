import {useCallback, useEffect, useMemo, useState} from "react";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {ChartData, getChartData} from "../../../store/activity/activitySelector";
import {Dropdown} from "../../Dropdown/Dropdown";
import {StatEnum} from "../../../store/activities/predefinedActivities";
import {useAppSelector} from "../../../store/store";

Chart.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
);

const commonOptions = {
   responsive: true,
   plugins: {
      legend: {
         display: false,
      },
      title: {
         display: false,
      },
   },
}


export const ActivityChart = () => {
   const chartData = useAppSelector(getChartData);


   const [filter, setFilter] = useState<StatEnum>(chartData.datasets[0].label);
   const [datasets, setDatasets] = useState<ChartData["datasets"]>(chartData.datasets.filter((data) => data.label === filter));
   const [minMax, setMinMax] = useState<{ min: number, max: number }>()

   const handleFilter = useCallback((value: string) => {
      setFilter(value as StatEnum)
   }, []);

   useEffect(() => {
      let min = Infinity;
      let max = 0;
      datasets.forEach((dataset) => dataset.data.forEach((value) => {
         min = value < min ? value : min;
         max = value > max ? value : max;
      }));
      setMinMax({min: Math.floor(min * 0.95), max: Math.ceil(max * 1.05)});
   }, [datasets]);

   useEffect(() => {
      const filteredDataset = chartData.datasets.filter((data) => data.label === filter);
      setDatasets(filteredDataset);
   }, [filter, chartData])

   const options = useMemo(() => {
      return {
         scales: {
            y: {
               ...minMax,
               ticks: {
                  stepSize: 0
               }
            }
         }, ...commonOptions,
      }
   }, [minMax]);

   const formatedData = useMemo(() => {
      return {
         labels: chartData.dateLabels,
         datasets,
      }
   }, [filter, chartData, datasets]);

   if (chartData.dateLabels.length === 1) {
      return <div>Please add another progress step to display the chart.</div>
   }

   if (!chartData) return null;
   return <div style={{width: "50%", margin: "auto"}}>
      <Dropdown options={chartData.datasets.map((data) => data.label)} value={filter} label={"Filter"}
                setValue={handleFilter}/>
      <Line options={options} data={formatedData}/></div>
}