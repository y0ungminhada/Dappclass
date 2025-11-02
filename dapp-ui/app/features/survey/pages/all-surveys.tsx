import SurveyCard from "../components/survey-card"

export default function AllSurveys() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-extrabold">Live Surveys</h1>
                <span className="font-light">Join the Survey</span>
            </div>
            {Array.from({ length: 10 }).map(() => (
                <SurveyCard />
            ))}

        </div>
    )
}