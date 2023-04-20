import {useEffect, useMemo, useRef, useState} from "react";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, ChartOptions, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {ChartData, getChartData} from "../../../store/activity/activitySelector";
import {StatEnum, StatMap} from "../../../store/activities/predefinedActivities";
import {useAppSelector} from "../../../store/store";
import {Button} from "../../Button/Button";

Chart.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
);

const commonOptions: ChartOptions<"line"> = {
   responsive: true,
   animation: {
      duration: 300,
      easing: "easeInOutSine"
   }
}

const stepCount = 7;

export const ActivityChart = () => {
   const chartData = useAppSelector(getChartData);
   const [showChart, setShowChart] = useState(false);
   const [filter, setFilter] = useState<StatEnum>(chartData.datasets[0].label);
   const [datasets, setDatasets] = useState<ChartData["datasets"]>(chartData.datasets.filter((data) => data.label === filter));
   const [minMax, setMinMax] = useState<{ min: number, max: number }>();
   const chartRef = useRef<Chart<"line">>(null);
   const unit = useMemo(() => StatMap(filter).preferedUnit, [filter]);

   useEffect(() => {
      let min = Infinity;
      let max = 0;
      datasets.forEach((dataset) => dataset.data.forEach((value) => {
         min = value < min ? value : min;
         max = value > max ? value : max;
      }));
      const step = (max - min) / stepCount;
      const maybeMin = Math.ceil(min - step);
      min = maybeMin < 0 ? 0 : maybeMin;
      setMinMax({min, max: Math.floor(max + step)});
   }, [datasets]);

   useEffect(() => {
      const filteredDataset = chartData.datasets.filter((data) => data.label === filter);
      setDatasets(filteredDataset);
   }, [filter, chartData])

   const options: ChartOptions<"line"> = useMemo(() => {
      return {
         scales: {
            x: {
               ticks: {
                  callback: (tickValue, index) => chartData.dateLabels[index]?.split("-").slice(0, 2).join(".") ?? tickValue
               }
            },
            y: {
               suggestedMin: minMax?.min,
               suggestedMax: minMax?.max,
            }
         },
         plugins: {
            legend: {
               display: false,
            },
            title: {
               display: false,
            },
            tooltip: {
               displayColors: false,
               callbacks: {
                  label: (tooltipItem) => `${tooltipItem.dataset.data[tooltipItem.dataIndex]} ${unit}`,
               }
            }
         },
         ...commonOptions,
      }
   }, [minMax]);

   console.log(options);

   const formatedData = useMemo(() => {
      return {
         labels: chartData.dateLabels,
         datasets,
      }
   }, [filter, chartData, datasets]);

   if (!showChart) {
      return <Button onClick={() => setShowChart(true)}>Show Chart</Button>
   }

   if (chartData.dateLabels.length === 1) {
      return <div>Please add another progress step to display the chart.</div>
   }

   if (!chartData) return null;
   return <div style={{width: "50%", margin: "auto", position: "relative"}}>
      <div>Show Stat:
         <div style={{display: "flex", gap: 10,}}>{chartData.datasets.map((data) => <Button
            theme={filter === data.label ? "SELECTED" : "DEFAULT"}
            onClick={() => setFilter(data.label)}>{data.label}</Button>)}</div>
      </div>
      <Line ref={chartRef} options={options} data={formatedData}/>
      <Button onClick={() => setShowChart(false)}>Hide Chart</Button></div>
}