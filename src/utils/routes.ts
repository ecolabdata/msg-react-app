export interface Route {
    key: string,
    path: string,
    name: string,
    routes?: Route[]
    type: "protected" | "public",
}

export const protectedRoutes: (Route)[] = [

    {key: "SELECTION", path: `/profile/ma-selection`, name: "Sélection",  type:"protected",  },
    {key: "CORBEILLE", path: `/profile/corbeille`, name: "Corbeille",  type:"protected" },
];

export const publicRoutes: Route[] = [
    
    {key: "CONNEXION", path: "/authentificaiton", name: "Connexion", type:"public" },
    {key: "ACCUEIL", path: "/", name: "Accueil",  type:'public'},
]