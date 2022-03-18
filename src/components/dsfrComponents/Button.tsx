import Arrow from './../../assets/icons/arrowDark.svg';


export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    arrow?: boolean;
}

const Button:React.FC<ButtonProps> = ({children, arrow, onClick}) => {
    
    return (
         
        <button onClick={onClick} className="
            fr-btn fr-btn--secondary
            h-full my-auto
            hover:bg-claire-bf__hover flex justify-between"> 
                <span>{children}</span>  
                <span className="mt-1 ml-1">{arrow ? <img src={Arrow} alt="Icône flèche"/> : ""}</span>
        </button> 
    );
    
}

export default Button;
