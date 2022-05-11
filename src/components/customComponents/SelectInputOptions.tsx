import { useState } from 'react';
import Chevron from './../../assets/icons/chevronWhite.svg'

interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectInputOptions: React.FC<SelectProps> = ({optionsData, label, classes, onChange}) => { 
    
    const [displaySelect, setDisplaySelect] = useState(false);
    
    return (
        <>
            <button className="fr-icon-arrow-down-line h-10 w-[80%] flex justify-between py-2 px-3 bg-input-background addBorder-b border-3 border-b-white " onClick={() => {setDisplaySelect(!displaySelect);}}> 
                <p> Sélectionnez une option </p>
                <img className={`${displaySelect ? 'rotate-90': ''} h-5 w-5 m-0.5`} src={Chevron} alt="Chevron" />
            </button>

            {displaySelect &&
                <ul  className="w-[80%] h-[350px] overflow-y-scroll bg-input-background">
                    {optionsData.map(option => {
                        return(
                            
                            <li className="ml-2 my-2" key={option}>
                                <input className="bg-red-200 appearance-on addBorder border text-black border-black  mx-1" id={option} type="checkbox"></input>
                                <label className="capitalize" htmlFor={option}>{option}</label>
                                
                            </li>
                        
                        )})}
                </ul>
            }
        </>
    ) 
}; 

export default SelectInputOptions;
