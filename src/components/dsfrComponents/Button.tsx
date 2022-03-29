export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    arrow?: boolean;
}

const Button:React.FC<ButtonProps> = ({children, arrow, onClick}) => {
    
    return (
         
        <button onClick={onClick} className="
            fr-btn fr-btn--secondary
            m-3 h-full my-auto
            hover:bg-claire-bf__hover flex justify-between"> 
                <span>{children}</span> 
                {arrow ? 
                
                <span className="fr-fi-arrow-right-line ml-1 mt-1" aria-hidden="true"></span>
                : ""
            } 
        </button> 
    );
    
}

export default Button;
