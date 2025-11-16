import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "~/components/ui/navigation-menu"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { rabbykit } from "~/root"
import WalletButton from "./wallet-button";
// - navigation
//      -Dashboard
//      -Survey
//          -All Surveys
//          -Create Survey
//      -Archive
//          -Finished Surveys
//      -Profile
//          -My surveys
//          -My responses
export default function Navigation() {
    return (
        <nav className="fixed top-0 right-0 left-0">
            <div className="flex w-screen items-center justify-between py-5 px-5">
                <Link to="/" className="text-lg font-bold">DESTAT</Link>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/">Dashboard</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Survey</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-2 h-[150px]">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="text-lg font-medium ">
                                                    Survey
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    Browse and create surveys.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="/survey/all">
                                                <div className="text-sm leading-none font-medium">All Surveys</div>
                                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                    List all surveys
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="/survey/create">
                                                <div className="text-sm leading-none font-medium">Create Survey</div>
                                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                    Create a new survey
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Archive</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-1 h-[150px]">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="text-lg font-medium ">
                                                    Archive
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    View finished surveys in the archive.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="/archive/finished">
                                                <div className="text-sm leading-none font-medium">Finished Surveys</div>
                                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                    List all finished surveys
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-2 h-[150px]">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="text-lg font-medium ">
                                                    Profile
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-tight">
                                                    Manage your surveys and responses.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="/profile/my-surveys">
                                                <div className="text-sm leading-none font-medium">My surveys</div>
                                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                    List all your surveys
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="/profile/my-responses">
                                                <div className="text-sm leading-none font-medium">My responses</div>
                                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                    View all your responses
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <WalletButton />
            </div>
        </nav>
    );
}