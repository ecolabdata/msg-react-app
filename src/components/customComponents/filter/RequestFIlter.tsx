import { AnyCard, Search } from "../../../api/Api";


export interface RequestFilter {
    
    search(description: string, motsclefs: string[], secteurs: string[]): Promise<Search>

    get cards() : AnyCard[]

    Component({}: {}): JSX.Element

}