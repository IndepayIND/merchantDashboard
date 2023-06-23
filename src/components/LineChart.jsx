import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import {useEffect, useState} from "react";
import { mockLineData} from "../data/mockData";
import {fetchCumulativeCountAPI} from "../data/api";
import {useNavigate} from "react-router-dom";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cumulativeCountData, setCumulativeCountData] = useState([]);
  const navigate = useNavigate();

  const handleFetchData = () => {
    fetchCumulativeCount(navigate);
  };

  const fetchCumulativeCount = async (navigate) => {
    try {
      const data = await fetchCumulativeCountAPI(fromDate, toDate, navigate);
      if (data) {
        const lineData = JSON.parse(JSON.stringify(mockLineData)); // Create a deep copy of mockLineData
        data.forEach((item) => {
          lineData[0].data.push({ x: item.date, y: item.indepayFastCheckOut });
          lineData[1].data.push({ x: item.date, y: item.VA });
          lineData[2].data.push({ x: item.date, y: item.QRIS });
          lineData[3].data.push({ x: item.date, y: item.card });
          lineData[4].data.push({ x: item.date, y: item.wallet });
          lineData[5].data.push({ x: item.date, y: item.netbanking });
        });
        setCumulativeCountData(lineData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
      <ResponsiveLine
          data={cumulativeCountData}
          animate
          colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
          margin={{ top: 50, right: 240, bottom: 50, left: 60 }}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                  fontSize:14,
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                  fontSize:14,
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
                fontSize:14,
                textTransform:"uppercase"
              },
            },
            tooltip: {
              container: {
                color: colors.primary[500],
              },
            },
          }}
          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
            min: "auto",
            max: "auto",
          }}
          yScale={{
            type: 'linear',
            min: "auto",
            max: "auto",
          }}
          curve="linear"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%b %d',
            legend: 'Date',
            legendOffset: 36,
            tickValues: 'every 1 days',
            orient: "bottom",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5,
            tickSize: 3,
            tickPadding: 5,
            legendOffset: -26,
            tickRotation: 0,
            legend:"Count",
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-2}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          tooltip={({ point }) => {
            const { data, indexValue, value } = point;
            return (
                <div>
                  <div>Count: {data.y}</div>
                </div>
            );
          }}
      />
  );
};

export default LineChart;
