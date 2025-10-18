import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
    index("features/dashboard/pages/dashboard.tsx"),
    route("survey/all", "features/survey/pages/all-surveys.tsx"),
    route("survey/create", "features/survey/pages/create-survey.tsx"),
    route("archive/finished", "features/archive/pages/finished-surveys.tsx"),
    route("profile/my-surveys", "features/profile/pages/my-surveys.tsx"),
    route("profile/my-responses", "features/profile/pages/my-responses.tsx")
] satisfies RouteConfig;
