interface routes {
    key: string,
    path: string,
    name: string,
    element: string,
    routes?: routes[]
}

export const protectedRoutes: routes[] = [

    {key: "MA SELECTION", path: "/ma-selection", name: "ma sélection", element: "MySelection"},
    {key: "CORBEILLE", path: "/corbeille", name: "corbeille", element: "WasteBin"},
]

export const unProtectedRoutes: routes[] = [
    
    {key: "ACCUEIL", path: "/", name: "accueil", element: "Home"},
]