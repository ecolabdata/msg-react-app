
import {Route} from './../../utils/routes';

const Button = (route?:Route) => {
    
    return (
         
        <button className="
            fr-btn fr-btn--secondary
            h-full my-auto
            hover:bg-claire-bf__hover"> {route ? route.name : null } </button> 
    );
    
}

export default Button;