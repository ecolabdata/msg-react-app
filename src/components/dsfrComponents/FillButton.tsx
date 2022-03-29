
import {ButtonProps} from './../../components/dsfrComponents/Button';

const FillButton:React.FC<ButtonProps> = ({children, arrow, onClick}) => {
    
    return (
         
        <button
            onClick={onClick} 
            className="
            fr-btn fr-btn--primary
            m-3 h-full my-auto
            hover:bg-claire-bf__hover flex justify-between"> 
                <span>{children}</span>
                {/* <span className="mt-1 ml-1">{arrow ? <img src={Arrow} alt="Icône flèche"/> : ""}</span> */}
                {arrow ? 
                
                    <span className="fr-fi-arrow-right-line ml-1 mt-1" aria-hidden="true"></span>
                    : ""
                }
            </button> 
    );

}

export default FillButton;
