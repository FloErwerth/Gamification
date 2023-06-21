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
import {StatEnumType} from "../../../activitiesAssembly/stats";
import {Temporal} from "@js-temporal/polyfill";
import {ActivityInputTypes} from "../../ActivityInput/ActivityInput";

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

const getXAxisLabel = (date?: string) => {
   if (date) {
      return Temporal.PlainDate.from(date).toLocaleString("en-US", {day: "2-digit", month: "2-digit"})
   }
   return undefined;
}

const stepCount = 6;

export const ActivityChart = () => {
   const chartRef = useRef<Chart<"line", number[], string>>(null);
   const activeActivity = useAppSelector(getActiveActivity).activity;
   const [selectedStat, setSelectedStat] = useState(activeActivity?.stats[0]);

   const [showAllMonths, setShowAllMonths] = useState(false);
   const chartData = useAppSelector(getActivityChartData(selectedStat?.statName, showAllMonths));
   const {min, max} = useMinMax(chartData?.datasets);

   const showChartSheet = useMemo(() => (chartData?.labels.length ?? 0) > 1, [chartData]);

   useEffect(() => {
      if (!showChartSheet && activeActivity.stats.length > 0) {
         setSelectedStat(activeActivity?.stats[0]);
      }
   }, [showChartSheet])

   const getLabel = useCallback((tooltipItem: TooltipItem<"line">) => {
      const data = tooltipItem.dataset.data[tooltipItem.dataIndex];
      if (selectedStat.type && isTimeType(selectedStat?.type) && typeof data === "number") {
         return `${toTimeFormat(data, selectedStat?.type)} ${selectedStat?.unit ?? ""}`
      }
      return `${data} ${selectedStat?.unit ?? ""}`
   }, [selectedStat])

   const getValue = useCallback((value: number | string) => {
      if (selectedStat?.type && isTimeType(selectedStat.type)) {
         let val = typeof value === "string" ? parseFloat(value) : value;
         return `${toTimeFormat(val, ActivityInputTypes.HOURS, {
            show: {
               minutes: false,
               seconds: false,
               hours: true,
            },
         })} ${selectedStat?.unit}`
      } else {
         return `${value} ${selectedStat?.unit}`;
      }
   }, [selectedStat])

   const options: ChartOptions<"line"> = useMemo(() => {
      return {
         scales: {
            x: {
               ticks: {
                  callback: (tickValue, index) => getXAxisLabel(chartData?.labels[index]) ?? tickValue
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
   }, [min, max, selectedStat, chartData]);

   //if user removes selectedStat, remove the current entries for the selectedStat

   const handleSetFilter = useCallback((label: StatEnumType) => {
      let foundStat = Object.values(activeActivity?.stats).find((stat) => stat.statName === label);
      if (foundStat) {
         setSelectedStat(foundStat);
      }
   }, [activeActivity])

   return <>{chartData && <div style={{width: "50%", margin: "auto", position: "relative"}}>
       <FormControlLabel control={<Switch onClick={() => setShowAllMonths((current) => !current)}/>}
                         label={"Show all data"}/>
       <div>Show Stat:
           <div style={{display: "flex", gap: 10,}}>{activeActivity?.stats.map((stat) => <Button key={stat.statName}
                                                                                                 theme={stat?.statName === selectedStat?.statName ? "contained" : "outlined"}
                                                                                                 onClick={() => handleSetFilter(stat.statName)}>{stat.statName}</Button>)}</div>
       </div>
      {selectedStat ? showChartSheet ? <Line ref={chartRef} options={options} data={chartData}/> :
         <div>Please add more data.</div> : <div>Please select data to show</div>}
   </div>}</>

}