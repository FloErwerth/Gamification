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
import {ChartData, getActivityChartData} from "../../../store/activeActivity/activitySelector";
import {Button} from "../../../basicComponents/Button/Button";
import {StatMap} from "../../../activitiesAssembly/stats";
import {isTimeType, toTimeFormat} from "../../../utils/getStringifiedTime";
import {useAppSelector} from "../../../store/store";
import {FormControlLabel, Switch} from "@mui/material";
import {useMinMax} from "../hooks/useMinMax";

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
   const chartData = useAppSelector(getActivityChartData(showAllMonths));

   if (!chartData) {
      return <div>Not enough data.</div>
   }

   const [showChart, setShowChart] = useState(true);
   const [filter, setFilter] = useState(chartData?.datasets?.[0]?.label ?? undefined);
   const [datasets, setDatasets] = useState(chartData.datasets.filter((data) => data.label === filter));
   const {min, max} = useMinMax(datasets);
   const chartRef = useRef<Chart<"line", number[], string>>(null);
   const stat = useMemo(() => filter && StatMap(filter), [filter]);
   const showChartSheet = useMemo(() => (chartData.labels.length ?? 0) > 1, [chartData.labels]);

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
                  callback: (tickValue, index) => chartData.labels[index]?.split("-").slice(0, 2).join(".") ?? tickValue
               }
            },
            y: {
               ticks: {
                  precision: 2,
                  callback: (tickValue) => getValue(tickValue),
                  count: stepCount,
               },
               suggestedMin: min,
               suggestedMax: max,
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
   }, [min, max, stat, chartData]);

   const formatedData = useMemo(() => {
      return {
         labels: chartData.labels,
         datasets,
      }
   }, [filter, chartData, datasets]);


   return <>{chartData && <div style={{width: "50%", margin: "auto", position: "relative"}}>
       <FormControlLabel control={<Switch onClick={() => setShowAllMonths((current) => !current)}/>}
                         label={"Show all data"}/>
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