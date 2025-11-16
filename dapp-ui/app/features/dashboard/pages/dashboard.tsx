// [Number]
// Visitors
// Live Surveys
// Archived Surveys

//[Graph]
// time x Live Surveys
// time x Archived Surveys
import TrendCard from "../components/trend-card"
import { TrendChart } from "../components/trend-chart"


const data = [
    { "date": "2025-10-01", "data": 186 },
    { "date": "2025-10-02", "data": 190 },
    { "date": "2025-10-03", "data": 182 },
    { "date": "2025-10-04", "data": 195 },
    { "date": "2025-10-05", "data": 188 },
    { "date": "2025-10-06", "data": 184 },
    { "date": "2025-10-07", "data": 197 },
    { "date": "2025-10-08", "data": 191 },
    { "date": "2025-10-09", "data": 185 },
    { "date": "2025-10-10", "data": 189 },
    { "date": "2025-10-11", "data": 181 },
    { "date": "2025-10-12", "data": 193 },
    { "date": "2025-10-13", "data": 187 },
    { "date": "2025-10-14", "data": 190 }
]

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-5 items-center justify-center" >
            <div className="grid grid-cols-3 gap-5 mt-10 w-full">
                <TrendCard

                    title={"Total Visitors"}
                    value={"1,250"}
                    trendValue={"+12.5%"}
                    trendMessage={"Trending up"}
                    periodMessage={"Visitors for the last 6 months"}
                />
                <TrendCard

                    title={"Live Surveys"}
                    value={"20"}
                    trendValue={"+13.5%"}
                    trendMessage={"Trending up"}
                    periodMessage={"Live Surveys for the last 6 months"}
                />
                <TrendCard

                    title={"Archived Surveys"}
                    value={"100"}
                    trendValue={"+12.5%"}
                    trendMessage={"Trending up"}
                    periodMessage={"Archived Surveys for the last 6 months"}
                />

            </div>
            <div className="grid grid-cols-2 gap-5 mt-5 w-full">
                <TrendChart
                    title={"Live Surveys"}
                    description={"Daily Live Surveys"}
                    trendMessage={""}
                    periodMessage={""}
                    chartData={data}
                />
                <TrendChart
                    title={"Archived Surveys"}
                    description={"Daily Archived Surveys"}
                    trendMessage={""}
                    periodMessage={""}
                    chartData={data}
                />
            </div>

        </div>
    )

}