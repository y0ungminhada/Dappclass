// [Number]
// Visitors
// Live Surveys
// Archived Surveys

//[Graph]
// time x Live Surveys
// time x Archived Surveys
import { supabase } from "~/postgres/supaclient"
import TrendCard from "../components/trend-card"
import { TrendChart } from "../components/trend-chart"
import type { Route } from "./+types/dashboard"
import { DateTime } from "luxon"
import { getNumberData } from "../query"


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
export const loader = async ({ request }: Route.LoaderArgs) => {
    const { data, error } = await supabase.rpc("increment_daily_visitor", {
        day: DateTime.now().startOf("day").toISO({ includeOffset: false }),
    });
    const thisWeekStart = DateTime.now()
        .startOf("week")
        .toISO({ includeOffset: false });
    const thisWeekEnd = DateTime.now().toISO({ includeOffset: false });
    const lastWeekStart = DateTime.now()
        .startOf("week")
        .minus({ week: 1 })
        .toISO({ includeOffset: false });

    const { data: liveSurveyCount } = await supabase
        .from("daily_live_survey")
        .select("count, created_at")
        .order("created_at");
    let formedLiveSurveyCount: { date: string; data: number }[] = [
        { date: "", data: 0 },
    ];
    if (liveSurveyCount) {
        formedLiveSurveyCount = liveSurveyCount.map((c) => ({
            date: (c.created_at ?? ""),
            data: (c.count ?? 0),
        }));
    }
    const numberCard = await getNumberData(lastWeekStart, thisWeekStart, thisWeekEnd);
    return {
        ...numberCard,
        formedLiveSurveyCount,
    }
};

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    return (
        <div className="flex flex-col gap-5 items-center justify-center" >
            <div className="grid grid-cols-3 gap-5 mt-10 w-full">
                <TrendCard

                    title={"Total Visitors"}
                    value={loaderData.value}
                    trendValue={loaderData.trendValue + "%"}
                    trendMessage={loaderData.upAndDown ? "Trending up" : "Trending down"}
                    periodMessage={"last 7 days "}
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
                    chartData={loaderData.formedLiveSurveyCount}
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