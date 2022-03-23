

import Arrow from './../../assets/icons/arrowLight.svg';
import {ButtonProps} from './../../components/dsfrComponents/Button';

const FillButton:React.FC<ButtonProps> = ({children, arrow, onClick}) => {
    
    return (
         
        <button
            onClick={onClick} 
            className="
            fr-btn fr-btn--primary
            h-full my-auto
            hover:bg-claire-bf__hover flex justify-between"> 
                <span>{children}</span>
                <span className="mt-1 ml-1">{arrow ? <img src={Arrow} alt="Icône flèche"/> : ""}</span>
            </button> 
    );

}

export default FillButton;
