import MySelection from './../components/authenticated/MySelection';
import WasteBin from './../components/authenticated/WasteBin';
import Home from './../components/anonymous/Home';

interface routes {
    key: string,
    path: string,
    name: string,
    element: React.ReactNode,
    routes?: routes[]
}

export const protectedRoutes: routes[] = [

    {key: "MA SELECTION", path: "/ma-selection", name: "ma sélection", element: MySelection()},
    {key: "CORBEILLE", path: "/corbeille", name: "corbeille", element: WasteBin() },
]

export const unProtectedRoutes: routes[] = [
    
    {key: "ACCUEIL", path: "/", name: "accueil", element: Home()},
]