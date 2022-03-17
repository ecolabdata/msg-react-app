
export interface ActionType {
    type: string,
    [key: string]:any
}

export interface AppStateType {
    [key : string]:any,
}

export default function appState(state:AppStateType=[], action:ActionType) {
    switch(action.type){
        case 'SET_GLOBAL_STORE':
            return {
                
            }
        default:
            return state;
    }
}