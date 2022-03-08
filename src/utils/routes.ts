interface routes {
    key: string,
    path: string,
    element: string,
    exact: boolean,
    routes?: routes[]
}

export const protectedRoutes: routes[] = [

    {key: "MA SELECTION", path: "/ma-selection", element: "MySelection", exact: true},
    {key: "CORBEILLE", path: "/corbeille", element: "WasteBin", exact: true},
]

export const unProtectedRoutes: routes[] = [
    
    {key: "ACCUEIL", path: "/", element: "Home", exact: true},
]