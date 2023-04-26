import {useEffect, useMemo, useRef, useState} from "react";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, ChartOptions, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {ChartData} from "../../../store/activeActivity/activitySelector";
import {Button} from "../../Button/Button";
import {StatEnumType, StatMap} from "../../../activitiesAssembly/stats";

interface IActivityChart {
   chartData: ChartData,
}

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

const stepCount = 6;

export const ActivityChart = ({chartData}: IActivityChart) => {

   const [showChart, setShowChart] = useState(true);
   const [filter, setFilter] = useState<StatEnumType | undefined>(chartData?.datasets?.[0]?.label ?? undefined);
   const [datasets, setDatasets] = useState<ChartData["datasets"]>(chartData.datasets.filter((data) => data.label === filter));
   const [minMax, setMinMax] = useState<{ min: number, max: number }>();
   const chartRef = useRef<Chart<"line">>(null);
   const unit = useMemo(() => filter ? StatMap(filter).preferedUnit : "", [filter]);
   const showChartSheet = useMemo(() => chartData.dateLabels.length > 1, [chartData.dateLabels]);

   useEffect(() => {
      let min = Infinity;
      let max = 0;
      datasets.forEach((dataset) => dataset.data.forEach((value) => {
         min = value < min ? value : min;
         max = value > max ? value : max;
      }));
      const step = (max - min) / stepCount;
      const maybeMin = min - step;
      min = maybeMin < 0 ? 0 : maybeMin;
      setMinMax({min, max: max + step});
   }, [datasets]);

   useEffect(() => {
      const filteredDataset = chartData.datasets.filter((data) => data.label === filter);
      setDatasets(filteredDataset);
   }, [filter, chartData]);

   const options: ChartOptions<"line"> = useMemo(() => {
      return {
         scales: {
            x: {
               ticks: {
                  callback: (tickValue, index) => chartData.dateLabels[index]?.split("-").slice(0, 2).join(".") ?? tickValue
               }
            },
            y: {
               ticks: {
                  count: stepCount,
               },
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

   const formatedData = useMemo(() => {
      return {
         labels: chartData.dateLabels,
         datasets,
      }
   }, [filter, chartData, datasets]);


   return <>{chartData && <div style={{width: "50%", margin: "auto", position: "relative"}}>
       <div>Show Stat:
           <div style={{display: "flex", gap: 10,}}>{chartData.datasets.map((data) => <Button key={data.label}
                                                                                              theme={filter === data.label ? "SELECTED" : "DEFAULT"}
                                                                                              onClick={() => setFilter(data.label)}>{data.label}</Button>)}</div>
       </div>
      {filter ? showChartSheet && showChart ? <Line ref={chartRef} options={options} data={formatedData}/> :
         <div>Please add more data.</div> : <div>Please select data to show</div>}
      {showChartSheet &&
          <Button onClick={() => setShowChart(!showChart)}>{!showChart ? "Show Chart" : "Hide Chart"}</Button>}
   </div>}</>

}