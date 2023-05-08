import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Line} from "react-chartjs-2";
import {
   CategoryScale,
   Chart,
   ChartOptions,
   LinearScale,
   LineElement,
   PointElement,
   Title,
   Tooltip,
   TooltipItem
} from "chart.js";
import {ChartData, getActiveActivity, getChartData} from "../../../store/activeActivity/activitySelector";
import {Button} from "../../../basicComponents/Button/Button";
import {StatMap} from "../../../activitiesAssembly/stats";
import {isTimeType, toTimeFormat} from "../../../utils/getStringifiedTime";
import {useAppSelector} from "../../../store/store";
import {Switch} from "@mui/material";

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

export const ActivityChart = () => {

   const [showAllMonths, setShowAllMonths] = useState(false);
   const activeActivity = useAppSelector(getActiveActivity);
   const chartData = useAppSelector(getChartData(activeActivity.activity, showAllMonths));

   if (!chartData) {
      return <div>Not enough data.</div>
   }

   const [showChart, setShowChart] = useState(true);
   const [filter, setFilter] = useState(chartData?.datasets?.[0]?.label ?? undefined);
   const [datasets, setDatasets] = useState(chartData.datasets.filter((data) => data.label === filter));
   const [minMax, setMinMax] = useState<{ min: number, max: number }>();
   const chartRef = useRef<Chart<"line", number[], string>>(null);
   const stat = useMemo(() => filter && StatMap(filter), [filter]);
   const showChartSheet = useMemo(() => (chartData.dateLabels.length ?? 0) > 1, [chartData.dateLabels]);

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
   }, [filter, showAllMonths]);

   const getLabel = useCallback((tooltipItem: TooltipItem<"line">) => {
      const data = tooltipItem.dataset.data[tooltipItem.dataIndex]
      if (stat.type && isTimeType(stat.type) && typeof data === "number") {
         return `${toTimeFormat(data)} ${stat?.preferedUnit ?? ""}`
      }
      return `${data} ${stat?.preferedUnit ?? ""}`
   }, [stat])

   const getValue = useCallback((value: number | string) => {
      if (typeof value === "number") {
         if (stat.type && isTimeType(stat.type)) {
            return `${toTimeFormat(value)} ${stat.preferedUnit}`
         } else {
            return `${value} ${stat.preferedUnit}`;

         }
      }
      return value;
   }, [stat])

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
                  precision: 2,
                  callback: (tickValue) => getValue(tickValue),
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
                  label: (tooltipItem) => getLabel(tooltipItem),
               }
            }
         },
         ...commonOptions,
      }
   }, [minMax, stat, chartData]);

   const formatedData = useMemo(() => {
      return {
         labels: chartData.dateLabels,
         datasets,
      }
   }, [filter, chartData, datasets]);


   return <>{chartData && <div style={{width: "50%", margin: "auto", position: "relative"}}>
       <Switch onClick={() => setShowAllMonths((current) => !current)}/>
       <div>Show Stat:
           <div style={{display: "flex", gap: 10,}}>{chartData.datasets.map((data) => <Button key={data.label}
                                                                                              theme={filter === data.label ? "contained" : "outlined"}
                                                                                              onClick={() => setFilter(data.label)}>{data.label}</Button>)}</div>
       </div>
      {filter ? showChartSheet && showChart ? <Line ref={chartRef} options={options} data={formatedData}/> :
         <div>Please add more data.</div> : <div>Please select data to show</div>}
      {showChartSheet &&
          <Button onClick={() => setShowChart(!showChart)}>{!showChart ? "Show Chart" : "Hide Chart"}</Button>}
   </div>}</>

}