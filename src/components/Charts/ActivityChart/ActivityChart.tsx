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
import {getActiveActivity, getActivityChartData} from "../../../store/activeActivity/activitySelector";
import {Button} from "../../../basicComponents/Button/Button";
import {isTimeType, toTimeFormat} from "../../../utils/getStringifiedTime";
import {useAppSelector} from "../../../store/store";
import {FormControlLabel, Switch} from "@mui/material";
import {useMinMax} from "../hooks/useMinMax";
import {Stat, StatEnumType} from "../../../activitiesAssembly/stats";


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
      duration: 200,
      easing: "easeInOutSine"
   },
}

const stepCount = 6;

export const ActivityChart = () => {

   const [showAllMonths, setShowAllMonths] = useState(false);
   const activeActivity = useAppSelector(getActiveActivity).activity;
   const [stat, setStat] = useState(activeActivity.stats[0]);
   const chartData = useAppSelector(getActivityChartData(stat.name, showAllMonths));

   if (!chartData) {
      return <div>Not enough data.</div>
   }

   const {min, max} = useMinMax(chartData.datasets);
   const chartRef = useRef<Chart<"line", number[], string>>(null);
   const showChartSheet = useMemo(() => (chartData.labels.length ?? 0) > 1, [chartData.labels]);

   useEffect(() => {
      if (!showChartSheet && activeActivity.stats.length > 0) {
         setStat(activeActivity.stats[0]);
      }
   }, [showChartSheet])

   const getLabel = useCallback((tooltipItem: TooltipItem<"line">) => {
      const data = tooltipItem.dataset.data[tooltipItem.dataIndex]
      if (stat.type && isTimeType(stat.type.input) && typeof data === "number") {
         return `${toTimeFormat(data, stat.type.format)} ${stat?.preferedUnit ?? ""}`
      }
      return `${data} ${stat?.preferedUnit ?? ""}`
   }, [stat])

   const getValue = useCallback((value: number | string) => {
      if (typeof value === "number") {
         if (stat.type && isTimeType(stat.type.input)) {
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

   const handleSetFilter = useCallback((label: StatEnumType) => {
      let foundStat: Stat | undefined;
      Object.values(activeActivity.calendarEntries).forEach(({stats}) => stats?.forEach((stat) => {
         if (stat.name === label) {
            foundStat = stat;
         }
      }));
      if (foundStat) {
         setStat(foundStat);
      }
   }, [activeActivity])

   return <>{chartData && <div style={{width: "50%", margin: "auto", position: "relative"}}>
       <FormControlLabel control={<Switch onClick={() => setShowAllMonths((current) => !current)}/>}
                         label={"Show all data"}/>
       <div>Show Stat:
           <div style={{display: "flex", gap: 10,}}>{chartData.datasets.map((data) => <Button key={data.label}
                                                                                              theme={stat.name === data.label ? "contained" : "outlined"}
                                                                                              onClick={() => handleSetFilter(data.label)}>{data.label}</Button>)}</div>
       </div>
      {stat ? showChartSheet ? <Line ref={chartRef} options={options} data={chartData}/> :
         <div>Please add more data.</div> : <div>Please select data to show</div>}
   </div>}</>

}