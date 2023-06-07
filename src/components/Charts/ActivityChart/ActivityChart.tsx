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
import {Temporal} from "@js-temporal/polyfill";
import {ActivityInputTypes} from "../../ActivityInput/ActivityInput";
import {Unit} from "../../../activitiesAssembly/units";

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
   const [stat, setStat] = useState(activeActivity?.stats[0]);

   const [showAllMonths, setShowAllMonths] = useState(false);
   const chartData = useAppSelector(getActivityChartData(stat?.name, showAllMonths));
   const {min, max} = useMinMax(chartData?.datasets);

   const showChartSheet = useMemo(() => (chartData?.labels.length ?? 0) > 1, [chartData]);

   const getHasMultipleUnits = useMemo(() => {
      let lastUnit: Unit | undefined;
      Object.values(activeActivity?.calendarEntries).forEach((cell) => cell.stats?.forEach((stat) => {
         if (!lastUnit) {
            lastUnit = stat.preferedUnit;
         } else {
            if (stat.preferedUnit !== lastUnit) {
               return true;
            }
         }
      }))
      return false;
   }, [activeActivity?.calendarEntries]);

   useEffect(() => {
      if (!showChartSheet && activeActivity.stats.length > 0) {
         setStat(activeActivity?.stats[0]);
      }
   }, [showChartSheet])

   const getLabel = useCallback((tooltipItem: TooltipItem<"line">) => {
      const data = tooltipItem.dataset.data[tooltipItem.dataIndex]
      if (stat.type && isTimeType(stat.type.input) && typeof data === "number") {
         return `${toTimeFormat(data, stat?.type.input)} ${stat?.preferedUnit ?? ""}`
      }
      return `${data} ${stat?.preferedUnit ?? ""}`
   }, [stat])

   const getValue = useCallback((value: number | string) => {
      if (stat?.type && isTimeType(stat.type.input)) {
         let val = typeof value === "string" ? parseFloat(value) : value;
         return `${toTimeFormat(val, ActivityInputTypes.HOURS, {
            show: {
               minutes: false,
               seconds: false,
               hours: true,
            }
         })} ${stat?.preferedUnit}`
      } else {
         return `${value} ${stat?.preferedUnit}`;
      }
   }, [stat])

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
   }, [min, max, stat, chartData]);

   //if user removes stat, remove the current entries for the stat

   const handleSetFilter = useCallback((label: StatEnumType) => {
      let foundStat: Stat | undefined;
      Object.values(activeActivity?.calendarEntries).forEach(({stats}) => stats?.forEach((stat) => {
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